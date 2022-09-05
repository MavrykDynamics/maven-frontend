import { SLIPPAGE_TOGGLE_VALUES } from 'pages/LiquidityBaking/components/LBAction/helpers/const'
import { HorisontalInfo, CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import React from 'react'
import { subHeaderColor } from 'styles'
import { nonNumberSymbolsValidation, parseSrtToNum } from 'utils/utils'
import Icon from '../Icon/Icon.view'
import { Input } from '../Input/Input.controller'
import { ToggleButton } from '../ToggleButton/Toggle-button.view'

export const Slippage = ({
  onClickHandler,
  selectedToogle,
  slippagePersent,
  setSlippagePersent,
}: {
  onClickHandler: (value: number | string) => void
  selectedToogle: string | number
  slippagePersent: string | number
  setSlippagePersent: (val: string | number) => void
}) => {
  return (
    <HorisontalInfo>
      <CustomizedText color={subHeaderColor} fontWidth={500}>
        Slippage Tolerance
        <div className="info">
          <Icon id="infoIcon" />
          <div className="text">
            Your transaction will not complete if the exchange rate changes unfavorably by more than this slippage
            percentage. The slippage does not include the Price Impact, when swapping you are accepting both the Price
            Impact % and the Slippage %.
          </div>
        </div>
      </CustomizedText>

      <div className="controls-wrapper">
        <ToggleButton
          values={SLIPPAGE_TOGGLE_VALUES}
          selected={selectedToogle}
          handleSetSelectedToggler={(value: unknown) => onClickHandler(value as number)}
          className="swap-toggler"
        />
        <Input
          placeholder={''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target
            onClickHandler(value)
          }}
          pinnedText={'%'}
          type={'number'}
          value={slippagePersent}
          onBlur={() => {
            if (slippagePersent === '') setSlippagePersent(0)
          }}
          onFocus={() => {
            if (parseSrtToNum(slippagePersent) === 0) {
              setSlippagePersent('')
            }
          }}
          onKeyDown={nonNumberSymbolsValidation}
          onWheel={(e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur()}
        />
      </div>
    </HorisontalInfo>
  )
}
