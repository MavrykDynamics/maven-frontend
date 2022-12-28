import { TezosOperationType } from '@airgap/beacon-sdk'
import type { AppDispatch, GetState } from '../../app/App.controller'
import { State } from 'utils/interfaces'
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

export const delegation = (bakerAddress: string) => async (dispatch: AppDispatch, getState: GetState) => {
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
    const wallet = new BeaconWallet(WalletOptions)
    const walletResponse = await checkIfWalletIsConnected(wallet)

    if (walletResponse) {
      await dispatch(toggleLoader(ROCKET_LOADER))
      await wallet.client.requestOperation({
        operationDetails: [
          {
            kind: TezosOperationType.DELEGATION,
            delegate: bakerAddress,
          },
        ],
      })
    
      await dispatch(toggleLoader())
      await dispatch(showToaster(SUCCESS, 'Successful delegation', 'All good :)'))
    }
  } catch (error: any) {
    console.error(`Failed delegation:`, error)
    dispatch(showToaster(ERROR, 'Error', error.message))
    dispatch(toggleLoader())
  }
}
