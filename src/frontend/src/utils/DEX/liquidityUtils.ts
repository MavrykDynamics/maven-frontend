// @ts-ignore
import dexterCalculations from 'dex-calcs/dist/index-mobile.min'
import BigNumber from 'bignumber.js'
import {PRECISION_NUMBER_EIGHT_ZEROES, PRECISION_NUMBER_SIX_ZEROES} from '../consts'
import {xtzToTokenExchangeRateDisplay} from './swapUtils'

/**
 *  Add liquidity functions
 */
export function calculateAddLiquidity(
  xtzToAdd: number,
  tokenToAdd: number,
  xtzPool: number,
  tokenPool: number,
  lqtTotal: number,
  maxSlippage: number,
  dex: { fee: number; burn: number; includeSubsidy: boolean },
): {
  xtz: { liquidityExpected: number; liquidityMinimum: number; required: number; exchangeRate: number }
  tzBTC: { liquidityExpected: number; liquidityMinimum: number; required: number; exchangeRate: number }
} {
  let _xtzToAdd = new BigNumber(xtzToAdd * PRECISION_NUMBER_SIX_ZEROES),
    _tokenToAdd = new BigNumber(xtzToAdd * PRECISION_NUMBER_SIX_ZEROES),
    _xtzPool = new BigNumber(xtzPool * PRECISION_NUMBER_SIX_ZEROES),
    _tokenPool = new BigNumber(tokenPool * PRECISION_NUMBER_EIGHT_ZEROES),
    _lqtTotal = new BigNumber(lqtTotal)

  return {
    tzBTC: { exchangeRate: 0, liquidityExpected: 0, liquidityMinimum: 0, required: 0 },
    xtz: { exchangeRate: 0, liquidityExpected: 0, liquidityMinimum: 0, required: 0 },
  }
}

/**
 *  Add Liquidity XTZ function + helpers
 * @param xtzToAdd
 * @param xtzPool
 * @param tokenPool
 * @param lqtTotal
 * @param maxSlippage
 * @param dex
 */
export function calculateAddLiquidityXTZ(
  xtzToAdd: BigNumber,
  xtzPool: BigNumber,
  tokenPool: BigNumber,
  lqtTotal: BigNumber,
  maxSlippage: number,
  dex: { fee: number; burn: number; includeSubsidy: boolean },
): { liquidityExpected: BigNumber; liquidityMinimum: BigNumber; required: BigNumber; exchangeRate: number } {
  const tokenRequired = addLiquidityTokenRequired(xtzToAdd, xtzPool, tokenPool, dex)
  const liquidityReturned = addLiquidityReturn(xtzToAdd, xtzPool, lqtTotal, maxSlippage, dex)
  const exchangeRate = xtzToTokenExchangeRateDisplay(xtzToAdd, xtzPool, tokenPool, dex)
  return {
    exchangeRate: exchangeRate,
    liquidityExpected: liquidityReturned?.expected,
    liquidityMinimum: liquidityReturned?.minimum,
    required: tokenRequired,
  }
}

export function addLiquidityTokenRequired(
  xtzToDeposit: BigNumber,
  xtzPool: BigNumber,
  tokenPool: BigNumber,
  dex: { fee: number; burn: number; includeSubsidy: boolean },
): BigNumber {
  const tokensRequired = dexterCalculations.addLiquidityTokenIn(
    xtzToDeposit.toString(),
    xtzPool.toString(),
    tokenPool.toString(),
    dex.includeSubsidy,
  )
  return new BigNumber(tokensRequired && tokensRequired.gt(0) ? tokensRequired : 0)
}

export function addLiquidityReturn(
  xtzToDeposit: BigNumber,
  xtzPool: BigNumber,
  totalLiquidity: BigNumber,
  slippage: number,
  dex: { fee: number; burn: number; includeSubsidy: boolean },
): { expected: BigNumber; minimum: BigNumber } {
  if (slippage < 0 || slippage > 1) {
    console.log(`slippage value supplied to 'addLiquidityReturn' was not between 0 and 1: ${slippage}`)
    return { expected: new BigNumber(0), minimum: new BigNumber(0) }
  }

  const expected = dexterCalculations.addLiquidityLiquidityCreated(
    xtzToDeposit.toString(),
    xtzPool.toString(),
    totalLiquidity.toString(),
    dex.includeSubsidy,
  )
  const minimum = expected ? expected - expected * slippage : 0
  return { expected: new BigNumber(expected), minimum: new BigNumber(minimum) }
}

