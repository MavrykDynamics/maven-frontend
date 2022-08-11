import { fetchFromIndexer } from 'gql/gql.heplers'
import { CHART_QUERY_NAME, CHART_QUERY_VARIABLES, getChartQuery } from 'gql/queries/chart.query'
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
    const parsedChartDataToCandlestick = chartData?.[interval]
      .map((chartPoint: ChartPoint) => ({
        x: new Date(chartPoint.bucket),
        y: [
          parseFloat(chartPoint.open),
          parseFloat(chartPoint.high),
          parseFloat(chartPoint.low),
          parseFloat(chartPoint.close),
        ],
      }))
      .sort((first: any, second: any) => first.x.getTime() - second.x.getTime())

    const parsedChartDataToArea = chartData?.[interval]
      .map((chartPoint: ChartPoint) => ({
        x: new Date(chartPoint.bucket),
        y: parseFloat(chartPoint.close),
      }))
      .sort((first: any, second: any) => first.x.getTime() - second.x.getTime())

    const minMaxYValues = getChartsMinMaxYValues(parsedChartDataToCandlestick, interval)

    dispatch({
      type: GET_CHART_DATA,
      chartData: { candlestick: parsedChartDataToCandlestick, area: parsedChartDataToArea },
      chartMinYValue: minMaxYValues.minY,
      chartMaxYValue: minMaxYValues.maxY,
    })
  } catch (error: any) {
    console.error(error)
  }
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

export const getChartsMinMaxYValues = (chartData: any, newInterval: IntervalType) => {
  let minY = Math.min(...chartData.map((o: any) => o.y[2])),
    maxY = Math.max(...chartData.map((o: any) => o.y[1]))

  const intervalPriceCushion = {
    quotes5mNogaps: 500,
    quotes15mNogaps: 1000,
    quotes1hNogaps: 2500,
    quotes1dNogaps: 400,
    quotes1w: 3000,
    quotes1mo: 3000,
    quotesTotal: 3000,
  }
  minY = minY - intervalPriceCushion[newInterval] >= 0 ? minY - intervalPriceCushion[newInterval] : minY
  maxY = maxY + intervalPriceCushion[newInterval]

  return { minY, maxY }
}
