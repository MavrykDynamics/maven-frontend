import React, { useState } from 'react'

import { PRIMARY } from 'app/App.components/Button/Button.constants'

import { CoinSwap } from 'app/App.components/CoinSwap/CoinSwap.controller'
import { Button } from 'app/App.components/Button/Button.controller'
import { Input } from 'app/App.components/Input/Input.controller'
import { CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'

import { ActionScreenWrapper } from '../LBAction.style'
import { calculateLqtOutput, removeLiquidityTokenReceived, removeLiquidityXtzReceived } from 'utils/DEX/liquidityUtils'
import { useSelector } from 'react-redux'
import { State } from 'utils/interfaces'
import { TezosToolkit } from '@taquito/taquito'
import env from 'utils/env'
import { LBActionBottomWrapperStyled } from 'app/App.components/LBActionBottomFields/LBActionBottom.style'
import { PriceImpact } from 'app/App.components/LBActionBottomFields/PriceImpact.controller'
import { MinimumReceived } from 'app/App.components/LBActionBottomFields/MinimumReceived.controller'
import { parseSrtToNum } from 'utils/utils'
import { SLIPPAGE_TOGGLE_VALUES } from '../helpers/const'
import { Slippage } from 'app/App.components/LBActionBottomFields/Slippage.contoller'
import { getSettings } from 'utils/DEX/DexCalcs'

const dex = getSettings('liquidity')

export const LBRemoveLiquidity = () => {
  const {
    lbData: { xtz_pool, token_pool, lqt_address, lqt_total },
    coinPrices,
  } = useSelector((state: State) => state.tokens)
  const { accountPkh } = useSelector((state: State) => state.wallet)
  const { LBTBalance } = useSelector((state: State) => state.user)

  const [inputValues, setInputValues] = useState({ Sir: '0' })
  const [selectedSlippage, setSelectedSlippage] = useState<number>(SLIPPAGE_TOGGLE_VALUES[0].value)
  const [slippageValue, setSlippageValue] = useState<string>(SLIPPAGE_TOGGLE_VALUES[0].value.toString())
  const [receivedAmount, setReceivedAmount] = useState({
    xtz: 0,
    tzbtc: 0,
  })

  const [minimumReceived, setMinimumReceived] = useState({
    xtz: 0,
    tzbtc: 0,
  })

  const slippageChangeHandler = (value: string, isInput?: boolean) => {
    if (+value >= 0 && +value <= 100) {
      setSlippageValue(value)
    }

    if (!isInput) {
      setSelectedSlippage(parseSrtToNum(value))
    }

    const { expected: expectedXtz, minimum: minimumXtz } = removeLiquidityXtzReceived(
      parseSrtToNum(value),
      lqt_total,
      xtz_pool,
      parseSrtToNum(slippageValue),
      dex,
    )
    const { expected: expectedToken, minimum: minimumToken } = removeLiquidityTokenReceived(
      parseSrtToNum(value),
      lqt_total,
      token_pool,
      parseSrtToNum(slippageValue),
    )

    setReceivedAmount({
      ...receivedAmount,
      xtz: expectedXtz.value,
      tzbtc: expectedToken.value,
    })

    setMinimumReceived({
      ...minimumReceived,
      xtz: minimumXtz.value,
      tzbtc: minimumToken.value,
    })
  }

  const inputChangeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | {
          target: {
            name: string
            value: number
          }
        },
  ) => {
    const { name, value } = e.target
    if (+value < 0) return

    // const { xtz, tzbtc } = calculateLqtOutput({
    //   lqTokens: parseSrtToNum(value),
    //   xtzPool: xtz_pool,
    //   tzbtcPool: token_pool,
    //   lqtTotal: lqt_total,
    // })

    const { expected: expectedXtz, minimum: minimumXtz } = removeLiquidityXtzReceived(
      parseSrtToNum(value),
      lqt_total,
      xtz_pool,
      parseSrtToNum(slippageValue),
      dex,
    )
    const { expected: expectedToken, minimum: minimumToken } = removeLiquidityTokenReceived(
      parseSrtToNum(value),
      lqt_total,
      token_pool,
      parseSrtToNum(slippageValue),
    )

    setReceivedAmount({
      ...receivedAmount,
      xtz: expectedXtz.value,
      tzbtc: expectedToken.value,
    })

    setMinimumReceived({
      ...minimumReceived,
      xtz: minimumXtz.value,
      tzbtc: minimumToken.value,
    })

    setInputValues({
      ...inputValues,
      [name]: value,
    })
  }

  const removeLiquidityHandler = async () => {
    const Tezos = new TezosToolkit(env.rpcLink)
    const lbContract = await Tezos.wallet.at(lqt_address)
    const deadline = new Date(Date.now() + 60000).toISOString()
    const { xtz, tzbtc } = calculateLqtOutput({
      lqTokens: parseSrtToNum(inputValues.Sir),
      xtzPool: xtz_pool,
      tzbtcPool: token_pool,
      lqtTotal: lqt_total,
    })

    const op = await lbContract.methods
      .removeLiquidity(accountPkh, parseSrtToNum(inputValues.Sir), xtz, tzbtc, deadline)
      .send()
    await op.confirmation()
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

      <Button
        text={'Remove Liquidity'}
        icon={'minus'}
        onClick={removeLiquidityHandler}
        className="removeLiquidity_btn"
        kind={PRIMARY}
      />

      <LBActionBottomWrapperStyled>
        <PriceImpact priceImpact={0} />
        <MinimumReceived
          minimumRecived={[
            { value: minimumReceived.xtz, tokenName: 'XTZ' },
            { value: minimumReceived.tzbtc, tokenName: 'tzBTC' },
          ]}
        />
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
            value={slippageValue}
            onBlur={() => {
              if (slippageValue === '') setSlippageValue('0')
            }}
            onFocus={() => {
              if (parseSrtToNum(slippageValue) === 0) {
                setSlippageValue('')
              }
            }}
          />
        ) : null}
      </LBActionBottomWrapperStyled>
    </ActionScreenWrapper>
  )
}
