import { fetchFromIndexer } from 'gql/gql.helpers'
import { LB_DATA_QUERY, LB_DATA_QUERY_NAME } from 'gql/queries/lbData.query'
import { GET_TOKENS_DATA, SET_TEZOS_TOOLKIT } from 'redux/action.types'
import { State } from '../../utils/interfaces'
import { showToaster } from 'app/App.components/Toaster/Toaster.actions'
import { ERROR, INFO, SUCCESS } from 'app/App.components/Toaster/Toaster.constants'
import { isWholeNumber } from 'utils/utils'
import { getUserData } from './user.action'
import { BeaconWallet } from '@taquito/beacon-wallet'
import { checkIfWalletIsConnected, WalletOptions } from './connectWallet.actions'

export const TZBTC_CONTRACT = 'KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn',
  LB_DEX_CONTRACT = 'KT1TxqZ8QtKvLu3V3JH7Gx58n7Co8pgtpQU5',
  SIR_CONTRACT = 'KT1AafHA1C1vk959wvHWBispY9Y2f3fxBUUo'

export const getTokensData = () => async (dispatch: any, getState: any) => {
  try {
    const state = getState()
    const tokensInfoFromIndexer = await fetchFromIndexer(LB_DATA_QUERY, LB_DATA_QUERY_NAME, {})

    const parsedTokensData = tokensInfoFromIndexer.liquidity_baking[0]
    parsedTokensData['token_pool'] = parsedTokensData['token_pool'] / 10 ** parsedTokensData['token_decimals']
    parsedTokensData['xtz_pool'] = parsedTokensData['xtz_pool'] / 10 ** parsedTokensData['xtz_decimals']

    //TODO: Remove later, currently to get the right address for tzBTC token on the Ghostnet
    // parsedTokensData['token_address'] = 'KT1VqarPDicMFn1ejmQqqshUkUXTCTXwmkCN'
    //
    // const Tezos = new TezosToolkit('https://mainnet.api.tez.ie/')
    // const lbDexContractStorage = await Tezos.contract
    //   .at('KT1TxqZ8QtKvLu3V3JH7Gx58n7Co8pgtpQU5')
    //   .then((c) => {
    //     return (c as any).storage()
    //   })
    //   .then((data) => {
    //     return {
    //       lqtAddress: data.lqtAddress,
    //       tokenAddress: data.tokenAddress,
    //       lqtTotal: parseFloat(data.lqtTotal),
    //       tokenPool: parseFloat(data.tokenPool),
    //       xtzPool: parseFloat(data.xtzPool),
    //     }
    //   })
    //   .catch((error) => console.log(`Error: ${error}`))

    // @ts-ignore
    // const { tokenPool, xtzPool } = lbDexContractStorage
    // parsedTokensData['token_pool'] = tokenPool / 10 ** parsedTokensData['token_decimals']
    // parsedTokensData['xtz_pool'] = xtzPool / 10 ** parsedTokensData['xtz_decimals']

    dispatch({
      type: GET_TOKENS_DATA,
      tokensData: parsedTokensData,
    })
  } catch (error: any) {
    console.error(error)
  }
}

