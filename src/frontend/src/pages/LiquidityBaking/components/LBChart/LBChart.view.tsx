import { ChartStyled } from './LBChart.style'
import CandlestickChart from 'app/App.components/Charts/CandlestickChart.controller'
import { ToggleButton } from 'app/App.components/ToggleButton/Toggle-button.view'
import { Button } from 'app/App.components/Button/Button.controller'
import { CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { cyanColor } from 'styles'
import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { ChartTypeType, IntervalType } from 'utils/interfaces'
import AreaChart from 'app/App.components/Charts/AreaChart.controller'

const intervalData = [
  {
    title: '5m',
    value: 'quotes5mNogaps',
  },
  {
    title: '15m',
    value: 'quotes15mNogaps',
  },
  {
    title: '1h',
    value: 'quotes1hNogaps',
  },
  {
    title: '1d',
    value: 'quotes1dNogaps',
  },
  {
    title: '1w',
    value: 'quotes1w',
  },
  {
    title: '1mo',
    value: 'quotes1mo',
  },
]

type LBChartViewProps = {
  selectedInterval: IntervalType
  selectedChartType: ChartTypeType
  changeSelectedInterval: (newInterval: IntervalType) => void
  changeSelectedChartType: () => void
  chartData: any
  tztzBTC: number
  chartMinYValue: number
  chartMaxYValue: number
}

export const LBChartView = ({
  selectedInterval,
  changeSelectedInterval,
  changeSelectedChartType,
  tztzBTC,
  chartData,
  selectedChartType,
  chartMinYValue,
  chartMaxYValue,
}: LBChartViewProps) => {
  return (
    <ChartStyled>
      <div className="chart-controlls">
        <div className="chart-info">
          <img src="/images/sirius-icon.png" alt="" />
          <svg>
            <use xlinkHref="/icons/sprites.svg#exchange" />
          </svg>
          <div className="info">
            <CustomizedText color="#8D86EB" fontSize={14} fontWidth={600}>
              XTZ/tzBTC (Sirius)
            </CustomizedText>
            <CustomizedText color={cyanColor} fontSize={14} fontWidth={600}>
              <CommaNumber value={tztzBTC} endingText="ꜩ" />
            </CustomizedText>
          </div>
        </div>
        <div className="right-wrapper">
          <ToggleButton
            values={intervalData}
            selected={selectedInterval}
            handleSetSelectedToggler={(value: unknown) => changeSelectedInterval(value as IntervalType)}
          />
          <Button
            text={''}
            icon="toggleChartType"
            className={`toggleChart ${selectedChartType}`}
            kind="transparent"
            onClick={changeSelectedChartType}
          />
        </div>
      </div>
      {chartData.length ? (
        <div className="chart-wrapper">
          {selectedChartType === 'area' ? (
            <AreaChart chartData={chartData} />
          ) : (
            <CandlestickChart chartData={chartData} chartMinYValue={chartMinYValue} chartMaxYValue={chartMaxYValue} />
          )}
        </div>
      ) : null}
    </ChartStyled>
  )
}
