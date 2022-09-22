import Chart from 'react-apexcharts'
import { AREA_CHART_OPTIONS } from 'app/App.components/Charts/chart.consts'
import { IntervalType } from 'utils/interfaces'

const AreaChart = ({
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
      options={AREA_CHART_OPTIONS(interval, moveHandler)}
      type="area"
      height={'550px'}
      width={'100%'}
    />
  )
}

export default AreaChart
