import Chart from 'react-apexcharts'
import { CANDLESTICK_CHART_OPTIONS } from 'app/App.components/Charts/chart.consts'

const CandlestickChart = ({
  chartData,
  chartMinYValue,
  chartMaxYValue,
}: {
  chartData: any
  chartMinYValue: number
  chartMaxYValue: number
}) => {
  const candleStickOptions = CANDLESTICK_CHART_OPTIONS
  candleStickOptions.yaxis.min = chartMinYValue
  candleStickOptions.yaxis.max = chartMaxYValue
  return (
    <Chart
      series={[{ data: chartData }]}
      options={candleStickOptions}
      type="candlestick"
      height={'420px'}
      width={'95%'}
    />
  )
}

export default CandlestickChart
