import { MavrykToolkit } from '@mavrykdynamics/taquito'
import { CONNECT, SET_WALLET } from '../action.types'

export const connectWalletAction = (mavrykToolkit: MavrykToolkit | undefined, accountPkh?: string) => ({
  type: CONNECT,
  mavryk: mavrykToolkit,
  ready: Boolean(mavrykToolkit),
  accountPkh: accountPkh,
})

export const setWalletAction = (wallet: unknown) => ({
  type: SET_WALLET,
  wallet,
})
