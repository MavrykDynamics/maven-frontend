import { ChartType } from 'utils/interfaces'
import * as actions from '../action.types'

export const defaultChart: ChartType = {
  chartDataCandlestick: [],
  chartDataArea: [],
  chartInterval: 'quotes5mNogaps',
  chartType: 'candlestick',
}

const chart = (state = defaultChart, action: any) => {
  switch (action.type) {
    case actions.GET_CHART_DATA:
      return {
        ...state,
        chartDataCandlestick: action.chartData.candlestick,
        chartDataArea: action.chartData.area,
      }
    case actions.TOOGLE_CHART_INTERVAL:
      return {
        ...state,
        chartInterval: action.chartInterval,
      }
    case actions.TOOGLE_CHART_TYPE:
      return {
        ...state,
        chartType: action.chartType,
      }
    default:
      return state
  }
}

export default chart