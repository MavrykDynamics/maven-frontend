import { useDispatch, useSelector } from 'react-redux'
import { TezosToolkit } from '@taquito/taquito'
import React, { useEffect, useState } from 'react'

import { CoinSwap } from 'app/App.components/CoinSwap/CoinSwap.controller'
import { Slippage } from 'app/App.components/LBActionBottomFields/Slippage.contoller'
import { Button } from 'app/App.components/Button/Button.controller'
import { PriceImpact } from 'app/App.components/LBActionBottomFields/PriceImpact.controller'
import { MinimumReceived } from 'app/App.components/LBActionBottomFields/MinimumReceived.controller'
import { Input } from 'app/App.components/Input/Input.controller'

import { LBActionBottomWrapperStyled } from 'app/App.components/LBActionBottomFields/LBActionBottom.style'
import { ActionScreenWrapper } from '../LBAction.style'
import { CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'

import { State } from 'utils/interfaces'

import { removeLiquidityTokenReceived, removeLiquidityXtzReceived } from 'utils/DEX/liquidityUtils'
import env from 'utils/env'
import { nonNumberSymbolsValidation, parseSrtToNum, slippagePercentToValue } from 'utils/utils'
import { SLIPPAGE_TOGGLE_VALUES } from '../helpers/const'
import { getSettings } from 'utils/DEX/DexCalcs'
import { PRIMARY } from 'app/App.components/Button/Button.constants'
import { removeLiquidityHandler } from '../helpers/addAndRemoveLiquidity.utils'
import { AddLiquidutityInputChangeEventType } from '../helpers/actionsScreen.types'
import { ConnectWallet } from 'app/App.components/ConnectWallet/ConnectWallet.controller'

const dex = getSettings('liquidity')

export const LBRemoveLiquidity = ({ ready, generalDexStats }: { ready: boolean; generalDexStats: any }) => {
  const {
    lbData: { xtz_pool, token_pool, address, lqt_total },
    coinPrices,
  } = useSelector((state: State) => state.tokens)
  const dispatch = useDispatch()
  const { accountPkh } = useSelector((state: State) => state.wallet)
  const { LBTBalance } = useSelector((state: State) => state.user)

  const [inputValues, setInputValues] = useState({ SIR: '0' })
  const [selectedSlippage, setSelectedSlippage] = useState<number>(SLIPPAGE_TOGGLE_VALUES[0].value)
  const [slippagePercent, setSlippagePercent] = useState<string | number>(SLIPPAGE_TOGGLE_VALUES[0].value.toString())
  const [receivedAmount, setReceivedAmount] = useState({
    xtz: 0,
    tzbtc: 0,
  })
  const [minimumReceived, setMinimumReceived] = useState({
    xtz: 0,
    tzbtc: 0,
  })

  useEffect(() => {
    setInputValues({ SIR: '0' })
  }, [ready])

  const tzbtcAndXtzAmountCalculation = ({
    newSlippagePersent,
    newSirBurnedValue,
  }: {
    newSlippagePersent?: string | number
    newSirBurnedValue?: string | number
  }) => {
    const convertedSlippagePersentToValue = slippagePercentToValue(newSlippagePersent ?? slippagePercent)

    const { expected: expectedXtz, minimum: minimumXtz } = removeLiquidityXtzReceived(
      parseSrtToNum(newSirBurnedValue || inputValues.SIR),
      lqt_total,
      xtz_pool,
      convertedSlippagePersentToValue,
      dex,
    )

    const { expected: expectedToken, minimum: minimumToken } = removeLiquidityTokenReceived(
      parseSrtToNum(newSirBurnedValue || inputValues.SIR),
      lqt_total,
      token_pool,
      convertedSlippagePersentToValue,
    )

    setReceivedAmount({
      xtz: expectedXtz.value,
      tzbtc: expectedToken.value,
    })

    setMinimumReceived({
      xtz: minimumXtz.value,
      tzbtc: minimumToken.value,
    })
  }

  // change slippage value handler
  const slippageChangeHandler = (value: string | number, isInput?: boolean) => {
    const newSlippagePersent = Number(parseSrtToNum(value) < 0 ? 0 : value)
    if (newSlippagePersent >= 0 && newSlippagePersent <= 100) {
      setSlippagePercent(value)
      tzbtcAndXtzAmountCalculation({ newSlippagePersent })
    }

    if (!isInput) {
      setSelectedSlippage(parseSrtToNum(value))
    }
  }

  // change input value handler
  const inputChangeHandler = (e: AddLiquidutityInputChangeEventType) => {
    const { name, value } = e.target
    if (+value < 0 || (ready && +value > LBTBalance)) return

    tzbtcAndXtzAmountCalculation({ newSirBurnedValue: value })

    setInputValues({
      ...inputValues,
      [name]: value,
    })
  }

  const removeLiquidityBtnHandler = async () => {
    try {
      if (!accountPkh) return
      const Tezos = new TezosToolkit(env.rpcLink)
      const lbContract = await Tezos.wallet.at(address)
      const deadline = new Date(Date.now() + 60000).toISOString()

      try {
        await removeLiquidityHandler({
          sirAmount: inputValues.SIR,
          lbContract,
          accountAddress: accountPkh,
          deadline,
          xtz_pool,
          token_pool,
          lqt_total,
        })
      } catch (e: any) {
        console.error('remove liquidity error', e.message)
      }
    } catch (e: any) {
      console.error('removeLiquidityBtnHandler initializing params error', e.message)
    }
  }

  return (
    <ActionScreenWrapper className="removeLiqidity swap">
      <Input
        placeholder={''}
        name="Sir"
        onChange={inputChangeHandler}
        type={'number'}
        kind={'LB'}
        value={inputValues.SIR}
        convertedValue={parseSrtToNum(inputValues.SIR) * coinPrices.tezos.usd}
        icon={'XTZ_tezos'}
        pinnedText={'SIR'}
        onKeyDown={nonNumberSymbolsValidation}
        onWheel={(e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur()}
        useMaxHandler={() => {
          inputChangeHandler({
            target: {
              name: 'SIR',
              value: LBTBalance,
            },
          })
        }}
        userBalance={LBTBalance}
        onBlur={() => {
          if (inputValues.SIR === '') {
            setInputValues({
              ...inputValues,
              SIR: '0',
            })
          }
        }}
        onFocus={() => {
          if (parseSrtToNum(inputValues.SIR) === 0) {
            setInputValues({
              ...inputValues,
              SIR: '',
            })
          }
        }}
      />

      <hr />

      <CustomizedText style={{ marginBottom: '20px' }}>You Receive</CustomizedText>

      <CoinSwap
        icon={{ name: 'plus', width: 12, height: 18 }}
        XTZCoinData={{
          icon: 'XTZ_tezos',
          amount: receivedAmount.xtz,
        }}
        tzBTCCoinData={{
          icon: 'tzBTC',
          amount: receivedAmount.tzbtc,
        }}
      />

      <hr />

      {ready ? (
        <Button
          text={'Remove Liquidity'}
          icon={'minus'}
          onClick={removeLiquidityBtnHandler}
          className="removeLiquidity_btn LB"
          kind={PRIMARY}
        />
      ) : (
        <ConnectWallet className="swap-action removeLiq-action" />
      )}

      <LBActionBottomWrapperStyled className="liquidity">
        <PriceImpact priceImpact={0} />
        <MinimumReceived
          minimumReceived={[
            { value: minimumReceived.xtz, tokenName: 'XTZ' },
            { value: minimumReceived.tzbtc, tokenName: 'tzBTC' },
          ]}
        />
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
