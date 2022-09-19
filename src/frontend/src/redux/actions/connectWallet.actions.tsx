import { TempleDAppNetwork, TempleWallet } from '@temple-wallet/dapp'

// import { getUserData } from '../../../pages/Doorman/Doorman.actions'
import { showToaster } from '../../app/App.components/Toaster/Toaster.actions'
import { ERROR } from '../../app/App.components/Toaster/Toaster.constants'
import type { AppDispatch, GetState } from '../../app/App.controller'
import { State } from 'utils/interfaces'
import { getUserData } from 'redux/actions/user.action'
import { SET_WALLET, CONNECT, DISCONNECT } from 'redux/action.types'

// const network = process.env.REACT_APP_API_NETWORK
const network = 'ghostnet'

export const setWallet = (wallet: TempleWallet) => (dispatch: AppDispatch) => {
  dispatch({
    type: SET_WALLET,
    wallet,
  })
}

export const connect =
  ({ forcePermission = false }: { forcePermission?: boolean }) =>
  async (dispatch: AppDispatch, getState: GetState) => {
    const state: State = getState()
    try {
      if (!state.wallet) {
        dispatch(showToaster(ERROR, 'Temple Wallet not available', ''))
        throw new Error('Temple Wallet not available')
      } else {
        await state.wallet.wallet?.connect(("mainnet" || network) as TempleDAppNetwork, {
          forcePermission,
        })
        const tzs = state.wallet.wallet?.toTezos()
        const accountPkh = await tzs?.wallet.pkh()
        dispatch({
          type: CONNECT,
          tezos: tzs,
          ready: Boolean(tzs),
          accountPkh: accountPkh,
        })
        if (accountPkh) dispatch(getUserData(accountPkh))
      }
    } catch (err) {
      if (err instanceof Error) {
        dispatch(showToaster(ERROR, 'Failed to connect TempleWallet', err.message))
        console.error(`Failed to connect TempleWallet: ${err.message}`)
      }
    }
  }

export const disconnect = () => async (dispatch: AppDispatch) => {
  try {
    // clearing wallet data
    dispatch({ type: DISCONNECT })
    // set some wallet data, so user can see connect wallet instead of install wallet btn
    dispatch(setWallet(new TempleWallet(process.env.REACT_APP_NAME || 'MAVRYK')))
  } catch (err) {
    if (err instanceof Error) {
      dispatch(showToaster(ERROR, 'Failed to disconnect TempleWallet', err.message))
      console.error(`Failed to disconnect TempleWallet: ${err.message}`)
    }
  }
}
