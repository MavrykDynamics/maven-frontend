import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMedia } from 'react-use'

import { toogleChartInterval, toogleChartType } from 'redux/actions/chart.action'
import { IntervalType, State } from 'utils/interfaces'
import themeColors from 'styles/colors'

import { Button } from 'app/App.components/Button/Button.controller'
import { Chart } from 'app/App.components/Chart/Chart.view'
import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { ToggleButton } from 'app/App.components/ToggleButton/Toggle-button.view'

import { CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { ChartStyled } from './LBChart.style'
import { SECONDARY_COLOR, THIRD_COLOR } from 'pages/LiquidityBaking/LiquidityBaking.styles'

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
  const { themeSelected } = useSelector((state: State) => state.preferences)
  const LAST_CHART_COMPARE_VALUE = useMemo(
    () => chartDataArea.at(-1)?.value || chartDataCandlestick.at(-1)?.close || 0,
    [chartDataArea, chartDataCandlestick],
  )
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

  const isMobileMax = useMedia('(max-width: 770px)')
  const isMobileMin = useMedia('(min-width: 550px)')

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
            <CustomizedText className={THIRD_COLOR} fontSize={20} fontWidth={600}>
              XTZ/tzBTC (Sirius)
            </CustomizedText>
            <CustomizedText fontSize={14} fontWidth={600} className={`${SECONDARY_COLOR} value`}>
              <CommaNumber
                value={LAST_CHART_COMPARE_VALUE}
                endingIconName="tezosAsset"
                showDecimal
                decimalsToShow={6}
              />
            </CustomizedText>
          </div>
        </div>
        {!isMobileChart ? <ChartControllsButtons className="right-wrapper" /> : null}
      </div>

      {chartDataCandlestick.length ? (
        <Chart
          className="lb-chart"
          data={chartType === 'area' ? chartDataArea : chartDataCandlestick}
          settings={{
            height: isMobileMax && isMobileMin ? 410 : 500,
            xAsisTimeFormat: chartInterval === 'quotes1dNogaps' || chartInterval === 'quotes1w' ? 'DD/MM' : 'HH:mm',
          }}
          colors={{
            lineColor: '#77A4F2',
            areaTopColor: '#77A4F2',
            areaBottomColor: 'rgba(119, 164, 242, 0)',
            textColor: themeColors[themeSelected].regularText,
            borderColor: themeColors[themeSelected].strokeColor,
          }}
          chartType={chartType}
          tooltipAsset={'tzBTC'}
        />
      ) : null}

      {isMobileChart ? <ChartControllsButtons className="right-wrapper-mobile" /> : null}
    </ChartStyled>
  )
}
