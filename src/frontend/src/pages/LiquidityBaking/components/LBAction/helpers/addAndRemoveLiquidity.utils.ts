import { OpKind } from "@taquito/taquito"
import { calculateLqtOutput } from "utils/DEX/liquidityUtils"
import { parseSrtToNum } from "utils/utils"

export const addLiquidityHandler = async ({
  tzBTCAmount,
  xtzAmount,
  lbContract,
  accountAddress,
  slippage,
  tzBtcContract,
  deadline,
  Tezos,
  lbAddress,
  lqtReceived
}: {
  lbContract: any
  Tezos: any
  tzBtcContract: any
  tzBTCAmount: number | string
  xtzAmount: number | string
  deadline: string
  slippage: number | string
  accountAddress: string
  lbAddress: string
  lqtReceived: number
}) => {
  const maxTokensSold = Math.floor(
    parseSrtToNum(tzBTCAmount) + (parseSrtToNum(tzBTCAmount) * parseSrtToNum(slippage)) / 100,
  )

  const batchOp = await Tezos.wallet
    .batch([
      {
        kind: OpKind.TRANSACTION,
        ...tzBtcContract.methods.approve(lbAddress, 0).toTransferParams(),
      },
      {
        kind: OpKind.TRANSACTION,
        ...tzBtcContract.methods.approve(lbAddress, maxTokensSold).toTransferParams(),
      },
      {
        kind: OpKind.TRANSACTION,
        ...lbContract.methods.addLiquidity(accountAddress, lqtReceived - 3, maxTokensSold, deadline).toTransferParams(),
        amount: parseSrtToNum(xtzAmount),
        mutez: true,
      },
      {
        kind: OpKind.TRANSACTION,
        ...tzBtcContract.methods.approve(lbAddress, 0).toTransferParams(),
      },
    ])
    .send()
  await batchOp.confirmation()
}

export const removeLiquidityHandler = async ({
  sirAmount,
  lbContract,
  accountAddress,
  deadline,
  xtz_pool,
  token_pool,
  lqt_total
}: {
  lbContract: any
  sirAmount: number | string
  deadline: string
  accountAddress: string
  xtz_pool: number
  token_pool: number
  lqt_total: number
}) => {
  const { xtz, tzbtc } = calculateLqtOutput({
    lqTokens: parseSrtToNum(sirAmount),
    xtzPool: xtz_pool,
    tzbtcPool: token_pool,
    lqtTotal: lqt_total,
  })

  const op = await lbContract.methods
    .removeLiquidity(accountAddress, parseSrtToNum(sirAmount), xtz, tzbtc, deadline)
    .send()
  await op.confirmation()
}