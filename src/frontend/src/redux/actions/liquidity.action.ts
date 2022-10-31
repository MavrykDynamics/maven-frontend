import { ROCKET_LOADER } from 'utils/consts'
import { State } from '../../utils/interfaces'
import { showToaster } from '../../app/App.components/Toaster/Toaster.actions'
import { ERROR, INFO, SUCCESS } from '../../app/App.components/Toaster/Toaster.constants'
import { getUserData } from './user.action'
import { OpKind } from '@taquito/taquito'
import { BeaconWallet } from '@taquito/beacon-wallet'
import { checkIfWalletIsConnected, WalletOptions } from './connectWallet.actions'
import { SET_TEZOS_TOOLKIT } from '../action.types'
import { toggleLoader } from './preferences.action'
import { removeDecimal } from 'utils/utils'

const TZBTC_CONTRACT = 'KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn',
  LB_DEX_CONTRACT = 'KT1TxqZ8QtKvLu3V3JH7Gx58n7Co8pgtpQU5'

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
        await tzs.setRpcProvider(rpcNetwork)
        await tzs.setWalletProvider(wallet)

        await dispatch({ type: SET_TEZOS_TOOLKIT, tezos: tzs })

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
              ...tzBTCContract.methods.approve(LB_DEX_CONTRACT, removeDecimal(tokensToSell)).toTransferParams(),
            },
            {
              kind: OpKind.TRANSACTION,
              ...lqdContract.methods
                .addLiquidity(
                  state.user.userAddress,
                  removeDecimal(minLqtMinted - 3),
                  removeDecimal(tokensToSell),
                  deadline,
                )
                .toTransferParams(),
              amount: removeDecimal(xtzToAdd),
              mutez: true,
            },
            {
              kind: OpKind.TRANSACTION,
              ...tzBTCContract.methods.approve(LB_DEX_CONTRACT, 0).toTransferParams(),
            },
          ])
          .send()

        await dispatch(toggleLoader(ROCKET_LOADER))
        await dispatch(showToaster(INFO, 'Adding Liquidity', 'Please wait 30s...'))

        await batchOp?.confirmation()

        await dispatch(toggleLoader())
        await dispatch(showToaster(SUCCESS, 'Add Liquidity completed', 'All good :)'))
      }
      if (state.wallet.accountPkh) await dispatch(getUserData(state.wallet.accountPkh))
    } catch (error: any) {
      console.error(error)
      dispatch(showToaster(ERROR, 'Error', error.message))
      dispatch(toggleLoader())
    }
  }

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
      const rpcNetwork = state.preferences.REACT_APP_RPC_PROVIDER || 'https://mainnet.smartpy.io'
      const wallet = new BeaconWallet(WalletOptions)
      const walletResponse = await checkIfWalletIsConnected(wallet)

      if (walletResponse.success) {
        const tzs = state.wallet.tezos
        await tzs.setRpcProvider(rpcNetwork)
        await tzs.setWalletProvider(wallet)

        await dispatch({ type: SET_TEZOS_TOOLKIT, tezos: tzs })

        const lqdContract = await tzs.wallet.at(LB_DEX_CONTRACT)
        const deadline = new Date(Date.now() + 60 * 60 * 1000).toISOString()
        dispatch(showToaster(INFO, 'Removing Liquidity', 'Please wait 30s...'))
        const op = await lqdContract.methods
          .removeLiquidity(
            state.wallet.accountPkh,
            removeDecimal(lqtToSell),
            removeDecimal(xtzToReceive),
            removeDecimal(tzBtcToReceive),
            deadline,
          )
          .send()

        await dispatch(toggleLoader(ROCKET_LOADER))

        await op.confirmation()

        await dispatch(toggleLoader())
        await dispatch(showToaster(SUCCESS, 'Remove Liquidity completed', 'All good :)'))
      }
      if (state.wallet.accountPkh) await dispatch(getUserData(state.wallet.accountPkh))
    } catch (error: any) {
      console.error(error)
      dispatch(showToaster(ERROR, 'Error', error.message))
      dispatch(toggleLoader())
    }
  }

export const addLiquidityOnlyXTZ =
  (minTokensToBuy: number, xtzToSwap: number, maxTokensSold: number, minLqtMinted: number, xtzToAdd: number) =>
  async (dispatch: any, getState: any) => {
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
        await tzs.setRpcProvider(rpcNetwork)
        await tzs.setWalletProvider(wallet)

        await dispatch({ type: SET_TEZOS_TOOLKIT, tezos: tzs })

        const lqdContract = await tzs.wallet.at(LB_DEX_CONTRACT)
        const tzBTCContract = await tzs.wallet.at(TZBTC_CONTRACT)

        const tokensToSell = Math.round(maxTokensSold)
        const deadline = new Date(Date.now() + 60 * 60 * 1000).toISOString()
        const batchOp = await tzs.wallet
          .batch([
            {
              kind: OpKind.TRANSACTION,
              ...lqdContract.methods
                .xtzToToken(state.user.userAddress, removeDecimal(minTokensToBuy).toString(), deadline)
                .toTransferParams(),
              amount: removeDecimal(xtzToSwap),
              mutez: true,
            },
            {
              kind: OpKind.TRANSACTION,
              ...tzBTCContract.methods.approve(LB_DEX_CONTRACT, 0).toTransferParams(),
            },
            {
              kind: OpKind.TRANSACTION,
              ...tzBTCContract.methods.approve(LB_DEX_CONTRACT, removeDecimal(tokensToSell)).toTransferParams(),
            },
            {
              kind: OpKind.TRANSACTION,
              ...lqdContract.methods
                .addLiquidity(
                  state.user.userAddress,
                  removeDecimal(minLqtMinted - 3),
                  removeDecimal(tokensToSell),
                  deadline,
                )
                .toTransferParams(),
              amount: removeDecimal(xtzToAdd),
              mutez: true,
            },
            {
              kind: OpKind.TRANSACTION,
              ...tzBTCContract.methods.approve(LB_DEX_CONTRACT, 0).toTransferParams(),
            },
          ])
          .send()

        await dispatch(toggleLoader(ROCKET_LOADER))
        await dispatch(showToaster(INFO, 'Adding Liquidity', 'Please wait 30s...'))

        await batchOp?.confirmation()

        await dispatch(toggleLoader())
        await dispatch(showToaster(SUCCESS, 'Add Liquidity completed', 'All good :)'))
      }
      if (state.wallet.accountPkh) await dispatch(getUserData(state.wallet.accountPkh))
    } catch (error: any) {
      console.error(error)
      dispatch(showToaster(ERROR, 'Error', error.message))
      dispatch(toggleLoader())
    }
  }
