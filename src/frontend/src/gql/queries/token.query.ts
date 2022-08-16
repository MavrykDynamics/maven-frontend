export const TOKEN_QUERY = `
query TokenDataQuery {
  token(where: {symbol: {_eq: "tzBTC"}}) {
    exchanges(where: {name: {_eq: "lb"}}) {
      activities(order_by: {timestamp: desc}, limit: 1) {
        tvlUsd
        timestamp
      }
      name
      tradeVolume
    }
    trades {
      tezQty
      timestamp
    }
  }
  stats1d(
    order_by: {bucket: desc}
    where: {users: {_is_null: false}, interactions: {_is_null: false}}
  ) {
    users
    interactions
    bucket
  }
}
`

export const TOKEN_QUERY_NAME = 'TokenDataQuery'