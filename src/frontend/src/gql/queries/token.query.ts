// export const tokenQuery = `
// query TokensDataQuery($symbols: [String!]) {
//   token(where: {symbol: {_in: $symbols}}) {
//     symbol
//     exchanges {
//       tokenPool
//     }
//   }
// }
// `

// export const queryName = 'TokensDataQuery'

// export const generateVariables = ([...tokens]) => tokens

export const TOKEN_QUERY = `
query TokensDataQuery {
  liquidity_baking {
    address
    lqt_address
    lqt_total
    token_address
    token_decimals
    xtz_decimals
    token_pool
    xtz_pool
  }
}
`

export const TOKEN_QUERY_NAME = 'TokensDataQuery'