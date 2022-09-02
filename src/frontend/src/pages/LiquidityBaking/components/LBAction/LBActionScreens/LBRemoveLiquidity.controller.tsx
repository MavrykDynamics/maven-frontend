import { useSelector } from 'react-redux'
import { TezosToolkit } from '@taquito/taquito'
import React, { useState } from 'react'

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
import { parseSrtToNum, slippagePersentToValue } from 'utils/utils'
import { SLIPPAGE_TOGGLE_VALUES } from '../helpers/const'
import { getSettings } from 'utils/DEX/DexCalcs'
import { PRIMARY } from 'app/App.components/Button/Button.constants'
import { removeLiquidityHandler } from '../helpers/addAndRemoveLiquidity.utils'
import { AddLiquidutityInputChangeEventType } from '../helpers/actionsScreen.types'
import { ConnectWallet } from 'app/App.components/ConnectWallet_old/ConnectWallet.controller'

const dex = getSettings('liquidity')

export const LBRemoveLiquidity = ({ ready }: { ready: boolean }) => {
  const {
    lbData: { xtz_pool, token_pool, address, lqt_total },
    coinPrices,
  } = useSelector((state: State) => state.tokens)
  const { accountPkh } = useSelector((state: State) => state.wallet)
  const { LBTBalance } = useSelector((state: State) => state.user)

  const [inputValues, setInputValues] = useState({ Sir: '0' })
  const [selectedSlippage, setSelectedSlippage] = useState<number>(SLIPPAGE_TOGGLE_VALUES[0].value)
  const [slippagePersent, setSlippagePersent] = useState<string | number>(SLIPPAGE_TOGGLE_VALUES[0].value.toString())
  const [receivedAmount, setReceivedAmount] = useState({
    xtz: 0,
    tzbtc: 0,
  })
  const [minimumReceived, setMinimumReceived] = useState({
    xtz: 0,
    tzbtc: 0,
  })

  const tzbtcAndXtzAmountCalculation = ({
    newSlippagePersent,
    newSirBurnedValue,
  }: {
    newSlippagePersent?: string | number
    newSirBurnedValue?: string | number
  }) => {
    const convertedSlippagePersentToValue = slippagePersentToValue(newSlippagePersent ?? slippagePersent)

    const { expected: expectedXtz, minimum: minimumXtz } = removeLiquidityXtzReceived(
      parseSrtToNum(newSirBurnedValue || inputValues.Sir),
      lqt_total,
      xtz_pool,
      convertedSlippagePersentToValue,
      dex,
    )

    const { expected: expectedToken, minimum: minimumToken } = removeLiquidityTokenReceived(
      parseSrtToNum(newSirBurnedValue || inputValues.Sir),
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
      setSlippagePersent(value)
      tzbtcAndXtzAmountCalculation({ newSlippagePersent })
    }

    if (!isInput) {
      setSelectedSlippage(parseSrtToNum(value))
    }
  }

  // change input value handler
  const inputChangeHandler = (e: AddLiquidutityInputChangeEventType) => {
    const { name, value } = e.target
    if (+value < 0) return
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
          sirAmount: inputValues.Sir,
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
        value={inputValues.Sir}
        convertedValue={parseSrtToNum(inputValues.Sir) * coinPrices.tezos.usd}
        icon={'XTZ_tezos'}
        pinnedText={'Sir'}
        useMaxHandler={() => {
          inputChangeHandler({
            target: {
              name: 'Sir',
              value: LBTBalance,
            },
          })
        }}
        userBalance={LBTBalance}
        onBlur={() => {
          if (inputValues.Sir === '') {
            setInputValues({
              ...inputValues,
              Sir: '0',
            })
          }
        }}
        onFocus={() => {
          if (parseSrtToNum(inputValues.Sir) === 0) {
            setInputValues({
              ...inputValues,
              Sir: '',
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
          minimumRecived={[
            { value: minimumReceived.xtz, tokenName: 'XTZ' },
            { value: minimumReceived.tzbtc, tokenName: 'tzBTC' },
          ]}
        />
        <Slippage
          onClickHandler={(value) => slippageChangeHandler(value, false)}
          selectedToogle={selectedSlippage}
          setSlippagePersent={setSlippagePersent}
          slippagePersent={slippagePersent}
        />
      </LBActionBottomWrapperStyled>
    </ActionScreenWrapper>
  )
}
