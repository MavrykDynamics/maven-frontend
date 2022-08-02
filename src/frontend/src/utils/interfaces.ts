import { TezosToolkit } from '@taquito/taquito'
import { TempleWallet } from '@temple-wallet/dapp'

export interface MavrykTheme {  
  whatMakesBackground: string,
  calculatorBackground: string,
  featuresBackground: string,
  teamCityDecor: string,
  teamDecor1: string,
  teamDecor2: string,
  teamDecor3: string,
  teamDecor4: string,
  subscribeBachground: string,
  starsBachground: string,
  satellitesGradient: string,
  skyGradientTransparent:
  string,
  skyGradient:
  string,
  backgroundColor: string,
  containerColor: string,
  borderColor: string,
  textColor: string,
  subTextColor: string,
  backgroundTextColor: string,
  placeholderColor: string,
  primaryColor: string,
  secondaryColor: string,
  upColor: string,
  downColor: string,
  selectedColor: string,
  litepaperLinkColor: string,
  navColor:string,
  inputBorderColor: string,
  headerTeam: string,
  headerColor: string,
  headerSectionsColor: string,
  headerDarkColor: string,
  darkestBackroundColor: string,
  darkBackroundColor: string,
  labelColor: string,
  darkPurple: string,
  headingColor: string,
  btnBackroundColor: string,
  btnColor: string,
  linkedinLinkColor: string,
  socialBackroundColor: string,
  socialColor: string,
  inputColor: string,
  btnBackroundNewsColor: string,
  btnNewsColor: string,
  inputNewsBg: string,
  inputNewsColor: string,
  roadmapValueColor: string,
  arrowStrokeColor: string,
  clusterBg: string,
  socialsColor: string,
}

export interface WalletState {
  wallet?: TempleWallet
  tezos?: TezosToolkit
  accountPkh?: string
  ready: boolean
  error?: any
  connect?: any //() => void
  toTezos?: () => number | any
}

export interface UserData {
  myAddress: string
  myMvkTokenBalance: number
  mySMvkTokenBalance: number
  participationFeesPerShare: number
  satelliteMvkIsDelegatedTo: string
  myDelegationHistory?: any[]
}

export interface State {
  wallet: WalletState
  user: UserData
  preferences: {
    darkThemeEnabled: boolean, 
    scrollPosition: number
  }
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
