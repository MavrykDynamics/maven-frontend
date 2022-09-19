import BigNumber from 'bignumber.js'
/**
 * Many export functions use {(BigNumber|number)} as parameter. These parameters
 * are converted into new BigNumber from the big-integer package and are expected to
 * to be non-negative numbers. string should be a string encoded integer. If you
 * are interfacing this project from another programming language, you should
 * pass the value for the parameter in {(BigNumber|number)} as a string to
 * avoid number size restrictions in JavaScript.
 */

/**
 * =============================================================================
 * Internal utility export functions
 * =============================================================================
 */

/**
 * Test if a BigNumber is greater than zero.
 *
 * @param {BigNumber} x
 * @returns {boolean} x > 0
 */
export function gtZero(x: number | BigNumber) {
  return x > 0
}

/**
 * Test if a BigNumber is greater than or equal to zero.
 *
 * @param {BigNumber} x
 * @returns {boolean} x >= 0
 */
export function geqZero(x: number | BigNumber) {
  return x >= 0
}

/**
 * Test if a BigNumber is equal to zero.
 *
 * @param {BigNumber} x
 * @returns {boolean} x == 0
 */
export function eqZero(x: number | BigNumber) {
  return x === 0
}

/**
 * Test if a BigNumber is less than or equal to zero.
 *
 * @param {BigNumber} x
 * @returns {boolean} x <= 0
 */
export function leqZero(x: number | BigNumber) {
  return x <= 0
}

/**
 * Ceiling division. If the remainder is greater than zero, increment by one.
 *
 * @param {new BigNumber} x
 * @param {new BigNumber} y
 * @returns {boolean} if rem(x,y) > 0 then (x/y+1) else (x/y)
 */
export function ceilingDiv(x: number, y: number) {
  const result = x % y
  if (result > 0) {
    return x / y + 1
  }
  return x / y
}

/**
 * Updates xtzPool with the 2.5 tez subsidy. Since this is applied before all other operations it can be assumed to have been applied at least once for any call to the CPMM.
 *
 * @param {new BigNumber} xtzPool
 * @returns {new BigNumber} xtzPool + 2_500_000
 */
export function creditSubsidy(xtzPool: number | BigNumber) {
  return new BigNumber(xtzPool).plus(new BigNumber(2500000))
}

/**
 * =============================================================================
 * xtzToToken entrypoint export functions
 * =============================================================================
 */

type DexCalcInputParam = BigNumber | number
/**
 * Calculate the amount of token sold for a given XTZ input and Dexter's two pool
 * values for the dexter xtzToToken entrypoint.
 *
 * @param {(BigNumber|number)} xtzIn - XTZ amount the sender sells to Dexter. Must be greater than zero.
 * @param {(BigNumber|number)} xtzPool - XTZ amount that Dexter holds. Must be greater than zero.
 * @param {(BigNumber|number)} tokenPool - Token amount that Dexter holds. Must be greater than zero.
 * @returns {(BigNumber|null)} The amount of token that Dexter will send to the :to address in the dexter xtzToToken entrypoint.
 */
export function xtzToTokenTokenOutput(
  xtzIn: DexCalcInputParam,
  xtzPool: DexCalcInputParam,
  tokenPool: DexCalcInputParam,
) {
  let _xtzPool = creditSubsidy(xtzPool)
  let xtzIn_ = new BigNumber(0)
  let xtzPool_ = new BigNumber(0)
  let tokenPool_ = new BigNumber(0)
  try {
    xtzIn_ = new BigNumber(xtzIn)
    xtzPool_ = new BigNumber(_xtzPool)
    tokenPool_ = new BigNumber(tokenPool)
  } catch (err) {
    return null
  }
  if (gtZero(xtzIn_) && gtZero(xtzPool_) && gtZero(tokenPool_)) {
    // Includes 0.1% fee and 0.1% burn calculated separatedly: 999/1000 * 999/1000 = 998100/1000000
    // (xtzIn_ * tokenPool_ * 999 * 999) / (tokenPool * 1000 - tokenOut * 999 * 999)
    let numerator = xtzIn_.times(tokenPool_).times(new BigNumber(998001))
    let denominator = xtzPool_.times(new BigNumber(1000000)).plus(xtzIn_.times(new BigNumber(998001)))
    return numerator.div(denominator)
  } else {
    return null
  }
}

