import { SLIPPAGE_TOGGLE_VALUES } from 'pages/LiquidityBaking/components/LBAction/helpers/const'
import { PriceChange } from 'pages/LiquidityBaking/components/LBAction/LBAction.style'
import { HorisontalInfo, CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import React from 'react'
import { subHeaderColor, cyanColor } from 'styles'
import { CommaNumber } from '../CommaNumber/CommaNumber.controller'
import { ToggleButton } from '../ToggleButton/Toggle-button.view'
import { LBActionBottomWrapperStyled } from './LBActionBottomWrapper.style'

type LBActionBottomWrapperProps = {
  onClickHandler: (value: string) => void
  selectedToogle: string
}

export const LBActionBottomWrapper = ({ onClickHandler, selectedToogle }: LBActionBottomWrapperProps) => {
  return (
    <LBActionBottomWrapperStyled>
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
          handleSetSelectedToggler={(value: string) => onClickHandler(value)}
          className="swap-toggler"
        />
      </HorisontalInfo>
    </LBActionBottomWrapperStyled>
  )
}
