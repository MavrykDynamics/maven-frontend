import { TezosToolkit } from "@taquito/taquito";
import { TempleWallet } from "@temple-wallet/dapp";

export const TOGGLE_DARKTHEME = "TOGGLE_DARKTHEME";

export const toggleDarkTheme = () => ({
  type: TOGGLE_DARKTHEME,
});

export const SCROLL = "SCROLL";

export const scroll = (scrollPosition: number) => ({
  type: SCROLL,
  scrollPosition
});

export const CONNECT = 'CONNECT'
export const connectWalletAction = (tzs: TezosToolkit | undefined, accountPkh?: string) => ({
  type: CONNECT,
  tezos: tzs,
  ready: Boolean(tzs),
  accountPkh: accountPkh,
})

export const SET_WALLET = 'SET_WALLET'
export const setWalletAction = (wallet: TempleWallet) => ({
  type: SET_WALLET,
  wallet,
})