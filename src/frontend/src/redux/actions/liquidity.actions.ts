import { State } from '../../utils/interfaces'
import { showToaster } from '../../app/App.components/Toaster/Toaster.actions'
import { ERROR, INFO, SUCCESS } from '../../app/App.components/Toaster/Toaster.constants'
import { getUserData } from './user.action'
import { OpKind } from '@taquito/taquito'
import { BeaconWallet } from '@taquito/beacon-wallet'
import { checkIfWalletIsConnected, WalletOptions } from './connectWallet.actions'
import { SET_TEZOS_TOOLKIT } from '../action.types'

const TZBTC_CONTRACT = 'KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn',
  LB_DEX_CONTRACT = 'KT1TxqZ8QtKvLu3V3JH7Gx58n7Co8pgtpQU5',
  SIR_CONTRACT = 'KT1AafHA1C1vk959wvHWBispY9Y2f3fxBUUo'

export const ADD_LIQUIDITY_REQUEST = 'ADD_LIQUIDITY_REQUEST'
export const ADD_LIQUIDITY_RESULT = 'ADD_LIQUIDITY_RESULT'
export const ADD_LIQUIDITY_ERROR = 'ADD_LIQUIDITY_ERROR'
export const addLiquidity =
  (maxTokensSold: number, minLqtMinted: number, xtzToAdd: number) => async (dispatch: any, getState: any) => {
    const state: State = getState()

    if (!state.wallet.ready) {
      dispatch(showToaster(ERROR, 'Please connect your wallet', 'Click Connect in the left menu'))
      return
    }

    if (!(maxTokensSold > 0)) {
      dispatch(showToaster(ERROR, 'Incorrect amount', 'Please enter an amount superior to zero'))
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

      if (walletResponse.success) {
        const tzs = state.wallet.tezos
        tzs.setRpcProvider(rpcNetwork)
        tzs.setWalletProvider(wallet)

        dispatch({ type: SET_TEZOS_TOOLKIT, tezos: tzs })

        const lqdContract = await tzs.wallet.at(LB_DEX_CONTRACT)
        const tzBTCContract = await tzs.wallet.at(TZBTC_CONTRACT)

        const tokensToSell = Math.round(maxTokensSold)
        const deadline = new Date(Date.now() + 60 * 60 * 1000).toISOString()
        const batchOp = await tzs.wallet
          .batch([
            {
              kind: OpKind.TRANSACTION,
              ...tzBTCContract.methods.approve(LB_DEX_CONTRACT, 0).toTransferParams(),
            },
            {
              kind: OpKind.TRANSACTION,
              ...tzBTCContract.methods.approve(LB_DEX_CONTRACT, tokensToSell).toTransferParams(),
            },
            {
              kind: OpKind.TRANSACTION,
              ...lqdContract.methods
                .addLiquidity(state.user.userAddress, minLqtMinted - 3, tokensToSell, deadline)
                .toTransferParams(),
              amount: xtzToAdd,
              mutez: true,
            },
            {
              kind: OpKind.TRANSACTION,
              ...tzBTCContract.methods.approve(LB_DEX_CONTRACT, 0).toTransferParams(),
            },
          ])
          .send()

        dispatch(showToaster(INFO, 'Adding Liquidity', 'Please wait 30s...'))
        await batchOp?.confirmation()
        dispatch({
          type: ADD_LIQUIDITY_REQUEST,
          amount: xtzToAdd,
        })

        dispatch(showToaster(SUCCESS, 'Add Liquidity completed', 'All good :)'))

        dispatch({
          type: ADD_LIQUIDITY_RESULT,
          amount: minLqtMinted,
        })
      }
      if (state.wallet.accountPkh) dispatch(getUserData(state.wallet.accountPkh))
    } catch (error: any) {
      console.error(error)
      dispatch(showToaster(ERROR, 'Error', error.message))
      dispatch({
        type: ADD_LIQUIDITY_ERROR,
        error,
      })
    }
  }

export const REMOVE_LIQUIDITY_REQUEST = 'REMOVE_LIQUIDITY_REQUEST'
export const REMOVE_LIQUIDITY_RESULT = 'REMOVE_LIQUIDITY_RESULT'
export const REMOVE_LIQUIDITY_ERROR = 'REMOVE_LIQUIDITY_ERROR'
export const removeLiquidity =
  (lqtToSell: number, xtzToReceive: number, tzBtcToReceive: number) => async (dispatch: any, getState: any) => {
    const state: State = getState()

    if (!state.wallet.ready) {
      dispatch(showToaster(ERROR, 'Please connect your wallet', 'Click Connect in the left menu'))
      return
    }

    if (!(lqtToSell > 0)) {
      dispatch(showToaster(ERROR, 'Incorrect amount', 'Please enter an amount superior to zero'))
      return
    }

    if (state.loading) {
      dispatch(showToaster(ERROR, 'Cannot send transaction', 'Previous transaction still pending...'))
      return
    }

    try {
      const lqdContract = await state.wallet.tezos?.wallet.at(LB_DEX_CONTRACT)
      const tzbtcContact = await state.wallet.tezos?.wallet.at(TZBTC_CONTRACT)
      if (lqdContract && tzbtcContact) {
        const deadline = new Date(Date.now() + 60 * 60 * 1000).toISOString()
        dispatch(showToaster(INFO, 'Removing Liquidity', 'Please wait 30s...'))
        const op = await lqdContract.methods
          .removeLiquidity(state.wallet.accountPkh, lqtToSell, xtzToReceive, tzBtcToReceive, deadline)
          .send()
        await op.confirmation()
        dispatch({
          type: REMOVE_LIQUIDITY_REQUEST,
          amount: lqtToSell,
        })

        dispatch(showToaster(SUCCESS, 'Remove Liquidity completed', 'All good :)'))

        dispatch({
          type: REMOVE_LIQUIDITY_RESULT,
          amount: xtzToReceive,
        })
      }
      if (state.wallet.accountPkh) dispatch(getUserData(state.wallet.accountPkh))
    } catch (error: any) {
      console.error(error)
      dispatch(showToaster(ERROR, 'Error', error.message))
      dispatch({
        type: REMOVE_LIQUIDITY_ERROR,
        error,
      })
    }
  }
