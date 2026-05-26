import { TezosToolkit } from '@taquito/taquito'
import { CONNECT, SET_WALLET } from '../action.types'

export const connectWalletAction = (tzs: TezosToolkit | undefined, accountPkh?: string) => ({
  type: CONNECT,
  tezos: tzs,
  ready: Boolean(tzs),
  accountPkh: accountPkh,
})

export const setWalletAction = (wallet: unknown) => ({
  type: SET_WALLET,
  wallet,
})
