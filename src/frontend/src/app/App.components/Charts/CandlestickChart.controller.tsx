import React from 'react'
import { useSelector } from 'react-redux'
import { State } from 'utils/interfaces'
import Chart from 'react-apexcharts'
import dayjs from 'dayjs'
import { CANDLESTICK_CHART_OPTIONS } from 'app/App.components/Charts/chart.consts'

const CandlestickChart = () => {
  const { chartData } = useSelector((state: State) => state.chart)

  return (
    <Chart
      series={[{ data: chartData }]}
      options={CANDLESTICK_CHART_OPTIONS}
      type="candlestick"
      height={'420px'}
      width={'95%'}
    />
  )
}

export default CandlestickChart
