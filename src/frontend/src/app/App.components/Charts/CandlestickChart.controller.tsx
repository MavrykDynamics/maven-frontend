import Chart from 'react-apexcharts'
import { CANDLESTICK_CHART_OPTIONS } from 'app/App.components/Charts/chart.consts'
import { IntervalType, State } from 'utils/interfaces'
import { useSelector } from 'react-redux'
import Colors from 'styles/colors'

const CandlestickChart = ({
  chartData,
  interval,
  moveHandler,
  isMobileChart,
}: {
  chartData: any
  isMobileChart: boolean
  interval: IntervalType
  moveHandler: (value: number, isOut?: boolean) => void
}) => {
  const theme = useSelector((state: State) => state.preferences.themeSelected)
  const textColor = Colors[theme].toggleButtonColor
  return (
    // @ts-ignore
    <Chart
      series={[{ data: chartData }]}
      options={CANDLESTICK_CHART_OPTIONS(interval, moveHandler, isMobileChart, textColor)}
      type="candlestick"
      height={'550px'}
      width={'100%'}
    />
  )
}

export default CandlestickChart
