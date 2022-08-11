import Chart from 'react-apexcharts'
import { AREA_CHART_OPTIONS } from 'app/App.components/Charts/chart.consts'
import { IntervalType } from 'utils/interfaces'

const AreaChart = ({ chartData, interval }: { chartData: any; interval: IntervalType }) => {
  return (
    <Chart
      series={[{ data: chartData }]}
      options={AREA_CHART_OPTIONS(interval)}
      type="area"
      height={'420px'}
      width={'100%'}
    />
  )
}

export default AreaChart
