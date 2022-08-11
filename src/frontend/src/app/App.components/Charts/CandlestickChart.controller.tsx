import Chart from 'react-apexcharts'
import { CANDLESTICK_CHART_OPTIONS } from 'app/App.components/Charts/chart.consts'
import { IntervalType } from 'utils/interfaces'

const CandlestickChart = ({ chartData, interval }: { chartData: any; interval: IntervalType }) => {
  return (
    <Chart
      series={[{ data: chartData }]}
      options={CANDLESTICK_CHART_OPTIONS(interval)}
      type="candlestick"
      height={'420px'}
      width={'100%'}
    />
  )
}

export default CandlestickChart
