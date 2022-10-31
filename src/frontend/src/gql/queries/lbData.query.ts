export const LB_DATA_QUERY = `
query LBDataQuery {
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

export const LB_DATA_QUERY_NAME = 'LBDataQuery'