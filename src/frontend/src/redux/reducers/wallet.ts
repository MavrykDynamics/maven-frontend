import { WalletState } from 'utils/interfaces'
import * as actions from '../action.types'

export const walletDefaultState: WalletState = {
  wallet: undefined,
  tezos: undefined,
  accountPkh: undefined,
  ready: false,
}

const wallet = (state = walletDefaultState, action: any) => {
  switch (action.type) {
    case actions.CONNECT:
      return {
        ...state,
        tezos: action.tezos,
        ready: action.ready,
        accountPkh: action.accountPkh,
      }
    case actions.SET_WALLET:
      return { ...state, wallet: action.wallet }
    case actions.DISCONNECT:
      return {
        ...state,
        ...walletDefaultState,
      }
    default:
      return state
  }
}

export default wallet
