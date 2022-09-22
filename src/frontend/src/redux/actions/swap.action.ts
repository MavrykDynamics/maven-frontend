import { fetchFromIndexer } from 'gql/gql.helpers'
import { LB_DATA_QUERY, LB_DATA_QUERY_NAME } from 'gql/queries/lbData.query'
import { GET_TOKENS_DATA } from 'redux/action.types'
import { State } from '../../utils/interfaces'
import { showToaster } from 'app/App.components/Toaster/Toaster.actions'
import { ERROR, INFO, SUCCESS } from 'app/App.components/Toaster/Toaster.constants'

const TZBTC_CONTRACT = 'KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn',
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

  try {
    const lqdContract = await state.wallet.tezos?.wallet.at(LB_DEX_CONTRACT),
        tzBTCContract = await state.wallet.tezos?.wallet.at(TZBTC_CONTRACT)
    console.log('Liquidity Baking DEX contract', lqdContract)
    const deadline = new Date(Date.now() + 60000).toISOString()

    dispatch({
      type: SWAP_TOKEN_TO_XTZ_REQUEST,
      tokensSold,
    })
    // dispatch(showToaster(INFO, 'Staking...', 'Please wait 30s'))
    if (tzBTCContract && lqdContract) {
      let batch = await state.wallet.tezos?.wallet
          .batch()
          .withContractCall(tzBTCContract.methods.approve(LB_DEX_CONTRACT, 0))
          .withContractCall(tzBTCContract.methods.approve(LB_DEX_CONTRACT, tokensSold))
          .withContractCall(lqdContract.methods.tokenToXtz(state.user.userAddress, tokensSold, minXTZBought, deadline))
      const batchOp = await batch?.send()
      await batchOp?.confirmation()
      console.log('done', batchOp)
      // dispatch(showToaster(SUCCESS, 'Staking done', 'All good :)'))

      dispatch({
        type: SWAP_TOKEN_TO_XTZ_RESULT,
      })
    }
  } catch (error: any) {
    console.error(error)
    // dispatch(showToaster(ERROR, 'Error', error.message))
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
    console.log('Here in !(minTokensBought > 0) - caught error: ', minTokensBought)
    dispatch(showToaster(ERROR, 'Incorrect amount', 'Please enter an amount superior to zero'))
    return
  }

  if (state.loading) {
    dispatch(showToaster(ERROR, 'Cannot send transaction', 'Previous transaction still pending...'))
    return
  }

  try {
    const minTokensToBuy = minTokensBought
    const lqdContract = await state.wallet.tezos?.wallet.at(LB_DEX_CONTRACT)
    if (lqdContract) {
      const deadline = new Date(Date.now() + 60 * 60 * 1000).toISOString()

      const op = await lqdContract.methods
          .xtzToToken(state.user.userAddress, minTokensToBuy.toString(), deadline)
          .send({amount})
      dispatch({
        type: SWAP_XTZ_TO_TOKEN_REQUEST,
        minTokensBought,
      })
      dispatch(showToaster(INFO, 'Swapping XTZ -> tzBTC', 'Please wait 30s...'))

      await op.confirmation()
      dispatch(showToaster(SUCCESS, 'Swap completed', 'All good :)'))

      dispatch({
        type: SWAP_XTZ_TO_TOKEN_RESULT,
      })
    }
  } catch (error: any) {
    console.error(error)
    dispatch(showToaster(ERROR, 'Error', error.message))
    dispatch({
      type: SWAP_XTZ_TO_TOKEN_ERROR,
      error,
    })
  }
}
