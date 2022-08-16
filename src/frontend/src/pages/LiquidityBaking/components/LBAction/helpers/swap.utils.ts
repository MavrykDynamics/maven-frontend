import { DEXType } from './../../../../../utils/DEX/Dex.types'
import {
  tokenToXtzMinimumXtzOutput,
  tokenToXtzXtzOutput,
  xtzToTokenMinimumTokenOutput,
  xtzToTokenTokenOutput,
} from 'utils/DEX/DexCalcs'
import { parseSrtToNum } from 'utils/utils'

export const xtzToTzBTCSwap = async ({
  xtzAmount,
  lbContract,
  dex,
  xtz_pool,
  token_pool,
  accountAddress,
  slippage,
  deadline,
}: {
  lbContract: any
  dex: DEXType
  xtzAmount: number | string
  xtz_pool: number
  deadline: string
  token_pool: number
  slippage: number | string
  accountAddress: string
}) => {
  const expected = xtzToTokenTokenOutput(
    parseSrtToNum(xtzAmount),
    xtz_pool,
    token_pool,
    dex.fee,
    dex.burn,
    dex.includeSubsidy,
  )

  if (expected) {
    const minTokensBought = xtzToTokenMinimumTokenOutput(expected, parseSrtToNum(slippage))
    const op = await lbContract.methods.xtzToToken(accountAddress, minTokensBought, deadline).send()
    await op.confirmation()
  }
}

export const tzbtcToXtzSwap = async ({
  tzBTCAmount,
  lbContract,
  dex,
  xtz_pool,
  token_pool,
  accountAddress,
  slippage,
  tzBtcContract,
  deadline,
  Tezos,
}: {
  lbContract: any
  Tezos: any
  tzBtcContract: any
  dex: DEXType
  tzBTCAmount: number | string
  xtz_pool: number
  deadline: string
  token_pool: number
  slippage: number | string
  accountAddress: string
}) => {
  const expected = tokenToXtzXtzOutput(
    parseSrtToNum(tzBTCAmount),
    xtz_pool,
    token_pool,
    dex.fee,
    dex.burn,
    dex.includeSubsidy,
  )

  if (expected) {
    const minXtzBought = tokenToXtzMinimumXtzOutput(expected, parseSrtToNum(slippage))

    const batch = Tezos.wallet
      .batch()
      .withContractCall(tzBtcContract.methods.approve(accountAddress, 0))
      .withContractCall(tzBtcContract.methods.approve(accountAddress, parseSrtToNum(tzBTCAmount)))
      .withContractCall(
        lbContract.methods.tokenToXtz(accountAddress, parseSrtToNum(tzBTCAmount), minXtzBought, deadline),
      )
    const batchOp = await batch.send()
    await batchOp.confirmation()
  }
}
