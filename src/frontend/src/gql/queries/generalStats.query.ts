export const GET_GENERAL_STATS_QUERY = `
  query GetGeneralStats($v1: exchange_bool_exp) {
    exchange(where: $v1) {
      address
      midPrice
      name
      originatedAt
      sharePx
      sharePxBtc
      sharePxUsd
      sharesTotal
      standard
      tezPool
      tokenId
      tokenPool
      tradeVolume
      typeHash
    }
  }
`

export const GET_GENERAL_STATS_QUERY_NAME = 'GetPersonalStats'

export function GET_GENERAL_STATS_VARIABLES(): Record<string, any> {
  /* prettier-ignore */
  return {
        v1: {
            address: {
                _eq: 'KT1TxqZ8QtKvLu3V3JH7Gx58n7Co8pgtpQU5',
            },
        }
    }
}
