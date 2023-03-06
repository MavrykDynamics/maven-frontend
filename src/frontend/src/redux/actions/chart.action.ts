import { fetchFromIndexer } from 'gql/gql.helpers'
import { CHART_QUERY_NAME, CHART_QUERY_VARIABLES, getChartQuery } from 'gql/queries/chart.query'
import { UTCTimestamp } from 'lightweight-charts'
import { GET_CHART_DATA, TOOGLE_CHART_INTERVAL, TOOGLE_CHART_TYPE } from 'redux/action.types'
import { ChartPoint, ChartTypeType, IntervalType } from 'utils/interfaces'

export const getChartData = (interval: IntervalType) => async (dispatch: any, getState: any) => {
  try {
    const chartData = await fetchFromIndexer(
      getChartQuery(interval),
      CHART_QUERY_NAME,
      CHART_QUERY_VARIABLES(),
      'https://dex.dipdup.net/v1/graphql',
    )

    const normalizedChartData = normalizeChartData(chartData?.[interval])

    dispatch({
      type: GET_CHART_DATA,
      chartData: normalizedChartData,
    })
  } catch (error: any) {
    console.error(error)
  }
}

export const normalizeChartData = (chartData: Array<ChartPoint>) => {
  const parsedChartDataToCandlestick = chartData
    .map((chartPoint: ChartPoint) => ({
      time: new Date(chartPoint.bucket).getTime() as UTCTimestamp,
      open: 1 / parseFloat(chartPoint.open),
      close: 1 / parseFloat(chartPoint.close),
      high: 1 / parseFloat(chartPoint.high),
      low: 1 / parseFloat(chartPoint.low),
    }))
    .sort((first, second) => first.time - second.time)

  const parsedChartDataToArea = chartData
    .map((chartPoint: ChartPoint) => ({
      time: new Date(chartPoint.bucket).getTime() as UTCTimestamp,
      value: 1 / parseFloat(chartPoint.close),
    }))
    .sort((first, second) => first.time - second.time)

  return { candlestick: parsedChartDataToCandlestick, area: parsedChartDataToArea }
}

export const toogleChartInterval = (newInterval: IntervalType) => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: TOOGLE_CHART_INTERVAL,
      chartInterval: newInterval,
    })

    await dispatch(getChartData(newInterval))
  } catch (error: any) {
    console.error(error)
  }
}

export const toogleChartType = (newType: ChartTypeType) => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: TOOGLE_CHART_TYPE,
      chartType: newType,
    })
  } catch (error: any) {
    console.error(error)
  }
}
