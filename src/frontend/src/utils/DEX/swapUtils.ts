import {PRECISION_NUMBER_EIGHT_ZEROES, PRECISION_NUMBER_SIX_ZEROES} from '../consts'
// @ts-ignore
import dexterCalculations from 'dex-calcs/dist/index-mobile.min'
import BigNumber from 'bignumber.js'

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
  let _xtzToSell = new BigNumber(xtzToSell * PRECISION_NUMBER_SIX_ZEROES),
    _xtzPool = new BigNumber(xtzPool * PRECISION_NUMBER_SIX_ZEROES),
    _tokenPool = new BigNumber(tokenPool * PRECISION_NUMBER_EIGHT_ZEROES)

  const expectedTokenReceived = xtzToTokenExpectedReturn(_xtzToSell, _xtzPool, _tokenPool, dex)
  const minimumReceived = xtzToTokenMinimumReturn(expectedTokenReceived, maxSlippage)
  const exchangeRate = xtzToTokenExchangeRateDisplay(_xtzToSell, _xtzPool, _tokenPool, dex)
  const priceImpact = xtzToTokenPriceImpact(_xtzToSell, _xtzPool, _tokenPool, dex)
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
    return new BigNumber(0)
  }
  const result = dexterCalculations.xtzToTokenMinimumTokenOutput(expectedReturn.toString(), maxSlippage)
  return new BigNumber(result && result.gt(0) ? result : 0)
}

export function xtzToTokenExchangeRateDisplay(
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
  const result = dexterCalculations.xtzToTokenPriceImpact(
    xtzToSell.toNumber(),
    xtzPool.toNumber(),
    tokenPool.toNumber(),
    dex.burn,
  )
  return result ? Number(result) : 0
}

/**
 *  tzBTC -> XTZ swap functions
 */

/**
 * tzBTC -> XTZ Swap main function entrypoint
 *
 * @param tokenToSell
 * @param xtzPool
 * @param tokenPool
 * @param maxSlippage
 * @param dex
 */
export function calculateTokenToXtz(
  tokenToSell: number,
  xtzPool: number,
  tokenPool: number,
  maxSlippage: number,
  dex: { fee: number; burn: number; includeSubsidy: boolean },
): { expected: number; minimum: number; rate: number; priceImpact: number } {
  let _tokenToSell = new BigNumber(Math.round(tokenToSell * PRECISION_NUMBER_EIGHT_ZEROES)),
    _xtzPool = new BigNumber(xtzPool * PRECISION_NUMBER_SIX_ZEROES),
    _tokenPool = new BigNumber(tokenPool * PRECISION_NUMBER_EIGHT_ZEROES)
  const expectedXtzReceived = tokenToXtzExpectedReturn(_tokenToSell, _xtzPool, _tokenPool, dex)
  const minimumReceived = tokenToXtzMinimumReturn(expectedXtzReceived, maxSlippage)
  const exchangeRate = tokenToXtzExchangeRateDisplay(_tokenToSell, _xtzPool, _tokenPool, dex)
  const priceImpact = tokenToXtzPriceImpact(_tokenToSell, _xtzPool, _tokenPool, dex)
  return {
    expected: expectedXtzReceived.toNumber() / PRECISION_NUMBER_SIX_ZEROES,
    minimum: minimumReceived.toNumber() / PRECISION_NUMBER_SIX_ZEROES,
    rate: exchangeRate,
    priceImpact: priceImpact,
  }
}

function tokenToXtzExpectedReturn(
  tokenToSell: BigNumber,
  xtzPool: BigNumber,
  tokenPool: BigNumber,
  dex: { fee: number; burn: number; includeSubsidy: boolean },
): BigNumber {
  const result = dexterCalculations.tokenToXtzXtzOutput(
    tokenToSell.toString(),
    xtzPool.toString(),
    tokenPool.toString(),
    dex.fee.toString(),
    dex.burn.toString(),
  )
  return new BigNumber(result && result.gt(0) ? result : 0)
}

function tokenToXtzMinimumReturn(expectedReturn: BigNumber, maxSlippage: number): BigNumber {
  if (maxSlippage < 0 || maxSlippage > 1) {
    return new BigNumber(0)
  }
  const result = dexterCalculations.tokenToXtzMinimumXtzOutput(expectedReturn.toString(), maxSlippage)
  return new BigNumber(result && result.gt(0) ? result : 0)
}

function tokenToXtzExchangeRateDisplay(
  tokenToSell: BigNumber,
  xtzPool: BigNumber,
  tokenPool: BigNumber,
  dex: { fee: number; burn: number; includeSubsidy: boolean },
): number {
  const result = dexterCalculations.tokenToXtzExchangeRateForDisplay(
    tokenToSell.toString(),
    xtzPool.toString(),
    tokenPool.toString(),
    8,
    dex.fee,
    dex.burn,
  )
  return result ? Number(result) : 0
}

function tokenToXtzPriceImpact(
  tokenToSell: BigNumber,
  xtzPool: BigNumber,
  tokenPool: BigNumber,
  dex: { fee: number; burn: number; includeSubsidy: boolean },
): number {
  const result = dexterCalculations.xtzToTokenPriceImpact(
    tokenToSell.toNumber(),
    xtzPool.toNumber(),
    tokenPool.toNumber(),
    dex.burn,
  )
  return result ? Number(result) : 0
}
