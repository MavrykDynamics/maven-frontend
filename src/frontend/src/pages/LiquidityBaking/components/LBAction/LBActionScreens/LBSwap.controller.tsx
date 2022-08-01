import React, { useState } from 'react'

import { cyanColor, subHeaderColor } from 'styles'
import { SWAP_DEFAULT_INPUT_STATE, SLIPPAGE_TOGGLE_VALUES } from '../helpers/const'

import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { Input } from 'app/App.components/Input/Input.controller'
import { ToggleButton } from 'app/App.components/ToggleButton/Toggle-button.view'

import { CustomizedText, VertInfo, HorisontalInfo } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { ActionScreenWrapper, PriceChange } from '../LBAction.style'

export const LBSwap = () => {
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

      <VertInfo>
        <CustomizedText fontWidth={500}>Exchange Rate</CustomizedText>

        <CustomizedText color={cyanColor} fontWidth={500}>
          1 XTZ (<CommaNumber beginningText="$" value={1.6} /> ) ={' '}
          <CommaNumber value={0.00008} showDecimal endingText="tzBTC" />
        </CustomizedText>
      </VertInfo>

      <div className="bottom-wrapper">
        <HorisontalInfo>
          <CustomizedText color={subHeaderColor} fontWidth={500} className="name">
            Price Impact
          </CustomizedText>

          <CustomizedText fontWidth={500}>
            <PriceChange up>
              <CommaNumber beginningText="+" value={0.0732} showDecimal endingText="%" />
            </PriceChange>
          </CustomizedText>
        </HorisontalInfo>

        <HorisontalInfo>
          <CustomizedText color={subHeaderColor} fontWidth={500} className="name">
            Minimum Received
          </CustomizedText>

          <CustomizedText color={cyanColor} fontWidth={500}>
            <CommaNumber value={0.00614124} endingText="LBT" />
          </CustomizedText>
        </HorisontalInfo>
        <HorisontalInfo>
          <CustomizedText color={subHeaderColor} fontWidth={500} className="name">
            Slippage Tolerance
          </CustomizedText>

          <ToggleButton
            values={SLIPPAGE_TOGGLE_VALUES}
            selected={selectedToogle}
            handleSetSelectedToggler={(value: string) => setSeletedToggle(value)}
            className="swap-toggler"
          />
        </HorisontalInfo>
      </div>
    </ActionScreenWrapper>
  )
}
