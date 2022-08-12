import React, { useState } from 'react'

import { PRIMARY } from 'app/App.components/Button/Button.constants'

import { CoinSwap } from 'app/App.components/CoinSwap/CoinSwap.controller'
import { Button } from 'app/App.components/Button/Button.controller'
import { Input } from 'app/App.components/Input/Input.controller'
import { CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'

import { ActionScreenWrapper } from '../LBAction.style'
import { calculateLqtOutput } from 'pages/LiquidityBaking/components/LBAction/helpers/liquidityUtils'
import { useSelector } from 'react-redux'
import { State } from 'utils/interfaces'
import { TezosToolkit } from '@taquito/taquito'
import { ENVIRONMENT } from 'utils/consts'
import { LBActionBottomWrapperStyled } from 'app/App.components/LBActionBottomFields/LBActionBottom.style'
import { PriceImpact } from 'app/App.components/LBActionBottomFields/PriceImpact.controller'
import { MinimumReceived } from 'app/App.components/LBActionBottomFields/MinimumReceived.controller'

export const LBRemoveLiquidity = () => {
  const {
    lbData: { xtz_pool, token_pool, lqt_address, lqt_total },
    coinPrices,
  } = useSelector((state: State) => state.tokens)
  const { accountPkh } = useSelector((state: State) => state.wallet)
  const { LBTBalance } = useSelector((state: State) => state.user)

  const [inputValues, setInputValues] = useState({ Sir: 0 })
  const [receivedAmount, setReceivedAmount] = useState({
    xtz: 0,
    tzbtc: 0,
  })
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

    const { xtz, tzbtc } = calculateLqtOutput({
      lqTokens: Number(value),
      xtzPool: xtz_pool,
      tzbtcPool: token_pool,
      lqtTotal: lqt_total,
    })

    setReceivedAmount({
      ...receivedAmount,
      xtz,
      tzbtc,
    })

    setInputValues({
      ...inputValues,
      [name]: value,
    })
  }

  const removeLiquidityHandler = async () => {
    const Tezos = new TezosToolkit(ENVIRONMENT.rpcLink)
    const lbContract = await Tezos.wallet.at(lqt_address)
    const deadline = new Date(Date.now() + 60000).toISOString()
    const { xtz, tzbtc } = calculateLqtOutput({
      lqTokens: Number(inputValues.Sir),
      xtzPool: xtz_pool,
      tzbtcPool: token_pool,
      lqtTotal: lqt_total,
    })

    const op = await lbContract.methods
      .removeLiquidity(accountPkh, Number(inputValues.Sir), xtz, tzbtc, deadline)
      .send()
    await op.confirmation()
  }

  return (
    <ActionScreenWrapper className="removeLiqidity swap">
      <Input
        placeholder={'Sir'}
        name="Sir"
        onChange={inputChangeHandler}
        type={'number'}
        kind={'LB'}
        value={inputValues.Sir}
        convertedValue={inputValues.Sir * coinPrices.tezos.usd}
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
            { value: 0, tokenName: 'XTZ' },
            { value: 0, tokenName: 'tzBTC' },
          ]}
        />
      </LBActionBottomWrapperStyled>
    </ActionScreenWrapper>
  )
}
