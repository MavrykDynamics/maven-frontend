import { ChartType, TokenInfo, UserData, WalletState } from './interfaces';

export const PRECISION_NUMBER_NINE_ZEROES = 1000000000
export const PRECISION_NUMBER_SIX_ZEROES = 1000000

export const walletDefaultState: WalletState = {
  wallet: undefined,
  tezos: undefined,
  accountPkh: undefined,
  ready: false,
}

export const defaultUser: UserData = {
  xtzBalance: 0,
  tzBTCBalance: 0,
  LBTBalance: 0,
  userAddress: ''
}

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

export const defaultChart: ChartType = {
  chartDataCandlestick: [],
  chartDataArea: [],
  chartInterval: 'quotes5mNogaps',
  chartType: 'candlestick',
}

export const INTERVAL_PRICE_CUSHION = {
  quotes5mNogaps: 500,
  quotes15mNogaps: 1000,
  quotes1hNogaps: 2500,
  quotes1dNogaps: 400,
  quotes1w: 3000,
  quotes1mo: 3000,
  quotesTotal: 3000,
}