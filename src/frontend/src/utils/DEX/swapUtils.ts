import {DEXType} from './Dex.types'
import {PRECISION_NUMBER_EIGHT_ZEROES, PRECISION_NUMBER_SIX_ZEROES} from '../consts'
// @ts-ignore
import dexterCalculations from 'dex-calcs/dist/index-mobile.min'
import BigNumber from 'bignumber.js'

// const DexCalculations = new DexterCalculations(true)
// kukai actions
export const swapCalculateCoinReceive = (
  fromCoin: 'XTZ' | 'tzBTC',
  toCoin: 'XTZ' | 'tzBTC',
  coinIn: number,
  xtzPool: number,
  tokenPool: number,
  maxSlippage: number,
  dex: DEXType,
): { expected: number; minimum: number; priceImpact: number } => {
  // if (fromCoin === 'XTZ' && toCoin === 'tzBTC') {
  //   const expected = xtzToTokenTokenOutput(coinIn, xtzPool, tokenPool, dex.fee, dex.burn, dex.includeSubsidy)
  //
  //   if (!expected) return { expected: 0, minimum: 0, priceImpact: 0 }
  //
  //   const minimum = xtzToTokenMinimumTokenOutput(expected, maxSlippage)
  //   const priceImpact = xtzToTokenPriceImpact(coinIn, xtzPool, tokenPool, dex.fee, dex.burn, dex.includeSubsidy)
  //
  //   console.info('output xtz=>tzbtc (expected, minimum, priceImpact)', expected, minimum, priceImpact)
  //
  //   return { expected, minimum: minimum || 0, priceImpact: priceImpact || 0 }
  // }
  //
  // if (fromCoin === 'tzBTC' && toCoin === 'XTZ') {
  //   const expected = tokenToXtzXtzOutput(coinIn, xtzPool, tokenPool, dex.fee, dex.burn)
  //
  //   if (!expected) return { expected: 0, minimum: 0, priceImpact: 0 }
  //
  //   const minimum = tokenToXtzMinimumXtzOutput(expected, maxSlippage)
  //   const priceImpact = tokenToXtzPriceImpact(coinIn, xtzPool, tokenPool, dex.fee, dex.burn, dex.includeSubsidy)
  //
  //   console.info('output tzbtc=>xtz (expected, minimum, priceImpact)', expected, minimum, priceImpact)
  //
  //   return { expected, minimum: minimum || 0, priceImpact: priceImpact || 0 }
  // }

  return { expected: 0, minimum: 0, priceImpact: 0 }
}

/**
 *  XTZ -> tzBTC swap functions
 */

/**
 * XTZ -> tzBTC Swap main function entrypoint
 *
 * @param xtzToSell
 * @param xtzPool
 * @param tokenPool
 * @param maxSlippage
 * @param dex
 */
export function calculateXtzToToken(
  xtzToSell: number,
  xtzPool: number,
  tokenPool: number,
  maxSlippage: number,
  dex: { fee: number; burn: number; includeSubsidy: boolean },
): { expected: number; minimum: number; rate: number; priceImpact: number } {
  console.log(
    `Logging input in calculateXtzToToken\nxtzToSell: ${xtzToSell}\n xtzPool: ${xtzPool}\ntokenPool: ${tokenPool}\nmaxSlippage: ${maxSlippage}`,
  )
  let _xtzToSell = new BigNumber(xtzToSell * PRECISION_NUMBER_SIX_ZEROES),
    _xtzPool = new BigNumber(xtzPool * PRECISION_NUMBER_SIX_ZEROES),
    _tokenPool = new BigNumber(tokenPool * PRECISION_NUMBER_EIGHT_ZEROES)

  const expectedTokenReceived = xtzToTokenExpectedReturn(_xtzToSell, _xtzPool, _tokenPool, dex)
  console.log(
    `Logging output of expectedTokenReceived in calculateXtzToToken\nValue: ${expectedTokenReceived}\n Type: ${typeof expectedTokenReceived}`,
  )
  const minimumReceived = xtzToTokenMinimumReturn(expectedTokenReceived, maxSlippage)
  const exchangeRate = xtzToTokenExchangeRateDisplay(_xtzToSell, _xtzPool, _tokenPool, dex)
  const priceImpact = xtzToTokenPriceImpact(_xtzToSell, _xtzPool, _tokenPool, dex)
  console.log(
    `Logging results in calculateXtzToToken\nExpected: ${expectedTokenReceived}\n Minimum: ${minimumReceived}\nExchangeRate: ${exchangeRate}\nPriceImpact: ${priceImpact}`,
  )
  return {
    expected: expectedTokenReceived.toNumber() / PRECISION_NUMBER_EIGHT_ZEROES,
    minimum: minimumReceived.toNumber() / PRECISION_NUMBER_EIGHT_ZEROES,
    rate: exchangeRate,
    priceImpact: priceImpact,
  }
}

