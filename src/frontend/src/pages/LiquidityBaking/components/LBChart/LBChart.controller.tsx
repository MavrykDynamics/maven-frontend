import { IntervalType } from 'gql/queries/chart.query'
import { useDispatch, useSelector } from 'react-redux'
import { toogleChartInterval } from 'redux/actions/chart.action'
import { State } from 'utils/interfaces'
import { LBChartView } from './LBChart.view'

export const LBChart = () => {
  const { chartData, chartInterval } = useSelector((state: State) => state.chart)
  const dispatch = useDispatch()

  const changeIntervalHanler = async (newInterval: IntervalType) => {
    await dispatch(toogleChartInterval(newInterval))
  }

  return (
    <LBChartView
      selectedInterval={chartInterval}
      changeSelectedInterval={changeIntervalHanler}
      chartData={chartData}
      tztzBTC={235254}
    />
  )
}
