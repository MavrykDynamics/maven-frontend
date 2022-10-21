import Chart from 'react-apexcharts'
import { AREA_CHART_OPTIONS } from 'app/App.components/Charts/chart.consts'
import { IntervalType, State } from 'utils/interfaces'
import { useSelector } from 'react-redux'
import Colors from 'styles/colors'

const AreaChart = ({
  chartData,
  interval,
  isMobileChart,
  moveHandler,
}: {
  chartData: any
  isMobileChart: boolean
  interval: IntervalType
  moveHandler: (value: number, isOut?: boolean) => void
}) => {
  const theme = useSelector((state: State) => state.preferences.themeSelected)
  return (
    // @ts-ignore
    <Chart
      series={[{ data: chartData }]}
      options={AREA_CHART_OPTIONS(interval, moveHandler, isMobileChart, Colors[theme])}
      type="area"
      height={'550px'}
      width={'100%'}
    />
  )
}

export default AreaChart
