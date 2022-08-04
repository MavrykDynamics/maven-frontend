import { TezosToolkit } from "@taquito/taquito"
import { TempleWallet } from "@temple-wallet/dapp"
import { CONNECT, SET_WALLET } from "redux/action.types"

export const connectWalletAction = (tzs: TezosToolkit | undefined, accountPkh?: string) => ({
  type: CONNECT,
  tezos: tzs,
  ready: Boolean(tzs),
  accountPkh: accountPkh,
})

export const setWalletAction = (wallet: TempleWallet) => ({
  type: SET_WALLET,
  wallet,
})