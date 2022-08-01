import { TezosToolkit } from '@taquito/taquito'
import { TempleWallet } from '@temple-wallet/dapp'

export interface MavrykTheme {  
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
    litepaperLinkColor: string
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
  walletData: {
    wallet: WalletState,
    user: UserData,
  },
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
