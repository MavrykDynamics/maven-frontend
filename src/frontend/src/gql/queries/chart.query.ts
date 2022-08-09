export type IntervalType = 'quotes1dNogaps' | 'quotes1hNogaps' | 'quotes1mo' | 'quotes1w' | 'quotesTotal' | 'quotes15mNogaps'

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