export const SWAP_TOKEN_TO_XTZ_REQUEST = 'SWAP_TOKEN_TO_XTZ_REQUEST'
export const SWAP_TOKEN_TO_XTZ_RESULT = 'SWAP_TOKEN_TO_XTZ_RESULT'
export const SWAP_TOKEN_TO_XTZ_ERROR = 'SWAP_TOKEN_TO_XTZ_ERROR'
export const swapTokenToXtz = (tokensSold: number, minXTZBought: number) => async (dispatch: any, getState: any) => {
  const state: State = getState()

  if (!state.wallet.ready) {
    dispatch(showToaster(ERROR, 'Please connect your wallet', 'Click Connect in the left menu'))
    return
  }

  if (!(tokensSold > 0)) {
    dispatch(showToaster(ERROR, 'Incorrect amount', 'Please enter an amount superior to zero'))
    return
  }

  if (state.loading) {
    dispatch(showToaster(ERROR, 'Cannot send transaction', 'Previous transaction still pending...'))
    return
  }

  if (!isWholeNumber(tokensSold)) {
    dispatch(showToaster(ERROR, 'Invalid received amount', 'Please refresh and try again'))
    return
  }
  try {
    dispatch({
      type: SWAP_TOKEN_TO_XTZ_REQUEST,
      amount: tokensSold,
    })

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

      const deadline = new Date(Date.now() + 60000).toISOString()
      let batch = await state.wallet.tezos?.wallet
        .batch()
        .withContractCall(tzBTCContract.methods.approve(LB_DEX_CONTRACT, 0))
        .withContractCall(tzBTCContract.methods.approve(LB_DEX_CONTRACT, tokensSold))
        .withContractCall(lqdContract.methods.tokenToXtz(state.user.userAddress, tokensSold, minXTZBought, deadline))
      const batchOp = await batch?.send()
      dispatch(showToaster(INFO, 'Swapping tzBTC -> XTZ', 'Please wait 30s...'))
      await batchOp?.confirmation()
      dispatch(showToaster(SUCCESS, 'Swap completed', 'All good :)'))
      dispatch({
        type: SWAP_TOKEN_TO_XTZ_RESULT,
        amount: minXTZBought,
      })
    }

    if (state.wallet.accountPkh) dispatch(getUserData(state.wallet.accountPkh))
  } catch (error: any) {
    console.error(error)
    dispatch(showToaster(ERROR, 'Error', error.message))
    dispatch({
      type: SWAP_TOKEN_TO_XTZ_ERROR,
      error,
    })
  }
}

export const SWAP_XTZ_TO_TOKEN_REQUEST = 'SWAP_XTZ_TO_TOKEN_REQUEST'
export const SWAP_XTZ_TO_TOKEN_RESULT = 'SWAP_XTZ_TO_TOKEN_RESULT'
export const SWAP_XTZ_TO_TOKEN_ERROR = 'SWAP_XTZ_TO_TOKEN_ERROR'
export const swapXtzToToken = (amount: number, minTokensBought: number) => async (dispatch: any, getState: any) => {
  const state: State = getState()

  if (!state.wallet.ready) {
    dispatch(showToaster(ERROR, 'Please connect your wallet', 'Click Connect in the left menu'))
    return
  }

  if (!(minTokensBought > 0)) {
    dispatch(showToaster(ERROR, 'Incorrect amount', 'Please enter an amount superior to zero'))
    return
  }

  if (state.loading) {
    dispatch(showToaster(ERROR, 'Cannot send transaction', 'Previous transaction still pending...'))
    return
  }

  let minTokensToBuy = minTokensBought
  if (!isWholeNumber(minTokensBought)) {
    minTokensToBuy = Math.round(minTokensBought)
    console.log(minTokensBought, minTokensToBuy)
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
      const deadline = new Date(Date.now() + 60 * 60 * 1000).toISOString()

      const op = await lqdContract.methods
        .xtzToToken(state.user.userAddress, minTokensToBuy.toString(), deadline)
        .send({ amount })
      dispatch({
        type: SWAP_XTZ_TO_TOKEN_REQUEST,
        amount: amount,
      })
      dispatch(showToaster(INFO, 'Swapping XTZ -> tzBTC', 'Please wait 30s...'))
      await op.confirmation()
      dispatch(showToaster(SUCCESS, 'Swap completed', 'All good :)'))
      dispatch({
        type: SWAP_XTZ_TO_TOKEN_RESULT,
        amount: minTokensBought,
      })
    }
    if (state.wallet.accountPkh) dispatch(getUserData(state.wallet.accountPkh))
  } catch (error: any) {
    console.error(error)
    dispatch(showToaster(ERROR, 'Error', error.message))
    dispatch({
      type: SWAP_XTZ_TO_TOKEN_ERROR,
      error,
    })
  }
}
