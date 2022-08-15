import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toogleChartInterval, toogleChartType } from 'redux/actions/chart.action'
import { IntervalType, State } from 'utils/interfaces'
import { LBChartView } from './LBChart.view'

export const LBChart = () => {
  const { chartDataCandlestick, chartDataArea, chartInterval, chartType } = useSelector((state: State) => state.chart)
  const [moveValue, setMoveValue] = useState(chartDataArea.at(-1)?.y || 0)
  const chartHoverHandler = (value: number, isOut?: boolean) => {
    if (isOut) setMoveValue(chartDataArea.at(-1)?.y || 0)
    else setMoveValue(value)
  }

  const dispatch = useDispatch()

  const changeIntervalHanler = async (newInterval: IntervalType) => {
    await dispatch(toogleChartInterval(newInterval))
  }

  const changeChartTypeHanler = async () => {
    await dispatch(toogleChartType(chartType === 'candlestick' ? 'area' : 'candlestick'))
  }

  return (
    <LBChartView
      selectedInterval={chartInterval}
      changeSelectedInterval={changeIntervalHanler}
      chartData={chartType === 'area' ? chartDataArea : chartDataCandlestick}
      xtztzBTC={moveValue}
      chartMouseMoveHandler={chartHoverHandler}
      selectedChartType={chartType}
      changeSelectedChartType={changeChartTypeHanler}
    />
  )
}
