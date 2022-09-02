import { TokenInfo } from 'utils/interfaces'
import * as actions from '../action.types'

export const defaultTokens: TokenInfo = {
  lbData: {
    lqt_address: "",
    address: "",
    lqt_total: 0,
    token_address: "",
    token_decimals: 0,
    token_pool: 0,
    xtz_decimals: 0,
    xtz_pool: 0
  },
  coinPrices: {
    bitcoin: {usd: 0, eur: 0},
    tezos:  {usd: 0, eur: 0},
    tzbtc: {usd: 0, eur: 0},
  },
  stats: {
    tvlUSD: 0,
    tradeVolume: 0,
    avgTradingSize: 0,
    users: 0,
    interactions: 0
  }
}

const tokens = (state = defaultTokens, action: any) => {
  switch (action.type) {
    case actions.GET_TOKENS_DATA:
      return {
        ...state,
        lbData: action.tokensData,
      }
    case actions.GET_TOKENS_PRICES:
      return {
        ...state,
        coinPrices: action.tokensPrices,
      }
    case actions.GET_GENERAL_STATS:
      return {
        ...state,
        stats: {
          ...state.stats,
          ...action.generalStats,
        },
      }
    default:
      return state
  }
}

export default tokens