import Chart from 'react-apexcharts'
import { CANDLESTICK_CHART_OPTIONS } from 'app/App.components/Charts/chart.consts'
import { IntervalType, State } from 'utils/interfaces'
import { useSelector } from 'react-redux'
import Colors from 'styles/colors'
import { useMedia } from 'react-use'

const CandlestickChart = ({
  chartData,
  interval,
  isMobileChart,
}: {
  chartData: any
  isMobileChart: boolean
  interval: IntervalType
}) => {
  const isMobileMax = useMedia('(max-width: 770px)')
  const isMobileMin = useMedia('(min-width: 550px)')
  const theme = useSelector((state: State) => state.preferences.themeSelected)

  return (
    // @ts-ignore
    <Chart
      series={[{ data: chartData }]}
      options={CANDLESTICK_CHART_OPTIONS(interval, isMobileChart, Colors[theme])}
      type="candlestick"
      height={isMobileMax && isMobileMin ? '420px' : '500px'}
      width={'100%'}
    />
  )
}

export default CandlestickChart
