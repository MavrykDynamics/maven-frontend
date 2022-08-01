import { State, UserData, WalletState } from 'utils/interfaces'

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

export const BE_MAVRYK_BUY_TOKENS_POPUP = 'beMavrykBuyTokens'
export const BUY_MVK_VIA_CURRENCY_POPUP = 'buyMVKViaCurrency'
export const BUY_MVK_VIA_XTZ_POPUP = 'buyMVKViaXTZ'
export const START_VERIFICATION_POPUP = 'startVerification'
export const WERT_IO_POPUP_WRAPPER = 'wertIoPopup'

export const NUMBER_FORMATTER = new Intl.NumberFormat('en')

export const VERIFICATION_GRID_ITEMS = [
  {
    icon: 'creditCardIcon',
    text: 'Your bank card details',
  },
  {
    icon: 'selfieIcon',
    text: 'Your selfie with an ID',
  },
  {
    icon: 'photoIdIcon',
    text: 'A photo of your ID Document',
  },
  {
    icon: 'documentIcon',
    text: 'Address Document',
  },
]
