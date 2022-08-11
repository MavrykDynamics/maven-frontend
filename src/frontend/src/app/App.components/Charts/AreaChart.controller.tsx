import Chart from 'react-apexcharts'
import { AREA_CHART_OPTIONS } from 'app/App.components/Charts/chart.consts'

const AreaChart = ({ chartData }: { chartData: any }) => {
  return (
    <Chart series={[{ data: chartData }]} options={AREA_CHART_OPTIONS} type="area" height={'420px'} width={'100%'} />
  )
}

export default AreaChart
