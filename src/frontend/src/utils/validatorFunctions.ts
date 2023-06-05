import { State } from './interfaces'
import { RpcClient } from '@taquito/rpc'

export const isValidRPCNode = async (
  input: string,
  currentRpcNodes: State['preferences']['RPC_NODES'],
): Promise<{ status: boolean; errorMsg: null | string }> => {
  if (!input) return { status: false, errorMsg: null }
  if (currentRpcNodes.find(({ url }) => url.toLowerCase().trim() === input.toLowerCase().trim()))
    return { status: false, errorMsg: 'link is already a default option, please enter in new link.' }

  try {
    // Enumeration ChainIds - https://tezostaquito.io/typedoc/enums/_taquito_taquito.chainids.html
    const chainPublicKey = process.env.REACT_APP_CHAIN_ID ?? 'NetXdQprcVkpaWU' // mainnet
    const client = new RpcClient(input, chainPublicKey)
    const chainID = await client.getChainId()
    const isValid = chainID === chainPublicKey
    return { status: isValid, errorMsg: isValid ? null : 'link is not valid for RPC node, please enter in new link.' }
  } catch (error) {
    if (error instanceof Error) {
      console.error('RPC node error:', error.message)
    }
    return { status: false, errorMsg: 'link is not valid for RPC node, please enter in new link.' }
  }
}
