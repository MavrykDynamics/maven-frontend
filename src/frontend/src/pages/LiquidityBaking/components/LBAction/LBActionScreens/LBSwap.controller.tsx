import React, { useState } from 'react'

import { cyanColor } from 'styles'
import { SWAP_DEFAULT_INPUT_STATE, SLIPPAGE_TOGGLE_VALUES } from '../helpers/const'

import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { Input } from 'app/App.components/Input/Input.controller'

import { CustomizedText, VertInfo } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { ActionScreenWrapper } from '../LBAction.style'
import { Button } from 'app/App.components/Button/Button.controller'
import { ConnectWallet } from 'app/App.components/ConnectWallet/ConnectWallet.controller'
import { PRIMARY } from 'app/App.components/Button/Button.constants'
import { LBActionBottomWrapper } from 'app/App.components/LBActionBottomWrapper/LBActionBottomWrapper.controller'

export const LBSwap = ({ ready }: { ready: boolean }) => {
  const [selectedToogle, setSeletedToggle] = useState(SLIPPAGE_TOGGLE_VALUES[0])
  const [inputValues, setInputValues] = useState(SWAP_DEFAULT_INPUT_STATE)

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setInputValues({
      ...inputValues,
      [name]: value,
    })
  }

  return (
    <ActionScreenWrapper className="swap">
      <div className="exchange-block">
        <CustomizedText>XTZ</CustomizedText>

        <svg>
          <use xlinkHref="/icons/sprites.svg#exchange" />
        </svg>

        <CustomizedText>tzBTC</CustomizedText>
      </div>

      <div className="input-wrapper">
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
        <svg>
          <use xlinkHref="/icons/sprites.svg#exchange" />
        </svg>
        <Input
          placeholder={'tzBTC'}
          name="tz_BTC_input"
          onChange={inputChangeHandler}
          type={'number'}
          kind={'LB'}
          value={inputValues.tz_BTC_input}
          icon={'tzBTC'}
          pinnedText={'tzBTC'}
          useMaxHandler={() => {}}
          userBalance={87}
        />
      </div>

      {ready ? (
        <Button text={'Swap'} icon={'swapBtnIcon'} onClick={() => {}} className="swap_btn" kind={PRIMARY} />
      ) : (
        <ConnectWallet className="swap-action" />
      )}

      <VertInfo>
        <CustomizedText fontWidth={500}>Exchange Rate</CustomizedText>

        <CustomizedText color={cyanColor} fontWidth={500}>
          1 XTZ (<CommaNumber beginningText="$" value={1.6} /> ) ={' '}
          <CommaNumber value={0.00008} showDecimal endingText="tzBTC" />
        </CustomizedText>
      </VertInfo>

      <LBActionBottomWrapper onClickHandler={setSeletedToggle} selectedToogle={selectedToogle} />
    </ActionScreenWrapper>
  )
}