/**
 * Calculate the amount of XTZ you must pay in in order to receive a target
 * amount of token for a given in the two Dexter pools. tokenOut is considered the
 * maximum amount a user may receive. The user may receive less because of slippage.
 *
 * @param {(BigNumber|number)} tokenOut - The amount of token that a user wants to receive. Must be greater than zero.
 * @param {(BigNumber|number)} xtzPool - XTZ amount that Dexter holds. Must be greater than zero.
 * @param {(BigNumber|number)} tokenPool - Token amount that Dexter holds. Must be greater than zero.
 * @returns {(BigNumber|null)} The amount of XTZ the user must send to xtzToToken to get the tokenOut amount.
 */
export function xtzToTokenXtzInput(
  tokenOut: DexCalcInputParam,
  xtzPool: DexCalcInputParam,
  tokenPool: DexCalcInputParam,
) {
  const decimals = new BigNumber(8)
  let _xtzPool = creditSubsidy(xtzPool)

  let tokenOut_ = new BigNumber(0)
  let xtzPool_ = new BigNumber(0)
  let tokenPool_ = new BigNumber(0)
  try {
    tokenOut_ = new BigNumber(tokenOut)
    xtzPool_ = new BigNumber(_xtzPool)
    tokenPool_ = new BigNumber(tokenPool)
  } catch (err) {
    return null
  }

  if (gtZero(tokenOut_) && gtZero(xtzPool_) && gtZero(tokenPool_) && geqZero(decimals)) {
    // Includes 0.1% fee and 0.1% burn calculated separatedly: 999/1000 * 999/1000 = 998100/1000000
    // (xtzPool_ * tokenOut_ * 1000 * 1000 * 10 ** decimals) / (tokenPool - tokenOut * 999 * 999 * 10 ** decimals))
    const result = xtzPool_
      .times(tokenOut_)
      .times(new BigNumber(1000000))
      .times(Math.pow(10, decimals.toNumber()))
      .div(tokenPool_.minus(tokenOut_).times(new BigNumber(998001).times(Math.pow(10, decimals.toNumber()))))

    if (gtZero(result)) {
      return result
    }
    return null
  } else {
    return null
  }
}

/**
 * Calculate the exchange rate for an XTZ to Token trade including the 0.1% fee given
 * to the liquidity providers and the penalty for trade size.
 *
 * @param {(BigNumber|number)} xtzIn - XTZ amount the sender sells to Dexter. Must be greater than zero.
 * @param {(BigNumber|number)} xtzPool - XTZ amount that Dexter holds. Must be greater than zero.
 * @param {(BigNumber|number)} tokenPool - Token amount that Dexter holds. Must be greater than zero.
 * @returns {(number|null)} The exchange rate as a float number.
 */
export function xtzToTokenExchangeRate(
  xtzIn: DexCalcInputParam,
  xtzPool: DexCalcInputParam,
  tokenPool: DexCalcInputParam,
) {
  let xtzIn_ = new BigNumber(0)
  let xtzPool_ = new BigNumber(0)
  let tokenPool_ = new BigNumber(0)
  try {
    xtzIn_ = new BigNumber(xtzIn)
    xtzPool_ = new BigNumber(xtzPool)
    tokenPool_ = new BigNumber(tokenPool)
  } catch (err) {
    return null
  }
  if (gtZero(xtzIn_) && gtZero(xtzPool_) && gtZero(tokenPool_)) {
    const xtzToTokenTokenOutputResult = xtzToTokenTokenOutput(xtzIn_, xtzPool_, tokenPool_)
    if (!xtzToTokenTokenOutputResult) return null
    return xtzToTokenTokenOutputResult.toNumber() / xtzIn_.toNumber()
  } else {
    return null
  }
}

/**
 * Same as xtzToTokenExchangeRate but adjusted for the decimal places.
 *
 * @param {(BigNumber|number)} xtzIn - XTZ amount the sender sells to Dexter. Must be greater than zero.
 * @param {(BigNumber|number)} xtzPool - XTZ amount that Dexter holds. Must be greater than zero.
 * @param {(BigNumber|number)} tokenPool - Token amount that Dexter holds. Must be greater than zero.
 * @returns {(number|null)} The exchange rate as a float number.
 */
export function xtzToTokenExchangeRateForDisplay(
  xtzIn: DexCalcInputParam,
  xtzPool: DexCalcInputParam,
  tokenPool: DexCalcInputParam,
) {
  let decimals = 8

  let xtzIn_ = new BigNumber(0)
  let xtzPool_ = new BigNumber(0)
  let tokenPool_ = new BigNumber(0)
  try {
    xtzIn_ = new BigNumber(xtzIn)
    xtzPool_ = new BigNumber(xtzPool)
    tokenPool_ = new BigNumber(tokenPool)
  } catch (err) {
    return null
  }
  if (gtZero(xtzIn_) && gtZero(xtzPool_) && gtZero(tokenPool_)) {
    const xtzToTokenTokenOutputResult = xtzToTokenTokenOutput(xtzIn_, xtzPool_, tokenPool_)
    if (!xtzToTokenTokenOutputResult) return null
    return (xtzToTokenTokenOutputResult.toNumber() * Math.pow(10, -decimals)) / (xtzIn_.toNumber() * Math.pow(10, -6))
  } else {
    return null
  }
}

