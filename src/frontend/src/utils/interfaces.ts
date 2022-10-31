import { TezosToolkit } from '@taquito/taquito'
import { ThemeType } from 'redux/actions/preferences.action'
import { LoadingState } from '../redux/reducers/loading'
import { BeaconWallet } from '@taquito/beacon-wallet'

export type IntervalType = 'quotes1dNogaps' | 'quotes1hNogaps' | 'quotes1w' | 'quotes15mNogaps' | 'quotes5mNogaps'
export type ChartTypeType = 'area' | 'candlestick'

export type MavrykTheme = Record<string, string>

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
  policyPopup: boolean
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
