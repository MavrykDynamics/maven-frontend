export const GET_PERSONAL_STATS_QUERY = `
  query GetPersonalStats($v1: position_bool_exp) {
    position(where: $v1) {
      sharesQty
      avgSharePx
      realizedPl
      traderId
      exchange {
        sharePx
        sharePxUsd
        sharesTotal
      }
    }
  }
`

export const GET_PERSONAL_STATS_QUERY_NAME = 'GetPersonalStats'

export function GET_PERSONAL_STATS_VARIABLES(userAddress: string): Record<string, any> {
  /* prettier-ignore */
  return {
        v1: {
            traderId: {
                _eq: userAddress,
            },
            exchangeId: {
                _eq: 'KT1TxqZ8QtKvLu3V3JH7Gx58n7Co8pgtpQU5',
            },
        }
    }
}
