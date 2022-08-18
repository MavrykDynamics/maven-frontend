import React, { useState } from 'react'
import { TezosToolkit } from '@taquito/taquito'
import { useSelector } from 'react-redux'

import { dex, SLIPPAGE_TOGGLE_VALUES } from '../helpers/const'
import { subHeaderColor } from 'styles'
import { Input } from 'app/App.components/Input/Input.controller'

import { CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'

import { ActionScreenWrapper, CheckBox, CheckBoxLabel, CheckBoxWrapper } from '../LBAction.style'
import { State } from 'utils/interfaces'
import env from 'utils/env'
import { LBActionBottomWrapperStyled } from 'app/App.components/LBActionBottomFields/LBActionBottom.style'
import { PriceImpact } from 'app/App.components/LBActionBottomFields/PriceImpact.controller'
import { MinimumReceived } from 'app/App.components/LBActionBottomFields/MinimumReceived.controller'
import { Slippage } from 'app/App.components/LBActionBottomFields/Slippage.contoller'
import { addLiquidityCalculationsHandler, addLiquidityReturn } from 'utils/DEX/liquidityUtils'
import { parseSrtToNum, slippagePersentToValue } from 'utils/utils'
import { CoinsInputsValues, AddLiquidutityInputChangeEventType } from '../helpers/actionsScreen.types'
import { AddLiquidityDefault } from './AddLiquidityDefault.controller'
import { AddLiquidityOnlyXTZ } from './AddLiquidityOnlyXTZ.controller'
import { xtzToTzBTCSwap } from '../helpers/swap.utils'
import { addLiquidityHandler } from '../helpers/addAndRemoveLiquidity.utils'
import { swapCalculateCoinReceive } from 'utils/DEX/swapUtils'
import { Button } from 'app/App.components/Button/Button.controller'
import { PRIMARY } from 'app/App.components/Button/Button.constants'
import { ConnectWallet } from 'app/App.components/ConnectWallet/ConnectWallet.controller'

const DEFAULT_COINS_AMOUNT = {
  XTZ: 0,
  tzBTC: 0,
}

export const LBAddLiquidity = ({ ready }: { ready: boolean }) => {
  const {
    lbData: { xtz_pool, token_pool, address, token_address, lqt_total },
  } = useSelector((state: State) => state.tokens)
  const { accountPkh } = useSelector((state: State) => state.wallet)

  const [inputValues, setInputValues] = useState<CoinsInputsValues>(DEFAULT_COINS_AMOUNT)
  const [onlyXtzSwapData, setOnlyXtzSwapData] = useState<CoinsInputsValues>(DEFAULT_COINS_AMOUNT)
  const [selectedSlippage, setSeletedToggle] = useState(SLIPPAGE_TOGGLE_VALUES[0].value)
  const [slippagePersent, setSlippagePersent] = useState<string | number>(SLIPPAGE_TOGGLE_VALUES[0].value.toString())
  const [switchValue, setSwitchValue] = useState(false)
  const [lastCoinUpdated, setLastCoinUpdated] = useState<null | 'XTZ' | 'tzBTC'>(null)
  const [lqtReceived, setLqtReceived] = useState(0)
  const [minlqtReceived, setMinLqtReceived] = useState(0)

  // Dynamic calculations for only XTZ block
  const onlyXTZCalculations = (
    coinName: 'XTZ' | 'tzBTC',
    coinAmount: number | string,
    newSlippagePersent?: number | string,
  ) => {
    const convertedSlippagePersentToValue = slippagePersentToValue(newSlippagePersent || slippagePersent)
    setInputValues({
      ...inputValues,
      [coinName]: coinAmount,
    })

    const tokemAmoutReceive = swapCalculateCoinReceive(
      'XTZ',
      'tzBTC',
      parseSrtToNum(coinAmount),
      xtz_pool,
      token_pool,
      convertedSlippagePersentToValue,
      dex,
    )

    setOnlyXtzSwapData({
      ...onlyXtzSwapData,
      XTZ: parseSrtToNum(coinAmount) / 2,
      tzBTC: tokemAmoutReceive.expected,
    })

    const { expected, minimum } = addLiquidityReturn(
      parseSrtToNum(onlyXtzSwapData.XTZ),
      xtz_pool,
      lqt_total,
      convertedSlippagePersentToValue,
      dex,
    )

    setLqtReceived(expected.value)
    setMinLqtReceived(minimum.value)
  }

  // Dynamic calculations for XTZ&tzBTC block
  const xtzTzbtcCalculations = (
    coinName: 'XTZ' | 'tzBTC',
    coinAmount: number | string,
    newSlippagePersent?: number | string,
  ) => {
    const convertedSlippagePersentToValue = slippagePersentToValue(newSlippagePersent || slippagePersent)
    const { liquidityExpected, liquidityMinimum, tokenRequired, xtzRequired } = addLiquidityCalculationsHandler(
      coinName,
      parseSrtToNum(coinAmount),
      xtz_pool,
      token_pool,
      lqt_total,
      convertedSlippagePersentToValue,
      dex,
    )

    setLqtReceived(liquidityExpected.value)
    setMinLqtReceived(liquidityMinimum.value)
    setLastCoinUpdated(coinName)
    setInputValues({
      ...inputValues,
      ...(coinName === 'XTZ' && tokenRequired
        ? {
            tzBTC: tokenRequired.value,
            XTZ: coinAmount,
          }
        : {}),
      ...(coinName === 'tzBTC' && xtzRequired
        ? {
            XTZ: xtzRequired.value,
            tzBTC: coinAmount,
          }
        : {}),
    })
  }

  // input hanlder
  const inputChangeHandler = (e: AddLiquidutityInputChangeEventType) => {
    const { name, value } = e.target
    if (+value < 0) return

    if (switchValue) {
      // Only XTZ input
      onlyXTZCalculations(name as 'XTZ' | 'tzBTC', value)
    } else {
      // XTZ & tzBTC inputs
      xtzTzbtcCalculations(name as 'XTZ' | 'tzBTC', value)
    }
  }

  // slippage value changing handler
  const slippageChangeHandler = (value: string, isInput?: boolean) => {
    const newSlippageValue = parseSrtToNum(value) < 0 ? 0 : value
    if (+newSlippageValue >= 0 && +newSlippageValue <= 100) {
      setSlippagePersent(newSlippageValue)

      if (switchValue) {
        // Only XTZ input
        onlyXTZCalculations('XTZ', inputValues.XTZ, newSlippageValue)
      } else if (!switchValue && lastCoinUpdated) {
        // XTZ & tzBTC inputs
        xtzTzbtcCalculations(lastCoinUpdated, inputValues[lastCoinUpdated], newSlippageValue)
      }
    }

    if (!isInput) setSeletedToggle(parseSrtToNum(value))
  }

  // handle add liquidity button with xtz and tzbtc
  const addLiquidityBtnHandler = async () => {
    try {
      if (!accountPkh) return
      const Tezos = new TezosToolkit(env.rpcLink)
      const lbContract = await Tezos.wallet.at(address)
      const tzBtcContract = await Tezos.wallet.at(token_address)
      const deadline = new Date(Date.now() + 60000).toISOString()
      const convertedSlippagePersentToValue = slippagePersentToValue(slippagePersent)

      if (switchValue) {
        try {
          await addLiquidityHandler({
            tzBTCAmount: inputValues.tzBTC,
            xtzAmount: inputValues.XTZ,
            lbContract,
            accountAddress: accountPkh,
            slippage: convertedSlippagePersentToValue,
            tzBtcContract,
            deadline,
            Tezos,
            lbAddress: address,
            lqtReceived,
          })
        } catch (e: any) {
          console.error('add liquidity xtz&tzBTC error', e.message)
        }
      } else {
        // Performing swap
        try {
          await xtzToTzBTCSwap({
            dex,
            token_pool,
            xtz_pool,
            deadline,
            lbContract,
            xtzAmount: parseSrtToNum(inputValues.XTZ) / 2,
            slippage: convertedSlippagePersentToValue,
            accountAddress: accountPkh,
          })
        } catch (e: any) {
          console.error('add liquidity only xtz swap error', e.message)
        }

        // Performing add Liquidity
        try {
          await addLiquidityHandler({
            tzBTCAmount: onlyXtzSwapData.tzBTC,
            xtzAmount: onlyXtzSwapData.XTZ,
            lbContract,
            accountAddress: accountPkh,
            slippage: convertedSlippagePersentToValue,
            tzBtcContract,
            deadline,
            Tezos,
            lbAddress: address,
            lqtReceived,
          })
        } catch (e: any) {
          console.error('add liquidity only xtz add liquidity error', e.message)
        }
      }
    } catch (e: any) {
      console.error('addLiquidityBtnHandler initializing params error', e.message)
    }
  }

  return (
    <ActionScreenWrapper className="liquidity swap">
      <hr />
      <div className="switch-wrapper">
        <div className="top">
          <CustomizedText fontSize={16} color={subHeaderColor} fontWidth={500}>
            Provide only XTZ
          </CustomizedText>

          <CheckBoxWrapper>
            <CheckBox
              id="checkbox"
              type="checkbox"
              checked={switchValue}
              onChange={() => {
                setInputValues(DEFAULT_COINS_AMOUNT)
                setSwitchValue(!switchValue)
              }}
            />
            <CheckBoxLabel htmlFor="checkbox" />
          </CheckBoxWrapper>
        </div>
        {switchValue && (
          <CustomizedText fontSize={14} fontWidth={400} style={{ marginTop: '10px' }}>
            You can add liquidity with only XTZ. <br />A swap of half the XTZ to tzBTC will be done first.
          </CustomizedText>
        )}
      </div>

      <hr />

      {switchValue ? (
        <AddLiquidityOnlyXTZ
          inputValues={inputValues}
          inputChangeHandler={inputChangeHandler}
          lqtReceived={lqtReceived}
          setInputValues={setInputValues}
          swapData={onlyXtzSwapData}
        />
      ) : (
        <AddLiquidityDefault
          inputValues={inputValues}
          inputChangeHandler={inputChangeHandler}
          lqtReceived={lqtReceived}
          setInputValues={setInputValues}
        />
      )}

      {ready ? (
        <Button
          text={'Add Liquidity'}
          icon={'plusDark'}
          onClick={addLiquidityBtnHandler}
          className="addLiquidity_btn LB"
          kind={PRIMARY}
        />
      ) : (
        <ConnectWallet className="swap-action addLiq-action" />
      )}

      <LBActionBottomWrapperStyled>
        <PriceImpact priceImpact={0} />
        <MinimumReceived minimumRecived={[{ value: minlqtReceived, tokenName: 'LBT' }]} />
        <Slippage
          onClickHandler={(value: number) => slippageChangeHandler(value.toString(), false)}
          selectedToogle={selectedSlippage}
        />
        {selectedSlippage === -1 ? (
          <Input
            placeholder={'Slippage'}
            name="slippageInput"
            kind="primary"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => slippageChangeHandler(e.target.value, true)}
            type={'tel'}
            value={slippagePersent}
            onBlur={() => {
              if (slippagePersent === '') setSlippagePersent('0')
            }}
            onFocus={() => {
              if (parseSrtToNum(slippagePersent) === 0) {
                setSlippagePersent('')
              }
            }}
          />
        ) : null}
      </LBActionBottomWrapperStyled>
    </ActionScreenWrapper>
  )
}