//
// export const calculateLqtOutput = ({
//   lqTokens,
//   xtzPool,
//   tzbtcPool,
//   lqtTotal,
// }: {
//   lqTokens: number
//   xtzPool: number
//   tzbtcPool: number
//   lqtTotal: number
// }): { xtz: number; tzbtc: number } => {
//   const xtzOut = (+lqTokens * xtzPool) / lqtTotal
//   const tzbtcOut = (+lqTokens * tzbtcPool) / lqtTotal
//
//   return {
//     xtz: xtzOut,
//     tzbtc: tzbtcOut,
//   }
// }
//
// // Remove liquidity calculators
// export const removeLiquidityTokenReceived = (
//   liquidityBurned: number,
//   totalLiquidity: number,
//   tokenPool: number,
//   slippage: number,
// ): { expected: DexCalculationOutputFormat; minimum: DexCalculationOutputFormat } => {
//   if (slippage < 0 || slippage > 1) {
//     console.log(`slippage value supplied to 'removeLiquidityTokenReceived' was not between 0 and 1: ${slippage}`)
//     return { expected: { value: 0, decimals: 0 }, minimum: { value: 0, decimals: 0 } }
//   }
//
//   const expected = removeLiquidityTokenOut(liquidityBurned, totalLiquidity, tokenPool)
//
//   if (expected !== null) {
//     const minimum = expected - expected * slippage
//     return { expected: { value: expected, decimals: 8 }, minimum: { value: minimum, decimals: 8 } }
//   }
//
//   return { expected: { value: 0, decimals: 0 }, minimum: { value: 0, decimals: 0 } }
// }
//
// export const removeLiquidityXtzReceived = (
//   liquidityBurned: number,
//   totalLiquidity: number,
//   xtzPool: number,
//   slippage: number,
//   dex: DEXType,
// ): { expected: DexCalculationOutputFormat; minimum: DexCalculationOutputFormat } => {
//   if (slippage < 0 || slippage > 1) {
//     console.log(`slippage value supplied to 'removeLiquidityXtzReceived' was not between 0 and 1: ${slippage}`)
//     return { expected: { value: 0, decimals: 0 }, minimum: { value: 0, decimals: 0 } }
//   }
//
//   const expected = removeLiquidityXtzOut(liquidityBurned, totalLiquidity, xtzPool, dex.includeSubsidy)
//
//   if (expected !== null) {
//     const minimum = expected - expected * slippage
//     return { expected: { value: expected, decimals: 6 }, minimum: { value: minimum, decimals: 8 } }
//   }
//
//   return { expected: { value: 0, decimals: 0 }, minimum: { value: 0, decimals: 0 } }
// }
//

//
// export const addLiquidityXtzRequired = (
//   tokenToDeposit: number,
//   xtzPool: number,
//   tokenPool: number,
//   dex: DEXType,
// ): DexCalculationOutputFormat => {
//   const xtzRequired = addLiquidityXtzIn(tokenToDeposit, xtzPool, tokenPool, dex.includeSubsidy)
//   return { value: xtzRequired ?? 0, decimals: 8 }
// }
//
// export const calculateAddLiquidityToken = (
//   token: number,
//   xtzPool: number,
//   tokenPool: number,
//   totalLiquidity: number,
//   maxSlippage: number,
//   dex: DEXType,
// ): {
//   liquidityExpected: DexCalculationOutputFormat
//   liquidityMinimum: DexCalculationOutputFormat
//   xtzRequired: DexCalculationOutputFormat
// } => {
//   const xtzRequired = addLiquidityXtzRequired(token, xtzPool, tokenPool, dex)
//   const liquidityReturned = addLiquidityReturn(xtzRequired.value, xtzPool, totalLiquidity, maxSlippage, dex)
//   return {
//     liquidityExpected: liquidityReturned.expected,
//     liquidityMinimum: liquidityReturned.minimum,
//     xtzRequired,
//   }
// }
//
// export const calculateAddLiquidityXTZ = (
//   xtz: number,
//   xtzPool: number,
//   tokenPool: number,
//   totalLiquidity: number,
//   maxSlippage: number,
//   dex: DEXType,
// ): {
//   liquidityExpected: DexCalculationOutputFormat
//   liquidityMinimum: DexCalculationOutputFormat
//   tokenRequired: DexCalculationOutputFormat
// } => {
//   const tokenRequired = addLiquidityTokenRequired(xtz, xtzPool, tokenPool, dex)
//   const liquidityReturned = addLiquidityReturn(xtz, xtzPool, totalLiquidity, maxSlippage, dex)
//   return {
//     liquidityExpected: liquidityReturned.expected,
//     liquidityMinimum: liquidityReturned.minimum,
//     tokenRequired,
//   }
// }
//
// export const addLiquidityCalculationsHandler = (
//   coinName: 'XTZ' | 'tzBTC',
//   coinIn: number,
//   xtzPool: number,
//   tokenPool: number,
//   totalLiquidity: number,
//   maxSlippage: number,
//   dex: DEXType,
// ): {
//   liquidityExpected: DexCalculationOutputFormat
//   liquidityMinimum: DexCalculationOutputFormat
//   tokenRequired?: DexCalculationOutputFormat
//   xtzRequired?: DexCalculationOutputFormat
// } => {
//   if (coinName === 'XTZ') {
//     return calculateAddLiquidityXTZ(coinIn, xtzPool, tokenPool, totalLiquidity, maxSlippage, dex)
//   } else {
//     return calculateAddLiquidityToken(coinIn, xtzPool, tokenPool, totalLiquidity, maxSlippage, dex)
//   }
// }