/**
 * Calculate the xtzToToken market rate for a give Dexter contract. The market
 * rate is an ideal number that doesn't include fees or penalties. In practice,
 * this rate  cannot be executed. This is used for displaying an exchange rate
 * without the trade size penalty (before a user enters an amount for display).
 *
 * @param {(BigNumber|number)} xtzPool - XTZ amount that Dexter holds. Must be greater than zero.
 * @param {(BigNumber|number)} tokenPool - Token amount that Dexter holds. Must be greater than zero.
 * @param {(BigNumber|number)} decimals - The number of decimals a token has. Must be greater than or equal to zero.
 * @returns {(number|null)} The market rate as a float value.
 */
export function xtzToTokenMarketRate(xtzPool: DexCalcInputParam, tokenPool: DexCalcInputParam, decimals: number) {
  let xtzPool_ = new BigNumber(0)
  let tokenPool_ = new BigNumber(0)
  const decimals_ = new BigNumber(decimals > 0 ? decimals : 0)
  try {
    xtzPool_ = new BigNumber(xtzPool)
    tokenPool_ = new BigNumber(tokenPool)
  } catch (err) {
    return null
  }
  if (gtZero(xtzPool_) && gtZero(tokenPool_) && geqZero(decimals_)) {
    const xtzPool__ = xtzPool_.toNumber() * Math.pow(10, -6)
    const tokenPool__ = tokenPool_.toNumber() * Math.pow(10, -decimals_)
    return tokenPool__ / xtzPool__
  } else {
    return null
  }
}

/**
 * Calculate the xtzToToken price impact for a given Dexter contract. Price
 * impact is a measure of how much a trade will alter the future price.
 *
 * @param {(BigNumber|number)} xtzIn - The amount of XTZ the sender will sell to Dexter in xtzToToken.
 * @param {(BigNumber|number)} xtzPool - XTZ amount that Dexter holds. Must be greater than zero.
 * @param {(BigNumber|number)} tokenPool - Token amount that Dexter holds. Must be greater than zero.
 * @returns {(number|null)} - The price impact percentage as a float value.
 */
export function xtzToTokenPriceImpact(
  xtzIn: DexCalcInputParam,
  xtzPool: DexCalcInputParam,
  tokenPool: DexCalcInputParam,
) {
  let _xtzPool = creditSubsidy(xtzPool)
  let xtzIn_ = new BigNumber(0)
  let xtzPool_ = new BigNumber(0)
  let tokenPool_ = new BigNumber(0)
  try {
    xtzIn_ = new BigNumber(xtzIn)
    xtzPool_ = new BigNumber(_xtzPool)
    tokenPool_ = new BigNumber(tokenPool)
  } catch (err) {
    return null
  }
  if (gtZero(xtzIn_) && gtZero(xtzPool_) && gtZero(tokenPool_)) {
    const midPrice = tokenPool_.toNumber() / xtzPool_.toNumber()
    const xtzInNetBurn = xtzIn_.times(999).div(1000)
    const tokensBought = xtzInNetBurn.times(tokenPool_).div(xtzInNetBurn.plus(xtzPool_))
    // if no tokens have been purchased then there is no price impact
    if (leqZero(tokensBought)) {
      return 0
    }
    const exactQuote = midPrice * xtzIn_.toNumber()
    return (exactQuote - tokensBought.toNumber()) / exactQuote
  } else {
    return null
  }
}

/**
 * Calculate the minimum token out to be sent to Dexter for a given max tokenOut
 * and the max allowed slippage rate the user accepts. If the exchange rate
 * has lowered less than the user's allowed slippage at the time of execution,
 * then the trade will fail.
 *
 * @param {(BigNumber|number|)} tokenOut - Token out as calculated by xtzToTokenTokenOut. Must be greater than zero.
 * @param {number} allowedSlippage - Maximum slippage rate that a user will except for an exchange. Must be between 0.00 and 1.00.
 * @returns {(BigNumber|null)} The minimum token amount to send to the xtzToToken entrypoint.
 */
