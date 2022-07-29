import { CustomizedText, HorisontalInfo } from '../../LBHeader/LBHeader.style'
import { ActionScreenWrapper, PriceChange } from '../LBAction.style'
import { slippageToleranceToggleValues } from './LBSwap.controller'
import { PRIMARY } from 'app/App.components/Button/Button.constants'
import { Button } from 'app/App.components/Button/Button.controller'
import { CoinSwap } from 'app/App.components/CoinSwap/CoinSwap.controller'
import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { Input } from 'app/App.components/Input/Input.controller'
import { ToggleButton } from 'app/App.components/ToggleButton/Toggle-button.view'
import React, { useState } from 'react'
import { cyanColor } from 'styles'

export const LBRemoveLiquidity = () => {
  const [inputValues, setInputValues] = useState({ XTZ_input: 0 })
  const [selectedToogle, setSeletedToggle] = useState(slippageToleranceToggleValues[0])

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

      <div className="bottom-wrapper">
        <HorisontalInfo>
          <CustomizedText color={'#8D86EB'} fontWidth={500}>
            Price Impact
          </CustomizedText>

          <CustomizedText fontWidth={500}>
            <PriceChange up>
              <CommaNumber beginningText="+" value={0.0732} showDecimal endingText="%" />
            </PriceChange>
          </CustomizedText>
        </HorisontalInfo>

        <HorisontalInfo>
          <CustomizedText color={'#8D86EB'} fontWidth={500}>
            Minimum Received
          </CustomizedText>

          <CustomizedText color={cyanColor} fontWidth={500}>
            <CommaNumber value={0.00614124} endingText="LBT" />
          </CustomizedText>
        </HorisontalInfo>

        <HorisontalInfo>
          <CustomizedText color={'#8D86EB'} fontWidth={500}>
            Slippage Tolerance
          </CustomizedText>

          <ToggleButton
            values={slippageToleranceToggleValues}
            selected={selectedToogle}
            handleSetSelectedToggler={(value: string) => setSeletedToggle(value)}
            className="swap-toggler"
          />
        </HorisontalInfo>
      </div>
    </ActionScreenWrapper>
  )
}
