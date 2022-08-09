import Chart from 'react-apexcharts'
import { CANDLESTICK_CHART_OPTIONS } from 'app/App.components/CandlestickChart/chart.consts'

const CandlestickChart = ({ chartData }: { chartData: any }) => {
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
