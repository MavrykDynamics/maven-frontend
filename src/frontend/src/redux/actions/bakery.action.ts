import type { AppDispatch, GetState } from '../../app/App.controller'
import { State } from 'utils/interfaces'
import { TezosToolkit } from '@taquito/taquito'

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
  try {
    const rpcNetwork = state.preferences.REACT_APP_RPC_PROVIDER || 'https://mainnet.smartpy.io'
    const Tezos = new TezosToolkit(rpcNetwork)
    
    await Tezos.contract.setDelegate({ source: 'tz1_source', delegate: bekerAddress });
    console.error(`Success delegation:`)
  } catch (error) {
    console.error(`Failed delegation:`, error)
  }
}
