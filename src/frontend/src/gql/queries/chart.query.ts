import { IntervalType } from "utils/interfaces"

export const getChartQuery = (interval: IntervalType) => {
  return `
  query GetChartData($siriusDEXContract: String = "") {
    ${interval}(
    limit: 100
    where: {exchangeId: {_eq: $siriusDEXContract}}
    order_by: {bucket: desc}
  ) {
      bucket
      open
      high
      low
      close
      volume
      xtzVolume
      average
    }
  }
  `  
}

export const CHART_QUERY_NAME = 'GetChartData'
export function CHART_QUERY_VARIABLES(): Record<string, any> {
  /* prettier-ignore */
  return { siriusDEXContract: "KT1TxqZ8QtKvLu3V3JH7Gx58n7Co8pgtpQU5" }
}