import { removeLiquidityTokenOut, removeLiquidityXtzOut } from 'utils/DEX/DexCalcs'
import { DexCalculationOutputFormat, DEXType } from './Dex.types'

export const calculateLqtOutput = ({
  lqTokens,
  xtzPool,
  tzbtcPool,
  lqtTotal,
}: {
  lqTokens: number
  xtzPool: number
  tzbtcPool: number
  lqtTotal: number
}): { xtz: number; tzbtc: number } => {
  const xtzOut = (+lqTokens * xtzPool) / lqtTotal
  const tzbtcOut = (+lqTokens * tzbtcPool) / lqtTotal

  return {
    xtz: xtzOut,
    tzbtc: tzbtcOut,
  }
}

// Remove liquidity calculators
export const removeLiquidityTokenReceived = (
  liquidityBurned: number,
  totalLiquidity: number,
  tokenPool: number,
  slippage: number,
): { expected: DexCalculationOutputFormat; minimum: DexCalculationOutputFormat } => {
  if (slippage < 0 || slippage > 1) {
    console.log(`slippage value supplied to 'removeLiquidityTokenReceived' was not between 0 and 1: ${slippage}`)
    return { expected: { value: 0, decimals: 0 }, minimum: { value: 0, decimals: 0 } }
  }

  const expected = removeLiquidityTokenOut(liquidityBurned, totalLiquidity, tokenPool)

  if (expected) {
    const minimum = expected - expected * slippage
    return { expected: { value: expected, decimals: 8 }, minimum: { value: minimum, decimals: 8 } }
  }

  return { expected: { value: 0, decimals: 0 }, minimum: { value: 0, decimals: 0 } }
}

export const removeLiquidityXtzReceived = (
  liquidityBurned: number,
  totalLiquidity: number,
  xtzPool: number,
  slippage: number,
  dex: DEXType,
): { expected: DexCalculationOutputFormat; minimum: DexCalculationOutputFormat } => {
  if (slippage < 0 || slippage > 1) {
    console.log(`slippage value supplied to 'removeLiquidityXtzReceived' was not between 0 and 1: ${slippage}`)
    return { expected: { value: 0, decimals: 0 }, minimum: { value: 0, decimals: 0 } }
  }

  const expected = removeLiquidityXtzOut(liquidityBurned, totalLiquidity, xtzPool, dex.includeSubsidy)

  if (expected) {
    const minimum = expected - expected * slippage
    return { expected: { value: expected, decimals: 6 }, minimum: { value: minimum, decimals: 8 } }
  }

  return { expected: { value: 0, decimals: 0 }, minimum: { value: 0, decimals: 0 } }
}

// Add liquidity calculators
