import {BeaconWallet} from '@taquito/beacon-wallet'
import {Network, NetworkType} from '@airgap/beacon-sdk'
import {showToaster} from '../../app/App.components/Toaster/Toaster.actions'
import {ERROR, SUCCESS} from '../../app/App.components/Toaster/Toaster.constants'
import type {AppDispatch, GetState} from '../../app/App.controller'
import {State} from 'utils/interfaces'
import {CONNECT, DISCONNECT, SET_WALLET} from 'redux/action.types'
import {getUserData} from './user.action'

// const network = process.env.REACT_APP_API_NETWORK
export const network: Network = { type: NetworkType.MAINNET }

export const setWallet = (wallet?: BeaconWallet) => (dispatch: AppDispatch) => {
  console.log('Here in Set Wallet')
  try {
    const walletOptions = {
      name: process.env.REACT_APP_NAME || 'MAVRYK',
      preferredNetwork: (process.env.REACT_APP_NETWORK || 'mainnet') as any,
      eventHandlers: {
        PERMISSION_REQUEST_SUCCESS: {
          handler: async (data: any) => {
            dispatch(showToaster(SUCCESS, 'Permission successful', ''))
            console.log('permission data:', data)
          },
        },
      },
    }
    const wallet = new BeaconWallet(walletOptions)
    dispatch({
      type: SET_WALLET,
      wallet,
    })
  } catch (err: any) {
    dispatch(showToaster(ERROR, 'Failed to initiate Wallet', err.message))
    console.error(`Failed to initiate Wallet: ${err.message}`)
  }

  dispatch({
    type: SET_WALLET,
    wallet,
  })
}

export const connect = () => async (dispatch: AppDispatch, getState: GetState) => {
  console.log('Here in connectWallet')
  const state: State = getState()

  // try {
  //   if (!state.wallet) {
  //     dispatch(showToaster(ERROR, 'Temple Wallet not available', ''))
  //     throw new Error('Temple Wallet not available')
  //   } else {
  //     await state.wallet.wallet?.connect(('mainnet' || network) as TempleDAppNetwork, {
  //       forcePermission,
  //     })
  //     const tzs = await state.wallet.wallet?.toTezos()
  //     const accountPkh = await tzs?.wallet.pkh()
  //     dispatch({
  //       type: CONNECT,
  //       tezos: tzs,
  //       ready: Boolean(tzs),
  //       accountPkh: accountPkh,
  //     })
  //     if (accountPkh) dispatch(getUserData(accountPkh))
  //   }
  // } catch (err) {
  //   if (err instanceof Error) {
  //     dispatch(showToaster(ERROR, 'Failed to connect TempleWallet', err.message))
  //     console.error(`Failed to connect TempleWallet: ${err.message}`)
  //   }
  // }

  try {
    const walletOptions = {
      name: process.env.REACT_APP_NAME || 'MAVRYK',
      preferredNetwork: network.type,
      eventHandlers: {
        PERMISSION_REQUEST_SUCCESS: {
          handler: async (data: any) => {
            dispatch(showToaster(SUCCESS, 'Permission successful', ''))
            console.log('permission data:', data)
          },
        },
      },
    }

    const rpcNetwork = state.preferences.REACT_APP_RPC_PROVIDER || 'https://mainnet.smartpy.io'
    const wallet = new BeaconWallet(walletOptions)
    //const walletResponse = await checkIfWalletIsConnected(wallet)
    let account = await wallet.client.getActiveAccount()
    if (!account) {
      await wallet.client.requestPermissions({
        network,
      })
      account = await wallet.client.getActiveAccount()
    }
    dispatch({
      type: CONNECT,
      wallet,
      tezos: undefined,
      ready: Boolean(wallet),
      accountPkh: account?.address,
    })
    if (account?.address) dispatch(getUserData(account?.address))
    //
    // if (walletResponse.success) {
    //   const Tezos = new TezosToolkit(rpcNetwork)
    //   Tezos.setRpcProvider(rpcNetwork)
    //   Tezos.setWalletProvider(wallet)
    //   const accountPkh = await wallet.getPKH()
    //
    // }
    //
    // const scopes: PermissionScope[] = [PermissionScope.OPERATION_REQUEST, PermissionScope.SIGN]
    // try {
    //   const permissions = await wallet.client.requestPermissions({scopes})
    //   console.log('Got permissions:', permissions.address)
    // } catch (error) {
    //   console.log('Got error:', error)
    // }
    //
    // const tzs = new TezosToolkit(rpcNetwork)
    // console.log(tzs, rpcNetwork)
    // console.log(wallet)
    // tzs.setProvider({wallet})
    // // tzs.setWalletProvider(wallet)
  } catch (err: any) {
    dispatch(showToaster(ERROR, 'Failed to connect Wallet', err.message))
    console.error(`Failed to connect Wallet: ${err.message}`)
  }
}

export const disconnect = () => async (dispatch: AppDispatch, getState: GetState) => {
  try {
    const state: State = getState()
    // clearing wallet data
    await state.wallet.wallet?.clearActiveAccount()
    dispatch({ type: DISCONNECT })
    // set some wallet data, so user can see connect wallet instead of install wallet btn
    dispatch(setWallet())
  } catch (err) {
    if (err instanceof Error) {
      dispatch(showToaster(ERROR, 'Failed to disconnect TempleWallet', err.message))
      console.error(`Failed to disconnect TempleWallet: ${err.message}`)
    }
  }
}

export const checkIfWalletIsConnected = async (wallet: any) => {
  try {
    console.log('Logging wallet in handleCheckActiveAccount', wallet)
    const activeAccount = await wallet.client.getActiveAccount()
    if (!activeAccount) {
      await wallet.client.requestPermissions({
        network,
      })
    }
    return {
      success: true,
    }
  } catch (e) {
    // The user is not connected. A button should be displayed where the user can connect to his wallet.
    return { success: false, e }
  }
}
