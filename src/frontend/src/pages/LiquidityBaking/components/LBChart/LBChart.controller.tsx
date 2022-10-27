import { Button } from 'app/App.components/Button/Button.controller'
import AreaChart from 'app/App.components/Charts/AreaChart.controller'
import CandlestickChart from 'app/App.components/Charts/CandlestickChart.controller'
import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { ToggleButton } from 'app/App.components/ToggleButton/Toggle-button.view'
import { CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toogleChartInterval, toogleChartType } from 'redux/actions/chart.action'
import { IntervalType, State } from 'utils/interfaces'
import { ChartStyled } from './LBChart.style'

const intervalData = [
  {
    title: '5M',
    value: 'quotes5mNogaps',
  },
  {
    title: '15M',
    value: 'quotes15mNogaps',
  },
  {
    title: '1H',
    value: 'quotes1hNogaps',
  },
  {
    title: '1D',
    value: 'quotes1dNogaps',
  },
  {
    title: '1W',
    value: 'quotes1w',
  },
]

export const LBChart = ({
  className,
  returnBackToActionScreenHandler,
}: {
  className?: string
  returnBackToActionScreenHandler?: () => void
}) => {
  const { chartDataCandlestick, chartDataArea, chartInterval, chartType } = useSelector((state: State) => state.chart)
  const DEFAULT_CHART_COMPARE_VALUE = useMemo(
    () => chartDataArea.at(-1)?.y || chartDataCandlestick.at(-1)?.y[3] || 0,
    [chartDataArea, chartDataCandlestick],
  )
  const [moveValue, setMoveValue] = useState(0)

  useEffect(() => {
    setMoveValue(DEFAULT_CHART_COMPARE_VALUE)
  }, [DEFAULT_CHART_COMPARE_VALUE])

  const dispatch = useDispatch()

  const changeIntervalHandler = useCallback(async (newInterval: IntervalType) => {
    await dispatch(toogleChartInterval(newInterval))
  }, [])

  const changeChartTypeHandler = useCallback(async () => {
    await dispatch(toogleChartType(chartType === 'candlestick' ? 'area' : 'candlestick'))
  }, [chartType])

  const ChartControllsButtons = ({ className }: { className?: string }) => (
    <div className={className}>
      <ToggleButton
        values={intervalData}
        selected={chartInterval}
        handleSetSelectedToggler={(value: unknown) => changeIntervalHandler(value as IntervalType)}
        className="chart-toggler"
      />
      <Button
        text={''}
        icon={chartType === 'area' ? 'toggleChartToCandles' : 'toggleChartToArea'}
        className={`toggleChart LB`}
        kind="transparent"
        onClick={changeChartTypeHandler}
      />
    </div>
  )

  const isMobileChart = className === 'mobile-chart'

  return (
    <ChartStyled className={className}>
      <div className="chart-controlls">
        {isMobileChart ? (
          <Button
            text={''}
            icon={'goBackIcon'}
            className={`toggleChart arrow LB`}
            kind="transparent"
            onClick={returnBackToActionScreenHandler}
          />
        ) : null}
        <div className="chart-info">
          <img src="/images/sirius-icon.png" alt="" />
          <svg>
            <use xlinkHref="/icons/sprites.svg#exchange" />
          </svg>
          <div className="info">
            <CustomizedText color="#8D86EB" fontSize={14} fontWidth={600}>
              XTZ/tzBTC (Sirius)
            </CustomizedText>
            <CustomizedText fontSize={14} fontWidth={600} className="value">
              <CommaNumber value={moveValue} endingText="ꜩ" />
            </CustomizedText>
          </div>
        </div>
        {!isMobileChart ? <ChartControllsButtons className="right-wrapper" /> : null}
      </div>

      {chartDataCandlestick.length ? (
        <div className="chart-wrapper">
          {chartType === 'area' ? (
            <AreaChart isMobileChart={isMobileChart} chartData={chartDataArea} interval={chartInterval} />
          ) : (
            <CandlestickChart isMobileChart={isMobileChart} chartData={chartDataCandlestick} interval={chartInterval} />
          )}
        </div>
      ) : null}

      {isMobileChart ? <ChartControllsButtons className="right-wrapper-mobile" /> : null}
    </ChartStyled>
  )
}
