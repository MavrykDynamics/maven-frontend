export type IntervalType = 'quotes1dNogaps' | 'quotes1hNogaps' | 'quotes1mo' | 'quotes1w' | 'quotesTotal'

export const getChartQuery = (interval: IntervalType) => {
  return `
  query GetChartData {
    ${interval} {
      close
      high
      low
      open
      bucket
    }
  }
  `  
}

export const CHART_QUERY_NAME = 'GetChartData'
export const  CHART_QUERY_VARIABLES = {}