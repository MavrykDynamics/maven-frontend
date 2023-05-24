import { State } from "./interfaces"
import { RpcClient } from '@taquito/rpc'

export const isValidRPCNode = async (
  input: string,
  currentRpcNodes: State['preferences']['RPC_NODES'],
): Promise<boolean> => {
  if (!input) return false
  if (currentRpcNodes.find(({ url }) => url.toLowerCase().trim() === input.toLowerCase().trim())) return false

  try {
    // Enumeration ChainIds - https://tezostaquito.io/typedoc/enums/_taquito_taquito.chainids.html
    const chainId = 'NetXdQprcVkpaWU' // mainnet
    const chainPublicKey = process.env.REACT_APP_CHAIN_ID ?? chainId
    const client = new RpcClient(input, chainPublicKey)
    const chainID = await client.getChainId()
    return chainID === chainPublicKey
  } catch (error) {
    if (error instanceof Error) {
      console.error('RPC node error:', error.message)
    }
    return false
  }
}
