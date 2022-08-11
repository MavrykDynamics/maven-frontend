import { ChartType, TokenInfo, UserData, WalletState } from './interfaces';

export const PRECISION_NUMBER = 1000000000

export const MVK_USD_PRICE = 0.25

export const walletDefaultState: WalletState = {
  wallet: undefined,
  tezos: undefined,
  accountPkh: undefined,
  ready: false,
}

export const defaultUser: UserData = {
  myAddress: '',
  myDelegationHistory: [],
  myMvkTokenBalance: 0,
  mySMvkTokenBalance: 0,
  participationFeesPerShare: 0,
  satelliteMvkIsDelegatedTo: '',
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
  }
}

export const defaultChart: ChartType = {
  chartDataCandlestick: [],
  chartDataArea: [],
  chartInterval: 'quotes5mNogaps',
  chartType: 'candlestick',
}

export const NUMBER_FORMATTER = new Intl.NumberFormat('en')

export const ENVIRONMENT = {
  // gqlLink: 'https://dex.dipdup.net/v1/graphql'
  gqlLink: 'https://api.mavryk.finance/v1/graphql',
  rpcLink: 'https://ghostnet.tezos.marigold.dev/',
  // rpcLink: 'https://mainnet.tezos.marigold.dev/',
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