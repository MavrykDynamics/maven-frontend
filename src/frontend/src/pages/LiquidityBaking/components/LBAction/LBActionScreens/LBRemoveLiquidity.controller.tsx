import React, { useState } from 'react'

import { PRIMARY } from 'app/App.components/Button/Button.constants'
import { SLIPPAGE_TOGGLE_VALUES } from '../helpers/const'

import { CoinSwap } from 'app/App.components/CoinSwap/CoinSwap.controller'
import { Button } from 'app/App.components/Button/Button.controller'
import { Input } from 'app/App.components/Input/Input.controller'
import { CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'

import { ActionScreenWrapper } from '../LBAction.style'
import { LBActionBottomWrapper } from 'app/App.components/LBActionBottomWrapper/LBActionBottomWrapper.controller'

export const LBRemoveLiquidity = () => {
  const [inputValues, setInputValues] = useState({ XTZ_input: 0 })
  const [selectedToogle, setSeletedToggle] = useState(SLIPPAGE_TOGGLE_VALUES[0])

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputValues({
      ...inputValues,
      [name]: value,
    })
  }

  return (
    <ActionScreenWrapper className="removeLiqidity swap">
      <Input
        placeholder={'XTZ'}
        name="XTZ_input"
        onChange={inputChangeHandler}
        type={'number'}
        kind={'LB'}
        value={inputValues.XTZ_input}
        icon={'XTZ_tezos'}
        pinnedText={'XTZ'}
        useMaxHandler={() => {}}
        userBalance={87}
      />

      <hr />

      <CustomizedText style={{ marginBottom: '20px' }}>You Receive</CustomizedText>

      <CoinSwap
        icon={{ name: 'plus', width: 12, height: 18 }}
        coin1Icon={'XTZ_tezos'}
        coin1Name={'XTZ'}
        coin2Icon={'tzBTC'}
        coin2Name={'tzBTC'}
      />

      <hr />

      <Button
        text={'Remove Liquidity'}
        icon={'minus'}
        onClick={() => {}}
        className="removeLiquidity_btn"
        kind={PRIMARY}
      />

      <LBActionBottomWrapper onClickHandler={setSeletedToggle} selectedToogle={selectedToogle} />
    </ActionScreenWrapper>
  )
}
