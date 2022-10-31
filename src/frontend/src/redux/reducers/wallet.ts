import { WalletState } from 'utils/interfaces'
import * as actions from '../action.types'
import { SET_TEZOS_TOOLKIT } from '../action.types'
import { TezosToolkit } from '@taquito/taquito'

const RpcNetwork = 'https://mainnet.smartpy.io'

export const walletDefaultState: WalletState = {
  wallet: undefined,
  tezos: new TezosToolkit(RpcNetwork),
  accountPkh: undefined,
  ready: false,
}

const wallet = (state = walletDefaultState, action: any) => {
  switch (action.type) {
    case actions.CONNECT:
      return {
        ...state,
        wallet: action.wallet,
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
    case SET_TEZOS_TOOLKIT:
      return {
        ...state,
        tezos: action.tezos,
      }
    default:
      return state
  }
}

export default wallet