export function xtzToTokenMinimumTokenOutput(tokenOut: DexCalcInputParam, allowedSlippage: number) {
  if (tokenOut > 0 && allowedSlippage >= 0.0 && allowedSlippage <= 1.0) {
    // ((tokenOut * 1000) - ((tokenOut * 1000) * (allowedSlippage * 100000) / 100000)) / 1000
    const tokenOut_ = new BigNumber(tokenOut).times(new BigNumber(1000))
    const allowedSlippage_ = new BigNumber(Math.floor(allowedSlippage * 1000 * 100))
    const result = tokenOut_.minus(tokenOut_.times(allowedSlippage_).div(new BigNumber(100000))).div(1000)
    return new BigNumber(Math.max(result.toNumber(), 1))
  } else {
    return null
  }
}

/**
 * Calculate the fee that liquidity providers, as a whole and not individually,
 * will receive for a given amount of XTZ sold to a dexter contract.
 *
 * @param {(BigNumber|number)} xtzIn The amount of XTZ sold to dexter. Must be greater than zero.
 * @returns {(number|null)} The fee paid to the dexter liquidity providers.
 */
export function totalLiquidityProviderFee(xtzIn: DexCalcInputParam) {
  let xtzIn_ = new BigNumber(0)
  try {
    xtzIn_ = new BigNumber(xtzIn)
  } catch (err) {
    return null
  }
  if (gtZero(xtzIn_)) {
    return new BigNumber(xtzIn_).times(new BigNumber(1)).div(1000)
  } else {
    return null
  }
}

/**
 * Calculate the fee that a single liquidity provider will receive for a given amount of
 * XTZ sold to a dexter contract.
 *
 * @param {(BigNumber|number)} xtzIn - The amount of XTZ sold to dexter. Must be greater than zero.
 * @param {(BigNumber|number)} totalLiquidity
 * @param {(BigNumber|number)} userLiquidity
 * @returns {(number|null)} The fee paid to an individual dexter liquidity provider.
 */
export function liquidityProviderFee(
  xtzIn: DexCalcInputParam,
  totalLiquidity: DexCalcInputParam,
  userLiquidity: DexCalcInputParam,
) {
  let xtzIn_ = new BigNumber(0)
  let totalLiquidity_ = new BigNumber(0)
  let userLiquidity_ = new BigNumber(0)
  try {
    xtzIn_ = new BigNumber(xtzIn)
    totalLiquidity_ = new BigNumber(totalLiquidity)
    userLiquidity_ = new BigNumber(userLiquidity)
  } catch (err) {
    return null
  }
  if (gtZero(xtzIn_) && gtZero(totalLiquidity_) && gtZero(userLiquidity_)) {
    return totalLiquidityProviderFee(xtzIn)?.div(totalLiquidity_.div(userLiquidity))
  } else {
    return null
  }
}

/**
 * =============================================================================
 * tokenToXtz entrypoint export functions
 * =============================================================================
 */

/**
 * Get the amount of XTZ sold for a given token input and the pool state of Dexter
 * for the Dexter tokenToXtz entrypoint.
 *
 * @param {(BigNumber|number)} tokenIn - Token amount the sender sells to Dexter. Must be greater than zero.
 * @param {(BigNumber|number)} xtzPool - XTZ amount that Dexter holds. Must be greater than zero.
 * @param {(BigNumber|number)} tokenPool - Token amount that Dexter holds. Must be greater than zero.
 * @returns {(BigNumber|null)} The amount of XTZ that Dexter will send to the :to
 * address in the dexter tokenToXtz entrypoint.
 */
export function tokenToXtzXtzOutput(
  tokenIn: DexCalcInputParam,
  xtzPool: DexCalcInputParam,
  tokenPool: DexCalcInputParam,
) {
  let _xtzPool = creditSubsidy(xtzPool)
  let tokenIn_ = new BigNumber(0)
  let xtzPool_ = new BigNumber(0)
  let tokenPool_ = new BigNumber(0)
  try {
    tokenIn_ = new BigNumber(tokenIn)
    xtzPool_ = new BigNumber(_xtzPool)
    tokenPool_ = new BigNumber(tokenPool)
  } catch (err) {
    return null
  }
  if (gtZero(tokenIn_) && gtZero(xtzPool_) && gtZero(tokenPool_)) {
    // Includes 0.1% fee and 0.1% burn calculated separatedly: 999/1000 * 999/1000 = 998100/1000000
    const numerator = new BigNumber(tokenIn).times(new BigNumber(xtzPool_)).times(new BigNumber(998001))
    const denominator = new BigNumber(tokenPool)
      .times(new BigNumber(1000000))
      .plus(new BigNumber(tokenIn).times(new BigNumber(999000)))
    return numerator.div(denominator)
  } else {
    return null
  }
}

