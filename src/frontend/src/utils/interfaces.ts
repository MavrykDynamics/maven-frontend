import { TezosToolkit } from '@taquito/taquito'
import { ThemeType } from 'redux/actions/preferences.action'
import { LoadingState } from '../redux/reducers/loading'
import {
  ADD_LIQUIDITY,
  ADD_LIQUIDITY_ONLY_XTZ,
  REMOVE_LIQUIDITY,
  SWAP_TZBTC_TO_XTZ,
  SWAP_XTZ_TO_TZBTC,
} from '../redux/reducers/liquidityBaking'
import { BeaconWallet } from '@taquito/beacon-wallet'

export type IntervalType = 'quotes1dNogaps' | 'quotes1hNogaps' | 'quotes1w' | 'quotes15mNogaps' | 'quotes5mNogaps'
export type ChartTypeType = 'area' | 'candlestick'

export type MavrykTheme = Record<string, string>
// {
//   whatMakesBackground: string
//   calculatorBackground: string
//   featuresBackground: string
//   teamCityDecor: string
//   teamDecor1: string
//   teamDecor2: string
//   teamDecor3: string
//   teamDecor4: string
//   subscribeBachground: string
//   starsBachground: string
//   satellitesGradient: string
//   skyGradientTransparent: string
//   skyGradient: string
//   backgroundColor: string
//   containerColor: string
//   textColor: string
//   subTextColor: string
//   placeholderColor: string
//   primaryColor: string
//   upColor: string
//   downColor: string
//   litepaperLinkColor: string
//   navColor: string
//   inputBorderColor: string
//   headerTeam: string
//   headerColor: string
//   headerSectionsColor: string
//   headerDarkColor: string
//   darkestBackroundColor: string
//   darkBackroundColor: string
//   labelColor: string
//   headingColor: string
//   btnBackroundColor: string
//   btnColor: string
//   linkedinLinkColor: string
//   socialBackroundColor: string
//   socialColor: string
//   inputColor: string
//   btnBackroundNewsColor: string
//   btnNewsColor: string
//   inputNewsBg: string
//   inputNewsColor: string
//   roadmapValueColor: string
//   arrowStrokeColor: string
//   socialsColor: string
//   lbBorder: string
//   toggleButtonBg: string
//   toggleButtonColor: string
//   toggleButtonColorSelected: string
//   toggleButtonBgSelected: string
//   inputTextColor: string
// }

export interface WalletState {
  wallet?: BeaconWallet
  tezos: TezosToolkit
  accountPkh?: string
  ready: boolean
  error?: any
  connect?: any
  toTezos?: () => number | any
}

export interface UserData {
  xtzBalance: number
  tzBTCBalance: number
  LBTBalance: number
  mvkBalance: number
  smvkBalance: number
  userAddress: string
  realizedPl: number
  unrealizedPL: number
  estimatedPoolTzBTCOwned: number
  estimatedPoolXtzOwned: number
}

export interface TokenInfo {
  lbData: {
    address: string
    lqt_address: string
    lqt_total: number
    token_address: string
    token_decimals: number
    token_pool: number
    xtz_decimals: number
    xtz_pool: number
  }
  coinPrices: Record<string, Record<string, number>>
  stats: {
    tvlUSD: number
    tradeVolume: number
    avgTradingSize: number
    users: number
    interactions: number
  }
}

export interface ChartPoint {
  bucket: string
  close: string
  high: string
  low: string
  open: string
}

export interface ChartType {
  chartDataCandlestick: Array<{
    x: string
    y: [number, number, number, number]
  }>
  chartDataArea: Array<{
    x: string
    y: number
  }>
  chartInterval: IntervalType
  chartType: ChartTypeType
}

export interface ToasterState {
  showing: boolean
  status?: string
  title?: string
  message?: string
}

export type RPCNodeType = {
  url: string
  title: string
  nodeLogoUrl?: string
  isUser?: boolean
}

export type PreferencesType = {
  themeSelected: ThemeType
  scrollPosition: number
  changeNodePopupOpen: boolean
  RPC_NODES: Array<RPCNodeType>
  REACT_APP_RPC_PROVIDER: string
}

export interface State {
  wallet: WalletState
  user: UserData
  preferences: PreferencesType
  tokens: TokenInfo
  chart: ChartType
  toaster: ToasterState
  loading: LoadingState
}

export interface MVKStatsInterface {
  vestingPeriod: number
  maxPerWallet: number
  whitelistMaxAmount: number
  totalAmountAtPrice: number
  amountAvaliable: number
}

export interface TokensNumbersInfo {
  totalWorthForSale: number
  avaliableTokens: number
  purchasedTokens: number
  totalRaised: number
}

export interface PurschasedStatsTable {
  symbol: string
  amount: number
  usdPrice: number
}

export interface LiquidityBakingAction {
  type: SWAP_XTZ_TO_TZBTC | SWAP_TZBTC_TO_XTZ | ADD_LIQUIDITY | REMOVE_LIQUIDITY | ADD_LIQUIDITY_ONLY_XTZ | undefined
  amount: number
  error: any | undefined
}
