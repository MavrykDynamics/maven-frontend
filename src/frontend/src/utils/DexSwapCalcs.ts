import BigNumber from 'bignumber.js'

export const creditSubsidy = (xtzPool: number): BigNumber =>
  new BigNumber(xtzPool).plus(new BigNumber(25e5))

// XTZ => tzBTC swap
export const xtzToTokenTokenOutput = (
  xtzIn: number,
  xtzPool: number,
  tokenPool: number,
  feePercent: number,
  burnPercent: number,
  includeSubsidy: boolean,
): number | null => {
  let _xtzPool = xtzPool
  if (includeSubsidy) {
    _xtzPool = creditSubsidy(_xtzPool).toNumber()
  }

  const BNxtzIn = new BigNumber(xtzIn)
  const BNxtzPool = new BigNumber(_xtzPool)
  const BNtokenPool = new BigNumber(tokenPool)
  const feeMultiplier = new BigNumber(
    (1e3 - Math.floor(feePercent * 10)) * 1e3 - Math.floor(burnPercent * 10),
  )

  if (
    BNxtzIn.comparedTo(0) === 1 &&
    BNxtzPool.comparedTo(0) === 1 &&
    BNtokenPool.comparedTo(0) === 1
  ) {
    const numerator = BNxtzIn.times(BNtokenPool).times(feeMultiplier)
    const denominator = BNxtzPool.times(1e6).plus(BNxtzIn.times(feeMultiplier))
    return numerator.dividedBy(denominator).toNumber()
  }

  return null
}

export const xtzToTokenMinimumTokenOutput = (
  tokenOut: number,
  allowedSlippage: number,
) => {
  //TODO: check this fn
  if (tokenOut > 0 && allowedSlippage >= 0 && allowedSlippage <= 1) {
    const _tokenOut = new BigNumber(tokenOut).times(1e3)
    const _slippage = new BigNumber(Math.floor(allowedSlippage * 1e3 * 100))
    const result = _tokenOut
      .minus(_tokenOut.times(_slippage).dividedBy(1e5))
      .dividedBy(1e3)
    return Math.max(result.toNumber(), 1)
  } else {
    return null
  }
}

export const xtzToTokenPriceImpact = (
  xtzIn: number,
  xtzPool: number,
  tokenPool: number,
  feePercent: number,
  burnPercent: number,
  includeSubsidy: boolean,
) => {
  const expectedTokenPayout = xtzToTokenTokenOutput(
    xtzIn,
    xtzPool,
    tokenPool,
    feePercent,
    burnPercent,
    includeSubsidy,
  )

  if (!expectedTokenPayout) return null

  let _xtzPool = xtzPool
  if (includeSubsidy) {
    _xtzPool = creditSubsidy(_xtzPool).toNumber()
  }

  const BNxtzIn = new BigNumber(xtzIn)
  const BNxtzPool = new BigNumber(_xtzPool)
  const BNtokenPool = new BigNumber(tokenPool)
  const burn = 1e3 - Math.floor(burnPercent * 10)

  if (
    BNxtzIn.comparedTo(0) === 1 &&
    BNxtzPool.comparedTo(0) === 1 &&
    BNtokenPool.comparedTo(0) === 1
  ) {
    const currentMidPrice = BNxtzPool.dividedBy(BNtokenPool)
    const xtzInNetBurn = BNxtzIn.times(burn).dividedBy(1e3)
    const postTradeMidPrice = BNxtzPool.plus(xtzInNetBurn).dividedBy(
      BNtokenPool.minus(expectedTokenPayout),
    )
    const result = Math.abs(
      1 - parseFloat(postTradeMidPrice.dividedBy(currentMidPrice).toFixed(5)),
    )

    if (result < 1e-5) {
      return 0
    } else {
      return result
    }
  }

  return null
}

// tzBTC => XTZ swap
export const tokenToXtzXtzOutput = (
  tokenIn: number,
  xtzPool: number,
  tokenPool: number,
  feePercent: number,
  burnPercent: number,
  includeSubsidy: boolean,
): number | null => {
  let _xtzPool = xtzPool
  if (includeSubsidy) {
    _xtzPool = creditSubsidy(_xtzPool).toNumber()
  }

  const BNtokenIn = new BigNumber(tokenIn)
  const BNxtzPool = new BigNumber(_xtzPool)
  const BNtokenPool = new BigNumber(tokenPool)
  const feeMultiplier = new BigNumber(
    (1e3 - Math.floor(feePercent * 10)) * 1e3 - Math.floor(burnPercent * 10),
  )

  if (
    BNtokenIn.comparedTo(0) === 1 &&
    BNxtzPool.comparedTo(0) === 1 &&
    BNtokenPool.comparedTo(0) === 1
  ) {
    const numerator = BNtokenIn.times(BNxtzPool).times(feeMultiplier)
    const denominator = BNtokenPool.times(1e6)
      .plus(BNtokenIn)
      .times(feeMultiplier)

    return numerator.dividedBy(denominator).toNumber()
  }

  return null
}

export const tokenToXtzPriceImpact = (
  tokenIn: number,
  xtzPool: number,
  tokenPool: number,
  feePercent: number,
  burnPercent: number,
  includeSubsidy: boolean,
) => {
  const expectedXTZPayout = tokenToXtzXtzOutput(
    tokenIn,
    xtzPool,
    tokenPool,
    feePercent,
    burnPercent,
    includeSubsidy,
  )

  if (!expectedXTZPayout) return null

  let _xtzPool = xtzPool
  if (includeSubsidy) {
    _xtzPool = creditSubsidy(_xtzPool).toNumber()
  }

  const BNtokenIn = new BigNumber(tokenIn)
  const BNxtzPool = new BigNumber(_xtzPool)
  const BNtokenPool = new BigNumber(tokenPool)

  if (
    BNtokenIn.comparedTo(0) === 1 &&
    BNxtzPool.comparedTo(0) === 1 &&
    BNtokenPool.comparedTo(0) === 1
  ) {
    const currentMidPrice = BNxtzPool.dividedBy(BNtokenPool)
    const postTradeMidPrice = BNxtzPool.minus(expectedXTZPayout).dividedBy(
      BNtokenPool.minus(BNtokenIn),
    )
    const result = Math.abs(
      1 - parseFloat(postTradeMidPrice.dividedBy(currentMidPrice).toFixed(5)),
    )

    if (result < 1e-5) {
      return 0
    } else {
      return result
    }
  }

  return null
}

export const tokenToXtzMinimumXtzOutput = (
  xtzOut: number,
  allowedSlippage: number,
) => {
  if (xtzOut > 0 && allowedSlippage >= 0 && allowedSlippage <= 1) {
    const _xtzOut = new BigNumber(xtzOut).times(1e3)
    const _slippage = new BigNumber(Math.floor(allowedSlippage * 1e3 * 100))
    var result = _xtzOut
      .minus(_xtzOut.times(_slippage).dividedBy(1e5))
      .dividedBy(1e3)
    return Math.max(result.toNumber(), 1)
  }

  return null
}