/**
 * Calculate the amount of token you must pay in in order to receive a target
 * amount of XTZ for a given Dexter pool state. xtzOut is considered the
 * maximum amount a user may receive. The user may receive less because of slippage.
 *
 * @param {(BigNumber|number)} xtzOut - The amount of token that a user wants to receive. Must be greater than zero.
 * @param {(BigNumber|number)} xtzPool - XTZ amount that Dexter holds. Must be greater than zero.
 * @param {(BigNumber|number)} tokenPool - Token amount that Dexter holds. Must be greater than zero.
 * @param {(BigNumber|number)} decimals - The number of decimals a token has. Must be greater than or equal to zero.
 * @returns {(BigNumber|null)} The amount of token the user must send to tokenToXtz to get the xtzOut amount.
 */
export function tokenToXtzTokenInput(
  xtzOut: DexCalcInputParam,
  xtzPool: DexCalcInputParam,
  tokenPool: DexCalcInputParam,
) {
  let decimals = 8
  let _xtzPool = creditSubsidy(xtzPool)

  let xtzOut_ = new BigNumber(0)
  let xtzPool_ = new BigNumber(0)
  let tokenPool_ = new BigNumber(0)
  let decimals_ = new BigNumber(0)
  try {
    xtzOut_ = new BigNumber(xtzOut)
    xtzPool_ = new BigNumber(_xtzPool)
    tokenPool_ = new BigNumber(tokenPool)
    decimals_ = new BigNumber(decimals)
  } catch (err) {
    return null
  }
  if (gtZero(xtzOut_) && gtZero(xtzPool_) && gtZero(tokenPool_) && geqZero(decimals_)) {
    // Includes 0.1% fee and 0.1% burn calculated separately: 999/1000 * 999/1000 = 998100/1000000
    // (tokenPool_ * xtzOut_ * 1000 * 1000 * 10 ** decimals) / ((xtzPool * 999 * 1000 - xtzOut * 999 * 999) * 10 ** decimals))
    let result = tokenPool_
      .times(xtzOut_)
      .times(new BigNumber(1000000))
      .times(Math.pow(10, decimals_.toNumber()))
      .div(
        xtzPool_
          .times(new BigNumber(999000))
          .minus(xtzOut_.times(new BigNumber(998001)))
          .times(Math.pow(10, decimals_.toNumber())),
      )

    if (gtZero(result)) {
      return result
    }
    return null
  } else {
    return null
  }
}

/**
 * Calculate the exchange rate for a token to XTZ trade including the 0.1% fee given
 * to the liquidity providers and the penalty for large trades.
 *
 * @param {(BigNumber|number)} tokenIn - Token amount the sender sells to Dexter. Must be greater than zero.
 * @param {(BigNumber|number)} xtzPool - XTZ amount that Dexter holds. Must be greater than zero.
 * @param {(BigNumber|number)} tokenPool - Token amount that Dexter holds. Must be greater than zero.
 * @returns {(number|null)} The exchange rate as a float number.
 */
export function tokenToXtzExchangeRate(
  tokenIn: DexCalcInputParam,
  xtzPool: DexCalcInputParam,
  tokenPool: DexCalcInputParam,
) {
  let tokenIn_ = new BigNumber(0)
  let xtzPool_ = new BigNumber(0)
  let tokenPool_ = new BigNumber(0)
  try {
    tokenIn_ = new BigNumber(tokenIn)
    xtzPool_ = new BigNumber(xtzPool)
    tokenPool_ = new BigNumber(tokenPool)
  } catch (err) {
    return null
  }
  if (gtZero(tokenIn_) && gtZero(xtzPool_) && gtZero(tokenPool_)) {
    const tokenToXtzXtzOutputResult = tokenToXtzXtzOutput(tokenIn_, xtzPool_, tokenPool_)
    if (!tokenToXtzXtzOutputResult) return null
    return tokenToXtzXtzOutputResult.toNumber() / tokenIn_.toNumber()
  } else {
    return null
  }
}

/**
 * Same as tokenToXtzExchangeRate but adjusted for the decimal places.
 *
 * @param {(BigNumber|number)} tokenIn - Token amount the sender sells to Dexter. Must be greater than zero.
 * @param {(BigNumber|number)} xtzPool - XTZ amount that Dexter holds. Must be greater than zero.
 * @param {(BigNumber|number)} tokenPool - Token amount that Dexter holds. Must be greater than zero.
 * @returns {(number|null)} The exchange rate as a float number.
 */
