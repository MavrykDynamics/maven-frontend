import Chart from 'react-apexcharts'
import { AREA_CHART_OPTIONS } from 'app/App.components/Charts/chart.consts'
import { IntervalType } from 'utils/interfaces'

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
  return (
    // @ts-ignore
    <Chart
      series={[{ data: chartData }]}
      options={AREA_CHART_OPTIONS(interval, moveHandler, isMobileChart)}
      type="area"
      height={'550px'}
      width={'100%'}
    />
  )
}

export default AreaChart
