import { WalletState } from 'utils/interfaces'
import * as actions from '../action.types'
import { SET_MAVRYK_TOOLKIT } from '../action.types'
import { MavrykToolkit } from '@mavrykdynamics/taquito'

const RpcNetwork = 'https://atlasnet.rpc.mavryk.network'

export const walletDefaultState: WalletState = {
  wallet: undefined,
  mavryk: new MavrykToolkit(RpcNetwork),
  accountPkh: undefined,
  ready: false,
}

const wallet = (state = walletDefaultState, action: any) => {
  switch (action.type) {
    case actions.CONNECT:
      return {
        ...state,
        wallet: action.wallet,
        mavryk: action.mavryk,
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
    case SET_MAVRYK_TOOLKIT:
      return {
        ...state,
        mavryk: action.mavryk,
      }
    default:
      return state
  }
}

export default wallet
