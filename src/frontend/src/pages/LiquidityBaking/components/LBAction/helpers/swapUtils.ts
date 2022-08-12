import { TezosToolkit } from '@taquito/taquito';
import BigNumber from 'bignumber.js'
import { ENVIRONMENT } from 'utils/consts';
import { tokenToXtzMinimumXtzOutput, tokenToXtzPriceImpact, tokenToXtzXtzOutput, xtzToTokenMinimumTokenOutput, xtzToTokenPriceImpact, xtzToTokenTokenOutput } from 'utils/DexSwapCalcs'

import { DEXType } from './const'

// const creditSubsidy = (xtzPool: BigNumber | number): BigNumber => {
//   const LIQUIDITY_BAKING_SUBSIDY = 2500000;
//   if (BigNumber.isBigNumber(xtzPool)) {
//     return xtzPool.plus(new BigNumber(LIQUIDITY_BAKING_SUBSIDY));
//   } else {
//     return new BigNumber(xtzPool).plus(new BigNumber(LIQUIDITY_BAKING_SUBSIDY));
//   }
// };

// export const tokenToXtzXtzOutput = (p: {
//   tokenIn: BigNumber | number;
//   xtzPool: BigNumber | number;
//   tokenPool: BigNumber | number;
// }): BigNumber | null => {
//   const { tokenIn, xtzPool: _xtzPool, tokenPool } = p;
//   let xtzPool = creditSubsidy(_xtzPool);
//   let tokenIn_ = new BigNumber(0);
//   let xtzPool_ = new BigNumber(0);
//   let tokenPool_ = new BigNumber(0);
//   try {
//     tokenIn_ = new BigNumber(tokenIn);
//     xtzPool_ = new BigNumber(xtzPool);
//     tokenPool_ = new BigNumber(tokenPool);
//   } catch (err) {
//     return null;
//   }
//   if (
//     tokenIn_.isGreaterThan(0) &&
//     xtzPool_.isGreaterThan(0) &&
//     tokenPool_.isGreaterThan(0)
//   ) {
//     // Includes 0.1% fee and 0.1% burn calculated separatedly:
//     // 999/1000 * 999/1000 = 998001/1000000
//     let numerator = new BigNumber(tokenIn)
//       .times(new BigNumber(xtzPool))
//       .times(new BigNumber(998001));
//     let denominator = new BigNumber(tokenPool)
//       .times(new BigNumber(1000000))
//       .plus(new BigNumber(tokenIn).times(new BigNumber(999000)));
//     return numerator.dividedBy(denominator);
//   } else {
//     return null;
//   }
// };

// // outputs the amount of tzBTC tokens for a given amount of XTZ
// export const xtzToTokenTokenOutput = (p: {
//   xtzIn: BigNumber | number;
//   xtzPool: BigNumber | number;
//   tokenPool: BigNumber | number;
// }): BigNumber | null => {
//   let { xtzIn, xtzPool: _xtzPool, tokenPool } = p;

//   let xtzPool = creditSubsidy(_xtzPool);
//   let xtzIn_ = new BigNumber(0);
//   let xtzPool_ = new BigNumber(0);
//   let tokenPool_ = new BigNumber(0);
//   try {
//     xtzIn_ = new BigNumber(xtzIn);
//     xtzPool_ = new BigNumber(xtzPool);
//     tokenPool_ = new BigNumber(tokenPool);
//   } catch (err) {
//     return null;
//   }
//   if (
//     xtzIn_.isGreaterThan(0) &&
//     xtzPool_.isGreaterThan(0) &&
//     tokenPool_.isGreaterThan(0)
//   ) {
//     // Includes 0.1% fee and 0.1% burn calculated separatedly: 999/1000 * 999/1000 = 998100/1000000
//     // (xtzIn_ * tokenPool_ * 999 * 999) / (tokenPool * 1000 - tokenOut * 999 * 999)
//     const numerator = xtzIn_.times(tokenPool_).times(new BigNumber(998001));
//     const denominator = xtzPool_
//       .times(new BigNumber(1000000))
//       .plus(xtzIn_.times(new BigNumber(998001)));
//     return numerator.dividedBy(denominator);
//   } else {
//     return null;
//   }
// };

// export const swapCalculateCoinReceive = (fromCoin: 'XTZ' | 'tzBTC', toCoin: 'XTZ' | 'tzBTC', coinIn: BigNumber | number, lbStats: {
//   xtzPool: BigNumber | number;
//   tokenPool: BigNumber | number;
// }) => {
//   // if(fromCoin === 'XTZ' && toCoin === 'tzBTC'){
//   //   return xtzToTokenTokenOutput({...lbStats, xtzIn: coinIn})
//   // }

//   // if(fromCoin === 'tzBTC' && toCoin === 'XTZ'){
//   //   return tokenToXtzXtzOutput({...lbStats, tokenIn: coinIn})
//   // }
//   return new BigNumber(0)
// }

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
  if (fromCoin === 'XTZ' && toCoin === 'tzBTC') {
    const expected = xtzToTokenTokenOutput(coinIn, xtzPool, tokenPool, dex.fee, dex.burn, dex.includeSubsidy)

    if (!expected) return { expected: 0, minimum: 0, priceImpact: 0 }

    const minimum = xtzToTokenMinimumTokenOutput(expected, maxSlippage)
    const priceImpact = xtzToTokenPriceImpact(coinIn, xtzPool, tokenPool, dex.fee, dex.burn, dex.includeSubsidy)

    console.log('output xtz=>tzbtc (expected, minimum, priceImpact)', expected, minimum, priceImpact)

    return { expected, minimum: minimum || 0, priceImpact: priceImpact || 0 }
  }

  if (fromCoin === 'tzBTC' && toCoin === 'XTZ') {
    const expected = tokenToXtzXtzOutput(coinIn, xtzPool, tokenPool, dex.fee, dex.burn, dex.includeSubsidy)

    if (!expected) return { expected: 0, minimum: 0, priceImpact: 0 }

    const minimum = tokenToXtzMinimumXtzOutput(expected, maxSlippage)
    const priceImpact = tokenToXtzPriceImpact(coinIn, xtzPool, tokenPool, dex.fee, dex.burn, dex.includeSubsidy)

    console.log('output tzbtc=>xtz (expected, minimum, priceImpact)', expected, minimum, priceImpact)

    return { expected, minimum: minimum || 0, priceImpact: priceImpact || 0 }
  }

  return { expected: 0, minimum: 0, priceImpact: 0 }
}