function xtzToTokenExpectedReturn(
  xtzToSell: BigNumber,
  xtzPool: BigNumber,
  tokenPool: BigNumber,
  dex: { fee: number; burn: number; includeSubsidy: boolean },
): BigNumber {
  const result = dexterCalculations.xtzToTokenTokenOutput(
    xtzToSell.toString(),
    xtzPool.toString(),
    tokenPool.toString(),
    dex.fee.toString(),
    dex.burn.toString(),
  )
  return new BigNumber(result && result.gt(0) ? result : 0)
}

function xtzToTokenMinimumReturn(expectedReturn: BigNumber, maxSlippage: number): BigNumber {
  if (maxSlippage < 0 || maxSlippage > 1) {
    console.log(`slippage value supplied to 'xtzToTokenMinimumReturn' was not between 0 and 1: ${maxSlippage}`)
    return new BigNumber(0)
  }
  const result = dexterCalculations.xtzToTokenMinimumTokenOutput(expectedReturn.toString(), maxSlippage)
  return new BigNumber(result && result.gt(0) ? result : 0)
}

function xtzToTokenExchangeRateDisplay(
  xtzToSell: BigNumber,
  xtzPool: BigNumber,
  tokenPool: BigNumber,
  dex: { fee: number; burn: number; includeSubsidy: boolean },
): number {
  const result = dexterCalculations.xtzToTokenExchangeRateForDisplay(
    xtzToSell.toString(),
    xtzPool.toString(),
    tokenPool.toString(),
    8,
    dex.fee,
    dex.burn,
  )
  return result ? Number(result) : 0
}

function xtzToTokenPriceImpact(
  xtzToSell: BigNumber,
  xtzPool: BigNumber,
  tokenPool: BigNumber,
  dex: { fee: number; burn: number; includeSubsidy: boolean },
): number {
  console.log(
    'Logging here in xtzToTokenPriceImpact: ',
    xtzToSell.toNumber(),
    xtzPool.toNumber(),
    tokenPool.toNumber(),
    dex,
  )
  const result = dexterCalculations.xtzToTokenPriceImpact(
    xtzToSell.toNumber(),
    xtzPool.toNumber(),
    tokenPool.toNumber(),
    dex.burn,
  )
  return result ? Number(result) : 0
}

