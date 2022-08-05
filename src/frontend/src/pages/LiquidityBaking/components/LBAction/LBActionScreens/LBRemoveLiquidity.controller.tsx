import React, { useState } from 'react'

import { PRIMARY } from 'app/App.components/Button/Button.constants'
import { SLIPPAGE_TOGGLE_VALUES } from '../helpers/const'

import { CoinSwap } from 'app/App.components/CoinSwap/CoinSwap.controller'
import { Button } from 'app/App.components/Button/Button.controller'
import { Input } from 'app/App.components/Input/Input.controller'
import { CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'

import { ActionScreenWrapper } from '../LBAction.style'
import { LBActionBottomWrapper } from 'app/App.components/LBActionBottomWrapper/LBActionBottomWrapper.controller'
import { calculateLqtOutput } from 'utils/liquidityUtils'
import { useSelector } from 'react-redux'
import { State } from 'utils/interfaces'
import { TezosToolkit } from '@taquito/taquito'
import { ENVIRONMENT } from 'utils/consts'

export const LBRemoveLiquidity = () => {
  const {
    lbData: { xtz_pool, token_pool, lqt_address, lqt_total },
    coinPrices,
  } = useSelector((state: State) => state.tokens)
  const { accountPkh } = useSelector((state: State) => state.wallet)

  const [inputValues, setInputValues] = useState({ XTZ: 0 })
  const [selectedToogle, setSeletedToggle] = useState(SLIPPAGE_TOGGLE_VALUES[0])
  const [receivedAmount, setReceivedAmount] = useState({
    xtz: 0,
    tzbtc: 0,
  })
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      lqTokens: Number(inputValues.XTZ),
      xtzPool: xtz_pool,
      tzbtcPool: token_pool,
      lqtTotal: lqt_total,
    })

    const op = await lbContract.methods
      .removeLiquidity(accountPkh, Number(inputValues.XTZ), xtz, tzbtc, deadline)
      .send()
    await op.confirmation()
  }

  return (
    <ActionScreenWrapper className="removeLiqidity swap">
      <Input
        placeholder={'XTZ'}
        name="XTZ"
        onChange={inputChangeHandler}
        type={'number'}
        kind={'LB'}
        value={inputValues.XTZ}
        convertedValue={inputValues.XTZ * coinPrices.tezos.usd}
        icon={'XTZ_tezos'}
        pinnedText={'XTZ'}
        useMaxHandler={() => {}}
        userBalance={87}
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

      <LBActionBottomWrapper onClickHandler={setSeletedToggle} selectedToogle={selectedToogle} />
    </ActionScreenWrapper>
  )
}
