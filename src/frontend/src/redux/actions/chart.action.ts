import { fetchFromIndexer } from "gql/gql.heplers"
import { CHART_QUERY_NAME, IntervalType, getChartQuery } from "gql/queries/chart.query"
import { GET_CHART_DATA, TOOGLE_CHART_INTERVAL } from "redux/action.types"


export const getChartData = (interval: IntervalType) => async (dispatch: any, getState: any) => {
  try {
    const chartData = await fetchFromIndexer(
      getChartQuery(interval),
      CHART_QUERY_NAME,
      {},
      'https://dex.dipdup.net/v1/graphql'
    )

    dispatch({
      type: GET_CHART_DATA,
      chartData: chartData?.[interval]
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
