import React, { useState } from 'react'

import { PRIMARY } from 'app/App.components/Button/Button.constants'
import { SLIPPAGE_TOGGLE_VALUES, SWAP_DEFAULT_INPUT_STATE } from '../helpers/const'
import { cyanColor, subHeaderColor } from 'styles'

import { Button } from 'app/App.components/Button/Button.controller'
import { CoinSwap } from 'app/App.components/CoinSwap/CoinSwap.controller'
import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { Input } from 'app/App.components/Input/Input.controller'

import { CustomizedText, HorisontalInfo } from 'pages/LiquidityBaking/LiquidityBaking.styles'

import { ActionScreenWrapper, CheckBox, CheckBoxLabel, CheckBoxWrapper, StepBlock } from '../LBAction.style'
import { LBActionBottomWrapper } from 'app/App.components/LBActionBottomWrapper/LBActionBottomWrapper.controller'

export const LBAddLiquidity = () => {
  const [inputValues, setInputValues] = useState(SWAP_DEFAULT_INPUT_STATE)
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
              XTZCoinData={{
                icon: 'XTZ_tezos',
                amount: 0,
              }}
              tzBTCCoinData={{
                icon: 'tzBTC',
                amount: 0,
              }}
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
              XTZCoinData={{
                icon: 'XTZ_tezos',
                amount: 0,
              }}
              tzBTCCoinData={{
                icon: 'tzBTC',
                amount: 0,
              }}
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
            <span>+</span>
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

      <LBActionBottomWrapper onClickHandler={setSeletedToggle} selectedToogle={selectedToogle} />
    </ActionScreenWrapper>
  )
}
