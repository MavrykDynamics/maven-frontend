import Chart from 'react-apexcharts'
import { AREA_CHART_OPTIONS } from 'app/App.components/Charts/chart.consts'
import { IntervalType, State } from 'utils/interfaces'
import { useSelector } from 'react-redux'
import Colors from 'styles/colors'

const AreaChart = ({
  chartData,
  interval,
  isMobileChart,
}: {
  chartData: any
  isMobileChart: boolean
  interval: IntervalType
}) => {
  const theme = useSelector((state: State) => state.preferences.themeSelected)
  return (
    // @ts-ignore
    <Chart
      series={[{ data: chartData }]}
      options={AREA_CHART_OPTIONS(interval, isMobileChart, Colors[theme])}
      type="area"
      height={'550px'}
      width={'100%'}
    />
  )
}

export default AreaChart