export function tokenToXtzExchangeRateForDisplay(
  tokenIn: DexCalcInputParam,
  xtzPool: DexCalcInputParam,
  tokenPool: DexCalcInputParam,
) {
  let decimals = 8

  let tokenIn_ = new BigNumber(0)
  let xtzPool_ = new BigNumber(0)
  let tokenPool_ = new BigNumber(0)
  try {
    tokenIn_ = new BigNumber(tokenIn)
    xtzPool_ = new BigNumber(xtzPool)
    tokenPool_ = new BigNumber(tokenPool)
  } catch (err) {
    return null
  }
  if (gtZero(tokenIn_) && gtZero(xtzPool_) && gtZero(tokenPool_)) {
    const tokenToXtzXtzOutputResult = tokenToXtzXtzOutput(tokenIn_, xtzPool_, tokenPool_)
    if (!tokenToXtzXtzOutputResult) return null
    return (tokenToXtzXtzOutputResult.toNumber() * Math.pow(10, -6)) / (tokenIn_.toNumber() * Math.pow(10, -decimals))
  } else {
    return null
  }
}

/**
 * Calculate the tokenToXtz market rate for a given Dexter contract. The market
 * rate is an ideal number that doesn't include fees or penalties. In practice,
 * this rate cannot be executed. This is used for displaying an exchange rate
 * without the trade size penalty (before a user enters an amount for display).
 *
 * @param {(BigNumber|number)} xtzPool - XTZ amount that Dexter holds. Must be greater than zero.
 * @param {(BigNumber|number)} tokenPool - Token amount that Dexter holds. Must be greater than zero.
 * @param {(BigNumber|number)} decimals - The number of decimals a token has. Must be greater than or equal to zero.
 * @returns {(number|null)} The market rate as a float value.
 */
export function tokenToXtzMarketRate(xtzPool: DexCalcInputParam, tokenPool: DexCalcInputParam) {
  let decimals = 8
  let xtzPool_ = new BigNumber(0)
  let tokenPool_ = new BigNumber(0)
  let decimals_ = new BigNumber(0)
  try {
    xtzPool_ = new BigNumber(xtzPool)
    tokenPool_ = new BigNumber(tokenPool)
    decimals_ = new BigNumber(decimals)
  } catch (err) {
    return null
  }
  if (gtZero(xtzPool_) && gtZero(tokenPool_) && geqZero(decimals_)) {
    let xtzPool__ = xtzPool_.toNumber() * Math.pow(10, -6)
    let tokenPool__ = tokenPool_.toNumber() * Math.pow(10, -decimals_)
    return xtzPool__ / tokenPool__
  } else {
    return null
  }
}

/**
 * Calculate the tokenToXtz price impact for a give Dexter contract. Price
 * impact is a measure of how much a trade will alter the future price.
 *
 * @param {(BigNumber|number)} tokenIn - The amount of Token the sender will sell to Dexter in tokenToXtz.
 * @param {(BigNumber|number)} xtzPool - XTZ amount that Dexter holds. Must be greater than zero.
 * @param {(BigNumber|number)} tokenPool - Token amount that Dexter holds. Must be greater than zero.
 * @returns {(number|null)} - The price impact percentage as a float value.
 */
export function tokenToXtzPriceImpact(
  tokenIn: DexCalcInputParam,
  xtzPool: DexCalcInputParam,
  tokenPool: DexCalcInputParam,
) {
  let _xtzPool = creditSubsidy(xtzPool)
  let tokenIn_ = new BigNumber(0)
  let xtzPool_ = new BigNumber(0)
  let tokenPool_ = new BigNumber(0)
  try {
    tokenIn_ = new BigNumber(tokenIn)
    xtzPool_ = new BigNumber(_xtzPool)
    tokenPool_ = new BigNumber(tokenPool)
  } catch (err) {
    return null
  }
  if (gtZero(tokenIn_) && gtZero(xtzPool_) && gtZero(tokenPool_)) {
    let midPrice = xtzPool_.toNumber() / tokenPool_.toNumber()
    let xtzBought = tokenIn_.times(xtzPool_).div(tokenIn_.plus(tokenPool_))
    let xtzBoughtNetBurn = xtzBought.times(new BigNumber(999)).div(new BigNumber(1000))
    // if no tokens have been purchased then there is no price impact
    if (leqZero(xtzBoughtNetBurn)) {
      return 0
    }
    let exactQuote = midPrice * tokenIn_.toNumber()
    return (exactQuote - xtzBoughtNetBurn.toNumber()) / exactQuote
  } else {
    return null
  }
}

/**
 * Calculate the minimum token out to be sent to dexter for a given max xtzOut
 * and the max allowed slippage rate the user accepts.  If the exchange rate
 * has lowered less than the user's allowed slippage at the time of execution,
 * then the trade will fail.
 *
 * @param {(BigNumber|number)} xtzOut - XTZ out as calculated by tokenToXtzTokenOut. Must be greater than zero.
 * @param {number} allowedSlippage - Maximum slippage rate that a user will except for an exchange. Must be between 0.00 and 1.00.
 * @returns {(BigNumber|null)} The minimum token amount to send to the tokenToXtz entrypoint.
 */
