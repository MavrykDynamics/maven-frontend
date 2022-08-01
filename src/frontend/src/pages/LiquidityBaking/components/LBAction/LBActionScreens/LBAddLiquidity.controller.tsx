import React, { useState } from 'react'

import { PRIMARY } from 'app/App.components/Button/Button.constants'
import { SLIPPAGE_TOGGLE_VALUES } from '../helpers/const'
import { cyanColor, subHeaderColor } from 'styles'

import { Button } from 'app/App.components/Button/Button.controller'
import { CoinSwap } from 'app/App.components/CoinSwap/CoinSwap.controller'
import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { Input } from 'app/App.components/Input/Input.controller'
import { ToggleButton } from 'app/App.components/ToggleButton/Toggle-button.view'

import { CustomizedText, HorisontalInfo } from 'pages/LiquidityBaking/LiquidityBaking.styles'

import {
  ActionScreenWrapper,
  CheckBox,
  CheckBoxLabel,
  CheckBoxWrapper,
  PriceChange,
  StepBlock,
} from '../LBAction.style'

const defaultInputState = {
  XTZ_input: 0,
  tz_BTC_input: 0,
}

export const LBAddLiquidity = () => {
  const [inputValues, setInputValues] = useState(defaultInputState)
  const [selectedToogle, setSeletedToggle] = useState(SLIPPAGE_TOGGLE_VALUES[0])
  const [switchValue, setSwitchValue] = useState(false)

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputValues({
      ...inputValues,
      [name]: value,
    })
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
            <CheckBox id="checkbox" type="checkbox" checked={switchValue} />
            <CheckBoxLabel htmlFor="checkbox" onClick={() => setSwitchValue(!switchValue)} />
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
        <>
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

          <div className="step-wrapper">
            <StepBlock style={{ marginTop: '20px' }}>
              <div className="step">1</div>
              Swap
            </StepBlock>

            <CoinSwap
              icon={{ name: 'exchange', width: 22, height: 15 }}
              coin1Icon={'XTZ_tezos'}
              coin1Name={'XTZ'}
              coin2Icon={'tzBTC'}
              coin2Name={'tzBTC'}
            />
            <HorisontalInfo>
              <CustomizedText fontWidth={500}>Minimum tzBTC Received</CustomizedText>

              <CustomizedText fontWidth={500} color={cyanColor}>
                <CommaNumber value={0} showDecimal endingText="tzBTC" />
              </CustomizedText>
            </HorisontalInfo>
          </div>

          <hr />

          <div className="step-wrapper">
            <StepBlock>
              <div className="step">2</div>Add Liquidity
            </StepBlock>

            <CoinSwap
              icon={{ name: 'plus', width: 8, height: 14 }}
              coin1Icon={'XTZ_tezos'}
              coin1Name={'XTZ'}
              coin2Icon={'tzBTC'}
              coin2Name={'tzBTC'}
            />
            <HorisontalInfo>
              <CustomizedText fontWidth={500}>Liquidity Tokens created</CustomizedText>

              <CustomizedText fontWidth={500} color={cyanColor}>
                <CommaNumber value={0} showDecimal endingText="LBT" />
              </CustomizedText>
            </HorisontalInfo>
          </div>
        </>
      ) : (
        <>
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

          <HorisontalInfo>
            <CustomizedText fontWidth={500}>Liquidity Tokens created</CustomizedText>

            <CustomizedText fontWidth={500} color={cyanColor}>
              <CommaNumber value={0} showDecimal endingText="LBT" />
            </CustomizedText>
          </HorisontalInfo>
        </>
      )}

      <Button text={'Add Liquidity'} icon={'plusDark'} onClick={() => {}} className="addLiquidity_btn" kind={PRIMARY} />

      <div className="bottom-wrapper">
        <HorisontalInfo>
          <CustomizedText color={subHeaderColor} fontWidth={500}>
            Price Impact
          </CustomizedText>

          <CustomizedText fontWidth={500}>
            <PriceChange up>
              <CommaNumber beginningText="+" value={0.0732} showDecimal endingText="%" />
            </PriceChange>
          </CustomizedText>
        </HorisontalInfo>

        <HorisontalInfo>
          <CustomizedText color={subHeaderColor} fontWidth={500}>
            Minimum Received
          </CustomizedText>

          <CustomizedText color={cyanColor} fontWidth={500}>
            <CommaNumber value={0.00614124} endingText="LBT" />
          </CustomizedText>
        </HorisontalInfo>

        <HorisontalInfo>
          <CustomizedText color={subHeaderColor} fontWidth={500}>
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