// original dex calculations
// function xtzToTokenTokenOutput(xtzIn, xtzPool, tokenPool, feePercent, burnPercent, includeSubsidy) {
//     var xtzPool = xtzPool;
//     if (includeSubsidy) {
//         xtzPool = creditSubsidy(xtzPool);
//     }
//     var xtzIn_ = bigInt.zero;
//     var xtzPool_ = bigInt.zero;
//     var tokenPool_ = bigInt.zero;
//     var fee = 1e3 - Math.floor(feePercent * 10);
//     var burn = 1e3 - Math.floor(burnPercent * 10);
//     var feeMultiplier = fee * burn;
//     try {
//         xtzIn_ = bigInt(xtzIn);
//         xtzPool_ = bigInt(xtzPool);
//         tokenPool_ = bigInt(tokenPool);
//     } catch (err) {
//         return null;
//     }
//     if (gtZero(xtzIn_) && gtZero(xtzPool_) && gtZero(tokenPool_)) {
//         var numerator = xtzIn_.times(tokenPool_).times(bigInt(feeMultiplier));
//         var denominator = xtzPool_.times(bigInt(1e6)).add(xtzIn_.times(bigInt(feeMultiplier)));
//         return numerator.divide(denominator);
//     } else {
//         return null;
//     }
// }
// function xtzToTokenXtzInput(tokenOut, xtzPool, tokenPool, decimals, feePercent, burnPercent, includeSubsidy) {
//     var xtzPool = xtzPool;
//     if (includeSubsidy) {
//         xtzPool = creditSubsidy(xtzPool);
//     }
//     var tokenOut_ = bigInt.zero;
//     var xtzPool_ = bigInt.zero;
//     var tokenPool_ = bigInt.zero;
//     var decimals_ = bigInt.zero;
//     var fee = 1e3 - Math.floor(feePercent * 10);
//     var burn = 1e3 - Math.floor(burnPercent * 10);
//     var feeMultiplier = fee * burn;
//     try {
//         tokenOut_ = bigInt(tokenOut);
//         xtzPool_ = bigInt(xtzPool);
//         tokenPool_ = bigInt(tokenPool);
//         decimals_ = bigInt(decimals);
//     } catch (err) {
//         return null;
//     }
//     if (gtZero(tokenOut_) && gtZero(xtzPool_) && gtZero(tokenPool_) && geqZero(decimals_)) {
//         var result = xtzPool_
//             .times(tokenOut_)
//             .times(bigInt(1e6))
//             .times(Math.pow(10, decimals_))
//             .divide(tokenPool_.minus(tokenOut_).times(bigInt(feeMultiplier).times(Math.pow(10, decimals_))));
//         if (gtZero(result)) {
//             return result;
//         }
//         return null;
//     } else {
//         return null;
//     }
// }
// function xtzToTokenExchangeRate(xtzIn, xtzPool, tokenPool, feePercent, burnPercent, includeSubsidy) {
//     var xtzIn_ = bigInt.zero;
//     var xtzPool_ = bigInt.zero;
//     var tokenPool_ = bigInt.zero;
//     try {
//         xtzIn_ = bigInt(xtzIn);
//         xtzPool_ = bigInt(xtzPool);
//         tokenPool_ = bigInt(tokenPool);
//     } catch (err) {
//         return null;
//     }
//     if (gtZero(xtzIn_) && gtZero(xtzPool_) && gtZero(tokenPool_)) {
//         return xtzToTokenTokenOutput(xtzIn_, xtzPool_, tokenPool_, feePercent, burnPercent, includeSubsidy) / xtzIn_;
//     } else {
//         return null;
//     }
// }
// function xtzToTokenExchangeRateForDisplay(xtzIn, xtzPool, tokenPool, decimals, feePercent, burnPercent, includeSubsidy) {
//     var xtzIn_ = bigInt.zero;
//     var xtzPool_ = bigInt.zero;
//     var tokenPool_ = bigInt.zero;
//     try {
//         xtzIn_ = bigInt(xtzIn);
//         xtzPool_ = bigInt(xtzPool);
//         tokenPool_ = bigInt(tokenPool);
//     } catch (err) {
//         return null;
//     }
//     if (gtZero(xtzIn_) && gtZero(xtzPool_) && gtZero(tokenPool_)) {
//         return (xtzToTokenTokenOutput(xtzIn_, xtzPool_, tokenPool_, feePercent, burnPercent, includeSubsidy) * Math.pow(10, -decimals)) / (xtzIn_ * Math.pow(10, -6));
//     } else {
//         return null;
//     }
// }
// function xtzToTokenMarketRate(xtzPool, tokenPool, decimals) {
//     var xtzPool_ = bigInt.zero;
//     var tokenPool_ = bigInt.zero;
//     var decimals_ = bigInt.zero;
//     try {
//         xtzPool_ = bigInt(xtzPool);
//         tokenPool_ = bigInt(tokenPool);
//         decimals_ = bigInt(decimals);
//     } catch (err) {
//         return null;
//     }
//     if (gtZero(xtzPool_) && gtZero(tokenPool_) && geqZero(decimals_)) {
//         var xtzPool__ = xtzPool_ * Math.pow(10, -6);
//         var tokenPool__ = tokenPool_ * Math.pow(10, -decimals_);
//         return tokenPool__ / xtzPool__;
//     } else {
//         return null;
//     }
// }
// function xtzToTokenPriceImpact(xtzIn, xtzPool, tokenPool, feePercent, burnPercent, includeSubsidy) {
//     var expectedTokenPayout = xtzToTokenTokenOutput(xtzIn, xtzPool, tokenPool, feePercent, burnPercent, includeSubsidy);
//     var xtzPool = xtzPool;
//     if (includeSubsidy) {
//         xtzPool = creditSubsidy(xtzPool);
//     }
//     var xtzIn_ = bigInt.zero;
//     var xtzPool_ = bigInt.zero;
//     var tokenPool_ = bigInt.zero;
//     var burn = 1e3 - Math.floor(burnPercent * 10);
//     try {
//         xtzIn_ = bigInt(xtzIn);
//         xtzPool_ = bigInt(xtzPool);
//         tokenPool_ = bigInt(tokenPool);
//     } catch (err) {
//         return null;
//     }
//     if (gtZero(xtzIn_) && gtZero(xtzPool_) && gtZero(tokenPool_)) {
//         var currentMidPrice = xtzPool_ / tokenPool_;
//         var xtzInNetBurn = xtzIn_.times(burn).divide(1e3);
//         var postTradeMidPrice = (xtzPool_ + xtzInNetBurn) / (tokenPool_ - expectedTokenPayout);
//         var result = Math.abs(1 - postTradeMidPrice / currentMidPrice);
//         if (result < 1e-5) {
//             return 0;
//         } else {
//             return result;
//         }
//     } else {
//         return null;
//     }
// }
// function xtzToTokenMinimumTokenOutput(tokenOut, allowedSlippage) {
//     if (tokenOut > 0 && allowedSlippage >= 0 && allowedSlippage <= 1) {
//         var tokenOut_ = bigInt(tokenOut).times(bigInt(1e3));
//         var allowedSlippage_ = bigInt(Math.floor(allowedSlippage * 1e3 * 100));
//         var result = tokenOut_.minus(tokenOut_.times(allowedSlippage_).divide(bigInt(1e5))).divide(1e3);
//         return bigInt.max(result, bigInt.one);
//     } else {
//         return null;
//     }
// }
// function totalLiquidityProviderFee(xtzIn) {
//     var xtzIn_ = bigInt.zero;
//     try {
//         xtzIn_ = bigInt(xtzIn);
//     } catch (err) {
//         return null;
//     }
//     if (gtZero(xtzIn_)) {
//         return bigInt(xtzIn_).times(bigInt(1)).divide(1e3);
//     } else {
//         return null;
//     }
// }
// function liquidityProviderFee(xtzIn, totalLiquidity, userLiquidity) {
//     var xtzIn_ = bigInt.zero;
//     var totalLiquidity_ = bigInt.zero;
//     var userLiquidity_ = bigInt.zero;
//     try {
//         xtzIn_ = bigInt(xtzIn);
//         totalLiquidity_ = bigInt(totalLiquidity);
//         userLiquidity_ = bigInt(userLiquidity);
//     } catch (err) {
//         return null;
//     }
//     if (gtZero(xtzIn_) && gtZero(totalLiquidity_) && gtZero(userLiquidity_)) {
//         return totalLiquidityProviderFee(xtzIn).divide(totalLiquidity_.divide(userLiquidity));
//     } else {
//         return null;
//     }
// }
// function tokenToXtzXtzOutput(tokenIn, xtzPool, tokenPool, feePercent, burnPercent, includeSubsidy) {
//     var xtzPool = xtzPool;
//     if (includeSubsidy) {
//         xtzPool = creditSubsidy(xtzPool);
//     }
//     var tokenIn_ = bigInt.zero;
//     var xtzPool_ = bigInt.zero;
//     var tokenPool_ = bigInt.zero;
//     var fee = 1e3 - Math.floor(feePercent * 10);
//     var burn = 1e3 - Math.floor(burnPercent * 10);
//     var feeAndBurnMultiplier = fee * burn;
//     var feeMultiplier = fee * 1e3;
//     try {
//         tokenIn_ = bigInt(tokenIn);
//         xtzPool_ = bigInt(xtzPool);
//         tokenPool_ = bigInt(tokenPool);
//     } catch (err) {
//         return null;
//     }
//     if (gtZero(tokenIn_) && gtZero(xtzPool_) && gtZero(tokenPool_)) {
//         var numerator = bigInt(tokenIn).times(bigInt(xtzPool)).times(bigInt(feeAndBurnMultiplier));
//         var denominator = bigInt(tokenPool)
//             .times(bigInt(1e6))
//             .add(bigInt(tokenIn).times(bigInt(feeMultiplier)));
//         return numerator.divide(denominator);
//     } else {
//         return null;
//     }
// }
// function tokenToXtzTokenInput(xtzOut, xtzPool, tokenPool, decimals, feePercent, burnPercent, includeSubsidy) {
//     var xtzPool = xtzPool;
//     if (includeSubsidy) {
//         xtzPool = creditSubsidy(xtzPool);
//     }
//     var xtzOut_ = bigInt.zero;
//     var xtzPool_ = bigInt.zero;
//     var tokenPool_ = bigInt.zero;
//     var decimals_ = bigInt.zero;
//     var fee = 1e3 - Math.floor(feePercent * 10);
//     var burn = 1e3 - Math.floor(burnPercent * 10);
//     var feeAndBurnMultiplier = fee * burn;
//     var feeMultiplier = fee * 1e3;
//     try {
//         xtzOut_ = bigInt(xtzOut);
//         xtzPool_ = bigInt(xtzPool);
//         tokenPool_ = bigInt(tokenPool);
//         decimals_ = bigInt(decimals);
//     } catch (err) {
//         return null;
//     }
//     if (gtZero(xtzOut_) && gtZero(xtzPool_) && gtZero(tokenPool_) && geqZero(decimals_)) {
//         var result = tokenPool_
//             .times(xtzOut_)
//             .times(bigInt(1e6))
//             .times(Math.pow(10, decimals_))
//             .divide(
//                 xtzPool_
//                     .times(bigInt(feeMultiplier))
//                     .minus(xtzOut_.times(bigInt(feeAndBurnMultiplier)))
//                     .times(Math.pow(10, decimals_))
//             );
//         if (gtZero(result)) {
//             return result;
//         }
//         return null;
//     } else {
//         return null;
//     }
// }
// function tokenToXtzExchangeRate(tokenIn, xtzPool, tokenPool, feePercent, burnPercent, includeSubsidy) {
//     var tokenIn_ = bigInt.zero;
//     var xtzPool_ = bigInt.zero;
//     var tokenPool_ = bigInt.zero;
//     try {
//         tokenIn_ = bigInt(tokenIn);
//         xtzPool_ = bigInt(xtzPool);
//         tokenPool_ = bigInt(tokenPool);
//     } catch (err) {
//         return null;
//     }
//     if (gtZero(tokenIn_) && gtZero(xtzPool_) && gtZero(tokenPool_)) {
//         return tokenToXtzXtzOutput(tokenIn_, xtzPool_, tokenPool_, feePercent, burnPercent, includeSubsidy) / tokenIn_;
//     } else {
//         return null;
//     }
// }
// function tokenToXtzExchangeRateForDisplay(tokenIn, xtzPool, tokenPool, decimals, feePercent, burnPercent, includeSubsidy) {
//     var tokenIn_ = bigInt.zero;
//     var xtzPool_ = bigInt.zero;
//     var tokenPool_ = bigInt.zero;
//     try {
//         tokenIn_ = bigInt(tokenIn);
//         xtzPool_ = bigInt(xtzPool);
//         tokenPool_ = bigInt(tokenPool);
//     } catch (err) {
//         return null;
//     }
//     if (gtZero(tokenIn_) && gtZero(xtzPool_) && gtZero(tokenPool_)) {
//         return (tokenToXtzXtzOutput(tokenIn_, xtzPool_, tokenPool_, feePercent, burnPercent, includeSubsidy) * Math.pow(10, -6)) / (tokenIn_ * Math.pow(10, -decimals));
//     } else {
//         return null;
//     }
// }
// function tokenToXtzMarketRate(xtzPool, tokenPool, decimals) {
//     var xtzPool_ = bigInt.zero;
//     var tokenPool_ = bigInt.zero;
//     var decimals_ = bigInt.zero;
//     try {
//         xtzPool_ = bigInt(xtzPool);
//         tokenPool_ = bigInt(tokenPool);
//         decimals_ = bigInt(decimals);
//     } catch (err) {
//         return null;
//     }
//     if (gtZero(xtzPool_) && gtZero(tokenPool_) && geqZero(decimals_)) {
//         var xtzPool__ = xtzPool_ * Math.pow(10, -6);
//         var tokenPool__ = tokenPool_ * Math.pow(10, -decimals_);
//         return xtzPool__ / tokenPool__;
//     } else {
//         return null;
//     }
// }
// function tokenToXtzPriceImpact(tokenIn, xtzPool, tokenPool, feePercent, burnPercent, includeSubsidy) {
//     var expectedXTZPayout = tokenToXtzXtzOutput(tokenIn, xtzPool, tokenPool, feePercent, burnPercent, includeSubsidy);
//     var xtzPool = xtzPool;
//     if (includeSubsidy) {
//         xtzPool = creditSubsidy(xtzPool);
//     }
//     var tokenIn_ = bigInt.zero;
//     var xtzPool_ = bigInt.zero;
//     var tokenPool_ = bigInt.zero;
//     try {
//         tokenIn_ = bigInt(tokenIn);
//         xtzPool_ = bigInt(xtzPool);
//         tokenPool_ = bigInt(tokenPool);
//     } catch (err) {
//         return null;
//     }
//     if (gtZero(tokenIn_) && gtZero(xtzPool_) && gtZero(tokenPool_)) {
//         var currentMidPrice = xtzPool_ / tokenPool_;
//         var postTradeMidPrice = (xtzPool_ - expectedXTZPayout) / (tokenPool_ + tokenIn_);
//         var result = Math.abs(1 - postTradeMidPrice / currentMidPrice);
//         if (result < 1e-5) {
//             return 0;
//         } else {
//             return result;
//         }
//     } else {
//         return null;
//     }
// }
// function tokenToXtzMinimumXtzOutput(xtzOut, allowedSlippage) {
//     if (xtzOut > 0 && allowedSlippage >= 0 && allowedSlippage <= 1) {
//         var xtzOut_ = bigInt(xtzOut).times(bigInt(1e3));
//         var allowedSlippage_ = bigInt(Math.floor(allowedSlippage * 1e3 * 100));
//         var result = xtzOut_.minus(xtzOut_.times(allowedSlippage_).divide(bigInt(1e5))).divide(1e3);
//         return bigInt.max(result, bigInt.one);
//     } else {
//         return null;
//     }
// }
// function addLiquidityLiquidityCreated(xtzIn, xtzPool, totalLiquidity, includeSubsidy) {
//     var xtzPool = xtzPool;
//     if (includeSubsidy) {
//         xtzPool = creditSubsidy(xtzPool);
//     }
//     var xtzIn_ = bigInt.zero;
//     var xtzPool_ = bigInt.zero;
//     var totalLiquidity_ = bigInt.zero;
//     try {
//         xtzIn_ = bigInt(xtzIn);
//         xtzPool_ = bigInt(xtzPool);
//         totalLiquidity_ = bigInt(totalLiquidity);
//     } catch (err) {
//         return null;
//     }
//     if (gtZero(xtzIn_) > 0 && gtZero(xtzPool_)) {
//         if (eqZero(totalLiquidity_)) {
//             return bigInt(xtzIn).times(bigInt(totalLiquidity)).divide(bigInt(xtzPool));
//         } else if (gtZero(totalLiquidity_)) {
//             return bigInt(xtzIn).times(bigInt(totalLiquidity)).divide(bigInt(xtzPool));
//         }
//         return null;
//     } else {
//         return null;
//     }
// }
// function addLiquidityTokenIn(xtzIn, xtzPool, tokenPool, includeSubsidy) {
//     var xtzPool = xtzPool;
//     if (includeSubsidy) {
//         xtzPool = creditSubsidy(xtzPool);
//     }
//     var xtzIn_ = bigInt.zero;
//     var xtzPool_ = bigInt.zero;
//     var tokenPool_ = bigInt.zero;
//     try {
//         xtzIn_ = bigInt(xtzIn);
//         xtzPool_ = bigInt(xtzPool);
//         tokenPool_ = bigInt(tokenPool);
//     } catch (err) {
//         return null;
//     }
//     if (gtZero(xtzIn_) > 0 && gtZero(xtzPool_) && gtZero(tokenPool_)) {
//         return ceilingDiv(xtzIn_.times(tokenPool_), xtzPool_);
//     } else {
//         return null;
//     }
// }
// function addLiquidityXtzIn(tokenIn, xtzPool, tokenPool, includeSubsidy) {
//     var xtzPool = xtzPool;
//     if (includeSubsidy) {
//         xtzPool = creditSubsidy(xtzPool);
//     }
//     var tokenIn_ = bigInt.zero;
//     var xtzPool_ = bigInt.zero;
//     var tokenPool_ = bigInt.zero;
//     try {
//         tokenIn_ = bigInt(tokenIn);
//         xtzPool_ = bigInt(xtzPool);
//         tokenPool_ = bigInt(tokenPool);
//     } catch (err) {
//         return null;
//     }
//     if (gtZero(tokenIn_) > 0 && gtZero(xtzPool_) && gtZero(tokenPool_)) {
//         return tokenIn_.times(xtzPool_).divide(tokenPool_);
//     } else {
//         return null;
//     }
// }
// function removeLiquidityTokenOut(liquidityBurned, totalLiquidity, tokenPool) {
//     var liquidityBurned_ = bigInt.zero;
//     var totalLiquidity_ = bigInt.zero;
//     var tokenPool_ = bigInt.zero;
//     try {
//         liquidityBurned_ = bigInt(liquidityBurned);
//         totalLiquidity_ = bigInt(totalLiquidity);
//         tokenPool_ = bigInt(tokenPool);
//     } catch (err) {
//         return null;
//     }
//     if (gtZero(liquidityBurned_) && gtZero(totalLiquidity_) && gtZero(tokenPool_)) {
//         return tokenPool_.times(liquidityBurned_).divide(totalLiquidity_);
//     } else {
//         return null;
//     }
// }
// function removeLiquidityXtzOut(liquidityBurned, totalLiquidity, xtzPool, includeSubsidy) {
//     var xtzPool = xtzPool;
//     if (includeSubsidy) {
//         xtzPool = creditSubsidy(xtzPool);
//     }
//     var liquidityBurned_ = bigInt.zero;
//     var totalLiquidity_ = bigInt.zero;
//     var xtzPool_ = bigInt.zero;
//     try {
//         liquidityBurned_ = bigInt(liquidityBurned);
//         totalLiquidity_ = bigInt(totalLiquidity);
//         xtzPool_ = bigInt(xtzPool);
//     } catch (err) {
//         return null;
//     }
//     if (gtZero(liquidityBurned_) && gtZero(totalLiquidity_) && gtZero(xtzPool_)) {
//         return xtzPool_.times(liquidityBurned_).divide(totalLiquidity_);
//     } else {
//         return null;
//     }
// }