export function tokenToXtzMinimumXtzOutput(xtzOut: DexCalcInputParam, allowedSlippage: number) {
  if (xtzOut > 0 && allowedSlippage >= 0.0 && allowedSlippage <= 1.0) {
    // ((xtzOut * 1000) - ((xtzOut * 1000) * (allowedSlippage * 100000) / 100000)) / 1000
    let xtzOut_ = new BigNumber(xtzOut).times(new BigNumber(1000))
    let allowedSlippage_ = new BigNumber(Math.floor(allowedSlippage * 1000 * 100))
    let result = xtzOut_.minus(xtzOut_.times(allowedSlippage_).div(new BigNumber(100000))).div(1000)
    return new BigNumber(Math.max(result.toNumber(), 1))
  } else {
    return null
  }
}

/**
 * =============================================================================
 * addLiquidity entrypoint export functions
 * =============================================================================
 */

/**
 * Get the amount of liquidity created and rewarded given an XTZ input,
 * the current liquidity in Dexter and the amount of XTZ held by Dexter.
 * Note that the token amount does not affect the liquidity.
 *
 * @param {(BigNumber|number)} xtzIn - XTZ amount the sender gives to Dexter for liquidity. Must be greater than zero.
 * @param {(BigNumber|number)} xtzPool - XTZ amount that Dexter holds.  Must be greater than zero.
 * @param {(BigNumber|number)} totalLiquidity - Total amount of liquidity in a Dexter pool. Must be greater than or equal to zero.
 * @returns {(BigNumber|null)} The amount of liquidity that the sender gains.
 */
export function addLiquidityLiquidityCreated(
  xtzIn: DexCalcInputParam,
  xtzPool: DexCalcInputParam,
  totalLiquidity: DexCalcInputParam,
) {
  let _xtzPool = creditSubsidy(xtzPool)
  let xtzIn_ = new BigNumber(0)
  let xtzPool_ = new BigNumber(0)
  let totalLiquidity_ = new BigNumber(0)
  try {
    xtzIn_ = new BigNumber(xtzIn)
    xtzPool_ = new BigNumber(_xtzPool)
    totalLiquidity_ = new BigNumber(totalLiquidity)
  } catch (err) {
    return null
  }
  if (gtZero(xtzIn_) && gtZero(xtzPool_)) {
    if (eqZero(totalLiquidity_)) {
      return new BigNumber(xtzIn).times(new BigNumber(totalLiquidity)).div(new BigNumber(xtzPool))
    } else if (gtZero(totalLiquidity_)) {
      return new BigNumber(xtzIn).times(new BigNumber(totalLiquidity)).div(new BigNumber(xtzPool))
    }
    return null
  } else {
    return null
  }
}

/**
 * For a given amount of xtzIn and the state of the Dexter xtz pool and token
 * pool. Calculate the minimum amount of tokens the user would be required
 * to deposit. If totalLiquidity is zero then sender must deposit at least one
 * XTZ (1,000,000 mutez) and one token. The exchange rate is not set.
 *
 * @param {(BigNumber|number)} xtzIn - XTZ amount the sender gives to Dexter for liquidity. Must be greater than zero.
 * @param {(BigNumber|number)} xtzPool - XTZ amount that Dexter holds. Must be greater than zero.
 * @param {(BigNumber|number)} tokenPool - Token amount that Dexter holds. Must be greater than zero.
 * @returns {(BigNumber|null)} The amount of liquidity that the sender gains.
 */
export function addLiquidityTokenIn(
  xtzIn: DexCalcInputParam,
  xtzPool: DexCalcInputParam,
  tokenPool: DexCalcInputParam,
) {
  let _xtzPool = creditSubsidy(xtzPool)
  let xtzIn_ = new BigNumber(0)
  let xtzPool_ = new BigNumber(0)
  let tokenPool_ = new BigNumber(0)
  try {
    xtzIn_ = new BigNumber(xtzIn)
    xtzPool_ = new BigNumber(_xtzPool)
    tokenPool_ = new BigNumber(tokenPool)
  } catch (err) {
    return null
  }
  if (gtZero(xtzIn_) && gtZero(xtzPool_) && gtZero(tokenPool_)) {
    // cdiv(xtzIn_ * tokenPool_, xtzPool_)
    return ceilingDiv(xtzIn_.times(tokenPool_).toNumber(), xtzPool_.toNumber())
  } else {
    return null
  }
}

