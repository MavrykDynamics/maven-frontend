import Chart from 'react-apexcharts'
import { CANDLESTICK_CHART_OPTIONS } from 'app/App.components/Charts/chart.consts'
import { IntervalType } from 'utils/interfaces'

const CandlestickChart = ({
  chartData,
  interval,
  moveHandler,
}: {
  chartData: any
  interval: IntervalType
  moveHandler: (value: number, isOut?: boolean) => void
}) => {
  return (
    // @ts-ignore
    <Chart
      series={[{ data: chartData }]}
      options={CANDLESTICK_CHART_OPTIONS(interval, moveHandler)}
      type="candlestick"
      height={'550px'}
      width={'100%'}
    />
  )
}

export default CandlestickChart
