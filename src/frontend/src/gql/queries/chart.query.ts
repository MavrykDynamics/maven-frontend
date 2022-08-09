import { IntervalType } from "utils/interfaces"

export const getChartQuery = (interval: IntervalType) => {
  return `
  query GetChartData {
    ${interval}(limit: 50) {
      bucket
      open
      high
      low
      close
    }
  }
  `  
}

export const CHART_QUERY_NAME = 'GetChartData'