/**
 * For a given amount of tokenIn and the state of the Dexter xtz pool and token
 * pool. Calculate the minimum amount of XTZ the user would be required
 * to deposit. If totalLiquidity is zero then sender must deposit at least one
 * XTZ (1,000,000 mutez) and one token. The exchange rate is not set.
 *
 * @param {(BigNumber|number)} tokenIn - Token amount the sender gives to Dexter for liquidity.
 * @param {(BigNumber|number)} xtzPool - XTZ amount that Dexter holds.
 * @param {(BigNumber|number)} tokenPool Token amount that Dexter holds.
 * @returns {{new BigNumber|null}} The amount of liquidity that the sender gains.
 */
export function addLiquidityXtzIn(
  tokenIn: DexCalcInputParam,
  xtzPool: DexCalcInputParam,
  tokenPool: DexCalcInputParam,
) {
  let _xtzPool = creditSubsidy(xtzPool)
  let tokenIn_ = new BigNumber(0)
  let xtzPool_ = new BigNumber(0)
  let tokenPool_ = new BigNumber(0)
  try {
    tokenIn_ = new BigNumber(tokenIn)
    xtzPool_ = new BigNumber(_xtzPool)
    tokenPool_ = new BigNumber(tokenPool)
  } catch (err) {
    return null
  }
  if (gtZero(tokenIn_) && gtZero(xtzPool_) && gtZero(tokenPool_)) {
    // div(tokenIn_ * xtzPool_, tokenPool_)
    return tokenIn_.times(xtzPool_).div(tokenPool_)
  } else {
    return null
  }
}

/**
 * =============================================================================
 * removeLiquidity entrypoint export functions
 * =============================================================================
 */

/**
 * Calculate the amount of token a sender would receive for burning a certain amount
 * of liquidity given a Dexter exchange that has a certain amount of
 * total liquidity and holds an amount of token.
 *
 * @param {(BigNumber|number)} liquidityBurned LQT that the sender burns.
 * @param {(BigNumber|number)} totalLiquidity The total amount of liquidity in a Dexter exchange.
 * @param {(BigNumber|number)} tokenPool amount of token that Dexter holds.
 * @returns {(BigNumber|null)} The amount of token that the sender gains.
 */
export function removeLiquidityTokenOut(
  liquidityBurned: DexCalcInputParam,
  totalLiquidity: DexCalcInputParam,
  tokenPool: DexCalcInputParam,
) {
  let liquidityBurned_ = new BigNumber(0)
  let totalLiquidity_ = new BigNumber(0)
  let tokenPool_ = new BigNumber(0)
  try {
    liquidityBurned_ = new BigNumber(liquidityBurned)
    totalLiquidity_ = new BigNumber(totalLiquidity)
    tokenPool_ = new BigNumber(tokenPool)
  } catch (err) {
    return null
  }
  if (gtZero(liquidityBurned_) && gtZero(totalLiquidity_) && gtZero(tokenPool_)) {
    // tokenPool_ * liquidityBurned_ / totalLiquidity_
    return tokenPool_.times(liquidityBurned_).div(totalLiquidity_)
  } else {
    return null
  }
}

/**
 * Calculate the amount of XTZ a sender would receive for burning a certain amount
 * of liquidity given a Dexter exchange that has a certain amount of
 * total liquidity and holds an amount of XTZ.
 *
 * @param {(BigNumber|number)} liquidityBurned LQT that the sender burns.
 * @param {(BigNumber|number)} totalLiquidity The total amount of liquidity in a Dexter exchange.
 * @param {(BigNumber|number)} xtzPool amount of token that Dexter holds.
 * @returns {(BigNumber|null)} The amount of XTZ that the sender gains.
 */
export function removeLiquidityXtzOut(
  liquidityBurned: DexCalcInputParam,
  totalLiquidity: DexCalcInputParam,
  xtzPool: DexCalcInputParam,
) {
  let _xtzPool = creditSubsidy(xtzPool)
  let liquidityBurned_ = new BigNumber(0)
  let totalLiquidity_ = new BigNumber(0)
  let xtzPool_ = new BigNumber(0)
  try {
    liquidityBurned_ = new BigNumber(liquidityBurned)
    totalLiquidity_ = new BigNumber(totalLiquidity)
    xtzPool_ = new BigNumber(_xtzPool)
  } catch (err) {
    return null
  }
  if (gtZero(liquidityBurned_) && gtZero(totalLiquidity_) && gtZero(xtzPool_)) {
    // xtzPool_ * liquidityBurned_ / totalLiquidity_
    return xtzPool_.times(liquidityBurned_).div(totalLiquidity_)
  } else {
    return null
  }
}
