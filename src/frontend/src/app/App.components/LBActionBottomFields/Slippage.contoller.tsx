import { SLIPPAGE_TOGGLE_VALUES } from 'pages/LiquidityBaking/components/LBAction/helpers/const'
import { HorisontalInfo, CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { subHeaderColor } from 'styles'
import { ToggleButton } from '../ToggleButton/Toggle-button.view'

export const Slippage = ({
  onClickHandler,
  selectedToogle,
}: {
  onClickHandler: (value: number) => void
  selectedToogle: string | number
}) => {
  return (
    <HorisontalInfo>
      <CustomizedText color={subHeaderColor} fontWidth={500}>
        Slippage Tolerance
      </CustomizedText>

      <ToggleButton
        values={SLIPPAGE_TOGGLE_VALUES}
        selected={selectedToogle}
        handleSetSelectedToggler={(value: unknown) => onClickHandler(value as number)}
        className="swap-toggler"
      />
    </HorisontalInfo>
  )
}
