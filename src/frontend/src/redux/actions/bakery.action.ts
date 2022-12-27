import type { AppDispatch, GetState } from '../../app/App.controller'
import { State } from 'utils/interfaces'
import { TezosToolkit } from '@taquito/taquito'
import { showToaster } from '../../app/App.components/Toaster/Toaster.actions'
import { ERROR, INFO, SUCCESS } from '../../app/App.components/Toaster/Toaster.constants'
import { BeaconWallet } from '@taquito/beacon-wallet'
import { checkIfWalletIsConnected, WalletOptions } from './connectWallet.actions'
import { toggleLoader } from './preferences.action'
import { ROCKET_LOADER } from 'utils/consts'

export type BakeryDelegateDataType = {
  balance: number
  delegatedBalance: number
}

export const getBakeryDelegateData = async (bakerAddress: string): Promise<BakeryDelegateDataType> => {
  const response = await fetch(`https://api.tzkt.io/v1/delegates/${bakerAddress}`)
  const result = await response.json()
  return result
}

export const delegation = (bekerAddress: string) => async (dispatch: AppDispatch, getState: GetState) => {
  const state: State = getState()

  if (!state.wallet.ready) {
    dispatch(showToaster(ERROR, 'Please connect your wallet', 'Click Connect in the left menu'))
    return
  }

  if (state.loading) {
    dispatch(showToaster(ERROR, 'Cannot send transaction', 'Previous transaction still pending...'))
    return
  }

  try {
    const rpcNetwork = state.preferences.REACT_APP_RPC_PROVIDER || 'https://mainnet.smartpy.io'
    const wallet = new BeaconWallet(WalletOptions)
    const walletResponse = await checkIfWalletIsConnected(wallet)
    const sourceAddress = state.wallet.accountPkh

    if (walletResponse && sourceAddress) {
      await dispatch(toggleLoader(ROCKET_LOADER))
      console.log({ sourceAddress, bekerAddress })
      
      const Tezos = new TezosToolkit(rpcNetwork)
      await Tezos.contract.registerDelegate({});
      await Tezos.contract.setDelegate({ source: sourceAddress, delegate: bekerAddress });

      await dispatch(toggleLoader())
      await dispatch(showToaster(SUCCESS, 'Successful delegation', 'All good :)'))
    }
  } catch (error: any) {
    console.error(`Failed delegation:`, error)
    dispatch(showToaster(ERROR, 'Error', error.message))
    dispatch(toggleLoader())
  }
}
