import { SLIPPAGE_TOGGLE_VALUES } from 'pages/LiquidityBaking/components/LBAction/helpers/const'
import { HorisontalInfo, CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import React from 'react'
import { subHeaderColor } from 'styles'
import { parseSrtToNum } from 'utils/utils'
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
        />
      </div>
    </HorisontalInfo>
  )
}
