import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SLIPPAGE_TOGGLE_VALUES } from '../helpers/const'
import { subHeaderColor } from 'styles'

import { CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'

import { ActionScreenWrapper, CheckBox, CheckBoxLabel, CheckBoxWrapper } from '../LBAction.style'
import { State } from 'utils/interfaces'
import { LBActionBottomWrapperStyled } from 'app/App.components/LBActionBottomFields/LBActionBottom.style'
import { PriceImpact } from 'app/App.components/LBActionBottomFields/PriceImpact.controller'
import { MinimumReceived } from 'app/App.components/LBActionBottomFields/MinimumReceived.controller'
import { Slippage } from 'app/App.components/LBActionBottomFields/Slippage.contoller'
import { calculateAddLiquidityXTZ } from 'utils/DEX/liquidityUtils'
import { parseSrtToNum, slippagePercentToValue } from 'utils/utils'
import { AddLiquidutityInputChangeEventType, CoinsInputsValues } from '../helpers/actionsScreen.types'
import { AddLiquidityDefault } from './AddLiquidityDefault.controller'
import { AddLiquidityOnlyXTZ } from './AddLiquidityOnlyXTZ.controller'
import { Button } from 'app/App.components/Button/Button.controller'
import { PRIMARY } from 'app/App.components/Button/Button.constants'
import { ConnectWallet } from 'app/App.components/ConnectWallet/ConnectWallet.controller'
import { getSettings } from '../../../../../utils/DEX/DexCalcs'
import BigNumber from 'bignumber.js'
import { PRECISION_NUMBER_EIGHT_ZEROES, PRECISION_NUMBER_SIX_ZEROES } from '../../../../../utils/consts'
import { addLiquidity } from '../../../../../redux/actions/liquidity.actions'

const DEFAULT_COINS_AMOUNT = {
  XTZ: 0,
  tzBTC: 0,
}
const dexType = getSettings('liquidity')
export const LBAddLiquidity = ({ ready, generalDexStats }: { ready: boolean; generalDexStats: any }) => {
  const {
    lbData: { xtz_pool, token_pool, address, token_address, lqt_total },
  } = useSelector((state: State) => state.tokens)
  const dispatch = useDispatch()
  const { accountPkh } = useSelector((state: State) => state.wallet)
  const { xtzBalance, tzBTCBalance } = useSelector((state: State) => state.user)

  const [inputValues, setInputValues] = useState<CoinsInputsValues>(DEFAULT_COINS_AMOUNT)
  const [onlyXtzSwapData, setOnlyXtzSwapData] = useState<CoinsInputsValues>(DEFAULT_COINS_AMOUNT)
  const [selectedSlippage, setSeletedToggle] = useState(SLIPPAGE_TOGGLE_VALUES[0].value)
  const [slippagePercent, setSlippagePercent] = useState<string | number>(SLIPPAGE_TOGGLE_VALUES[0].value.toString())
  const [switchValue, setSwitchValue] = useState(false)
  const [lastCoinUpdated, setLastCoinUpdated] = useState<null | 'XTZ' | 'tzBTC'>(null)
  const [lqtReceived, setLqtReceived] = useState(0)
  const [minlqtReceived, setMinLqtReceived] = useState(0)

  useEffect(() => {
    setInputValues(DEFAULT_COINS_AMOUNT)
    setOnlyXtzSwapData(DEFAULT_COINS_AMOUNT)
  }, [ready])

  const calcAddLiquidityXTZ = (amount: number) => {
    console.log('logging input of calcAddLiquidityXTZ', amount)
    const convertedSlippagePercentToValue = slippagePercentToValue(slippagePercent)
    let _xtzToAdd = new BigNumber(amount * PRECISION_NUMBER_SIX_ZEROES),
      _xtzPool = new BigNumber(generalDexStats.tezPool * PRECISION_NUMBER_SIX_ZEROES),
      _tokenPool = new BigNumber(generalDexStats.tokenPool * PRECISION_NUMBER_EIGHT_ZEROES),
      _lqtTotal = new BigNumber(generalDexStats.sharesTotal)
    const { liquidityExpected, liquidityMinimum, required, exchangeRate } = calculateAddLiquidityXTZ(
      _xtzToAdd,
      _xtzPool,
      _tokenPool,
      _lqtTotal,
      convertedSlippagePercentToValue,
      dexType,
    )
    const _liquidityExpected = liquidityExpected.toNumber(),
      _liquidityMinimum = liquidityMinimum.toNumber(),
      _required = required.toNumber() / PRECISION_NUMBER_EIGHT_ZEROES
    console.log('logging result of calculateTokenToXTZ', _liquidityExpected, _liquidityMinimum, _required, exchangeRate)
    setInputValues({
      ...inputValues,
      tzBTC: _required,
      XTZ: amount,
    })

    setLqtReceived(_liquidityExpected)
    setMinLqtReceived(_liquidityMinimum)
  }
  // Dynamic calculations for only XTZ block
  const onlyXTZCalculations = (
    coinName: 'XTZ' | 'tzBTC',
    coinAmount: number | string,
    newSlippagePersent?: number | string,
  ) => {
    const convertedSlippagePersentToValue = slippagePercentToValue(newSlippagePersent ?? slippagePercent)
    setInputValues({
      ...inputValues,
      [coinName]: coinAmount,
    })

    // const tokemAmoutReceive = swapCalculateCoinReceive(
    //   'XTZ',
    //   'tzBTC',
    //   parseSrtToNum(coinAmount),
    //   xtz_pool,
    //   token_pool,
    //   convertedSlippagePersentToValue,
    //   dex,
    // )

    // setOnlyXtzSwapData({
    //   ...onlyXtzSwapData,
    //   XTZ: parseSrtToNum(coinAmount) / 2,
    //   tzBTC: tokemAmoutReceive.expected,
    // })

    // const { expected, minimum } = addLiquidityReturn(
    //   parseSrtToNum(onlyXtzSwapData.XTZ),
    //   xtz_pool,
    //   lqt_total,
    //   convertedSlippagePersentToValue,
    //   dex,
    // )
    // setLqtReceived(expected.value)
    // setMinLqtReceived(minimum.value)
  }

  // Dynamic calculations for XTZ&tzBTC block
  const xtzTzbtcCalculations = (
    coinName: 'XTZ' | 'tzBTC',
    coinAmount: number | string,
    newSlippagePersent?: number | string,
  ) => {
    const convertedSlippagePersentToValue = slippagePercentToValue(newSlippagePersent ?? slippagePercent)
    // const { liquidityExpected, liquidityMinimum, tokenRequired, xtzRequired } = addLiquidityCalculationsHandler(
    //   coinName,
    //   parseSrtToNum(coinAmount),
    //   xtz_pool,
    //   token_pool,
    //   lqt_total,
    //   convertedSlippagePersentToValue,
    //   dex,
    // )

    // setLqtReceived(liquidityExpected.value)
    // setMinLqtReceived(liquidityMinimum.value)
    // setLastCoinUpdated(coinName)
    // setInputValues({
    //   ...inputValues,
    //   ...(coinName === 'XTZ' && tokenRequired
    //     ? {
    //         tzBTC: tokenRequired.value,
    //         XTZ: coinAmount,
    //       }
    //     : {}),
    //   ...(coinName === 'tzBTC' && xtzRequired
    //     ? {
    //         XTZ: xtzRequired.value,
    //         tzBTC: coinAmount,
    //       }
    //     : {}),
    // })
  }

  // input handler
  const inputChangeHandler = (e: AddLiquidutityInputChangeEventType) => {
    const { name, value } = e.target
    if (+value < 0 || (ready && +value > (name === 'XTZ' ? xtzBalance : tzBTCBalance))) return

    if (switchValue) {
      // Only XTZ input
      onlyXTZCalculations(name as 'XTZ' | 'tzBTC', value)
    } else {
      // XTZ & tzBTC inputs

      if (name === 'XTZ') {
        calcAddLiquidityXTZ(parseFloat(value as string))
      } else {
        calcAddLiquidityXTZ(parseFloat(value as string))
      }
    }
  }

  // slippage value changing handler
  const slippageChangeHandler = (value: string | number, isInput?: boolean) => {
    const newSlippagePersent = Number(parseSrtToNum(value) < 0 ? 0 : value)
    if (newSlippagePersent >= 0 && newSlippagePersent <= 100) {
      setSlippagePercent(value)

      if (switchValue) {
        // Only XTZ input
        onlyXTZCalculations('XTZ', inputValues.XTZ, newSlippagePersent)
      } else if (!switchValue && lastCoinUpdated) {
        // XTZ & tzBTC inputs
        xtzTzbtcCalculations(lastCoinUpdated, inputValues[lastCoinUpdated], newSlippagePersent)
      }
    }

    if (!isInput) setSeletedToggle(parseSrtToNum(value))
  }

  // handle add liquidity button with xtz and tzbtc
  const addLiquidityBtnHandler = async () => {
    console.log('Here in switchValue', switchValue)
    // Only XTZ switch is not active, so providing both XTZ and tzBTC from wallet
    if (!switchValue) {
      dispatch(
        addLiquidity(
          Number(inputValues.tzBTC) * PRECISION_NUMBER_EIGHT_ZEROES,
          Math.floor(minlqtReceived),
          Number(inputValues.XTZ) * PRECISION_NUMBER_SIX_ZEROES,
        ),
      )
    } else {
    }

    try {
      // if (!accountPkh) return
      // const Tezos = new TezosToolkit(env.rpcLink)
      // const lbContract = await Tezos.wallet.at(address)
      // const tzBtcContract = await Tezos.wallet.at(token_address)
      // const deadline = new Date(Date.now() + 60000).toISOString()
      // const convertedSlippagePersentToValue = slippagePercentToValue(slippagePercent)
      //
      // if (switchValue) {
      //   // try {
      //   //   await addLiquidityHandler({
      //   //     tzBTCAmount: inputValues.tzBTC,
      //   //     xtzAmount: inputValues.XTZ,
      //   //     lbContract,
      //   //     accountAddress: accountPkh,
      //   //     slippage: convertedSlippagePersentToValue,
      //   //     tzBtcContract,
      //   //     deadline,
      //   //     Tezos,
      //   //     lbAddress: address,
      //   //     lqtReceived,
      //   //   })
      //   // } catch (e: any) {
      //   //   console.error('add liquidity xtz&tzBTC error', e.message)
      //   // }
      // } else {
      //   // Performing swap
      //   try {
      //     await xtzToTzBTCSwap({
      //       dex,
      //       token_pool,
      //       xtz_pool,
      //       deadline,
      //       lbContract,
      //       xtzAmount: parseSrtToNum(inputValues.XTZ) / 2,
      //       slippage: convertedSlippagePersentToValue,
      //       accountAddress: accountPkh,
      //     })
      //   } catch (e: any) {
      //     console.error('add liquidity only xtz swap error', e.message)
      //   }
      //
      //   // Performing add Liquidity
      //   try {
      //     await addLiquidityHandler({
      //       tzBTCAmount: onlyXtzSwapData.tzBTC,
      //       xtzAmount: onlyXtzSwapData.XTZ,
      //       lbContract,
      //       accountAddress: accountPkh,
      //       slippage: convertedSlippagePersentToValue,
      //       tzBtcContract,
      //       deadline,
      //       Tezos,
      //       lbAddress: address,
      //       lqtReceived,
      //     })
      //   } catch (e: any) {
      //     console.error('add liquidity only xtz add liquidity error', e.message)
      //   }
      // }
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
        <ConnectWallet className="swap-action addLiq-action addLiquidity_btn" />
      )}

      <LBActionBottomWrapperStyled>
        <PriceImpact priceImpact={0} />
        <MinimumReceived minimumReceived={[{ value: minlqtReceived, tokenName: 'LBT' }]} />
        <Slippage
          onClickHandler={(value) => slippageChangeHandler(value, false)}
          selectedToogle={selectedSlippage}
          setSlippagePersent={setSlippagePercent}
          slippagePersent={slippagePercent}
        />
      </LBActionBottomWrapperStyled>
    </ActionScreenWrapper>
  )
}
