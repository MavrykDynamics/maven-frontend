import { fetchFromIndexer } from "gql/gql.heplers"
import { CHART_QUERY_NAME, IntervalType, getChartQuery } from "gql/queries/chart.query"
import { GET_CHART_DATA, TOOGLE_CHART_INTERVAL } from "redux/action.types"
import { ChartPoint } from "utils/interfaces"


export const getChartData = (interval: IntervalType) => async (dispatch: any, getState: any) => {
  try {
    const chartData = await fetchFromIndexer(
      getChartQuery(interval),
      CHART_QUERY_NAME,
      {},
      'https://dex.dipdup.net/v1/graphql'
    )

    console.log(chartData);
    
    
    const parsedChartData = chartData?.[interval].map((chartPoint: ChartPoint) => ({
      x: new Date(chartPoint.bucket),
      y: [parseFloat(chartPoint.open), parseFloat(chartPoint.high), parseFloat(chartPoint.low), parseFloat(chartPoint.close)]
    })).sort((first: any, second: any) => second.x.getTime() - first.x.getTime())

    dispatch({
      type: GET_CHART_DATA,
      chartData: parsedChartData
    })
  } catch (error: any) {
    console.error(error)
  }
}

export const toogleChartInterval = (newInterval: IntervalType) => async (dispatch: any, getState: any) => {
  try {

    dispatch({
      type: TOOGLE_CHART_INTERVAL,
      chartInterval: newInterval
    })

    await dispatch(getChartData(newInterval))

  } catch (error: any) {
    console.error(error)
  }
}
