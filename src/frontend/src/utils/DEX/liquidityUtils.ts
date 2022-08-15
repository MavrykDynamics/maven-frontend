import {
  addLiquidityLiquidityCreated,
  addLiquidityTokenIn,
  addLiquidityXtzIn,
  removeLiquidityTokenOut,
  removeLiquidityXtzOut,
} from 'utils/DEX/DexCalcs'
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

  if (expected !== null) {
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

  if (expected !== null) {
    const minimum = expected - expected * slippage
    return { expected: { value: expected, decimals: 6 }, minimum: { value: minimum, decimals: 8 } }
  }

  return { expected: { value: 0, decimals: 0 }, minimum: { value: 0, decimals: 0 } }
}

// Add liquidity calculators
export const addLiquidityReturn = (
  xtzToDeposit: number,
  xtzPool: number,
  totalLiquidity: number,
  slippage: number,
  dex: DEXType,
): { expected: DexCalculationOutputFormat; minimum: DexCalculationOutputFormat } => {
  if (slippage < 0 || slippage > 1) {
    console.log(`slippage value supplied to 'addLiquidityReturn' was not between 0 and 1: ${slippage}`)
    return { expected: { value: 0, decimals: 0 }, minimum: { value: 0, decimals: 0 } }
  }

  const expected = addLiquidityLiquidityCreated(xtzToDeposit, xtzPool, totalLiquidity, dex.includeSubsidy)

  if (expected !== null) {
    const minimum = expected - expected * slippage
    return { expected: { value: expected, decimals: 0 }, minimum: { value: minimum, decimals: 0 } }
  }

  return { expected: { value: 0, decimals: 0 }, minimum: { value: 0, decimals: 0 } }
}

export const addLiquidityTokenRequired = (
  xtzToDeposit: number,
  xtzPool: number,
  tokenPool: number,
  dex: DEXType,
): DexCalculationOutputFormat => {
  const tokensRequired = addLiquidityTokenIn(xtzToDeposit, xtzPool, tokenPool, dex.includeSubsidy)
  return { value: tokensRequired ?? 0, decimals: 6 }
}

export const addLiquidityXtzRequired = (
  tokenToDeposit: number,
  xtzPool: number,
  tokenPool: number,
  dex: DEXType,
): DexCalculationOutputFormat => {
  const xtzRequired = addLiquidityXtzIn(tokenToDeposit, xtzPool, tokenPool, dex.includeSubsidy)
  return { value: xtzRequired ?? 0, decimals: 8 }
}

export const calculateAddLiquidityToken = (
  token: number,
  xtzPool: number,
  tokenPool: number,
  totalLiquidity: number,
  maxSlippage: number,
  dex: DEXType,
): {
  liquidityExpected: DexCalculationOutputFormat
  liquidityMinimum: DexCalculationOutputFormat
  xtzRequired: DexCalculationOutputFormat
} => {
  const xtzRequired = addLiquidityXtzRequired(token, xtzPool, tokenPool, dex)
  const liquidityReturned = addLiquidityReturn(xtzRequired.value, xtzPool, totalLiquidity, maxSlippage, dex)
  return {
    liquidityExpected: liquidityReturned.expected,
    liquidityMinimum: liquidityReturned.minimum,
    xtzRequired,
  }
}

export const calculateAddLiquidityXTZ = (
  xtz: number,
  xtzPool: number,
  tokenPool: number,
  totalLiquidity: number,
  maxSlippage: number,
  dex: DEXType,
): {
  liquidityExpected: DexCalculationOutputFormat
  liquidityMinimum: DexCalculationOutputFormat
  tokenRequired: DexCalculationOutputFormat
} => {
  const tokenRequired = addLiquidityTokenRequired(xtz, xtzPool, tokenPool, dex)
  const liquidityReturned = addLiquidityReturn(xtz, xtzPool, totalLiquidity, maxSlippage, dex)
  return {
    liquidityExpected: liquidityReturned.expected,
    liquidityMinimum: liquidityReturned.minimum,
    tokenRequired,
  }
}

export const addLiquidityCalculationsHandler = (
  coinName: 'XTZ' | 'tzBTC',
  coinIn: number,
  xtzPool: number,
  tokenPool: number,
  totalLiquidity: number,
  maxSlippage: number,
  dex: DEXType,
): {
  liquidityExpected: DexCalculationOutputFormat,
  liquidityMinimum: DexCalculationOutputFormat,
  tokenRequired?: DexCalculationOutputFormat,
  xtzRequired?: DexCalculationOutputFormat
} => {
  if (coinName === 'XTZ') {
    return calculateAddLiquidityXTZ(coinIn, xtzPool, tokenPool, totalLiquidity, maxSlippage, dex)
  }else{
    return calculateAddLiquidityToken(coinIn, xtzPool, tokenPool, totalLiquidity, maxSlippage, dex)
  }
}
