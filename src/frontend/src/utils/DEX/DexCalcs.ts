import BigNumber from 'bignumber.js'
import { DEXType } from './Dex.types'

export const getSettings = (dex: string): DEXType => {
  switch (dex) {
    case 'liquidity':
      return { fee: 0.1, burn: 0.1, includeSubsidy: false }
    case 'swap':
      return { fee: 0.3, burn: 0, includeSubsidy: false }
    default:
      return { fee: 0.3, burn: 0, includeSubsidy: false }
  }
}

export const creditSubsidy = (xtzPool: BigNumber | number): BigNumber => {
  const LIQUIDITY_BAKING_SUBSIDY = 2500000
  if (BigNumber.isBigNumber(xtzPool)) {
    return xtzPool.plus(new BigNumber(LIQUIDITY_BAKING_SUBSIDY))
  } else {
    return new BigNumber(xtzPool).plus(new BigNumber(LIQUIDITY_BAKING_SUBSIDY))
  }
}

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
  const feeMultiplier = new BigNumber((1e3 - Math.floor(feePercent * 10)) * 1e3 - Math.floor(burnPercent * 10))

  if (BNxtzIn.comparedTo(0) === 1 && BNxtzPool.comparedTo(0) === 1 && BNtokenPool.comparedTo(0) === 1) {
    const numerator = BNxtzIn.times(BNtokenPool).times(feeMultiplier)
    const denominator = BNxtzPool.times(1e6).plus(BNxtzIn.times(feeMultiplier))
    return numerator.dividedBy(denominator).toNumber()
  }

  return null
}

export const xtzToTokenMinimumTokenOutput = (tokenOut: number, allowedSlippage: number) => {
  if (tokenOut > 0 && allowedSlippage >= 0 && allowedSlippage <= 1) {
    const _tokenOut = new BigNumber(tokenOut).times(1e3)
    const _slippage = new BigNumber(Math.floor(allowedSlippage * 1e3 * 100))
    const result = _tokenOut.minus(_tokenOut.times(_slippage).dividedBy(1e5)).dividedBy(1e3)
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
  const expectedTokenPayout = xtzToTokenTokenOutput(xtzIn, xtzPool, tokenPool, feePercent, burnPercent, includeSubsidy)

  if (!expectedTokenPayout) return null

  let _xtzPool = xtzPool
  if (includeSubsidy) {
    _xtzPool = creditSubsidy(_xtzPool).toNumber()
  }

  const BNxtzIn = new BigNumber(xtzIn)
  const BNxtzPool = new BigNumber(_xtzPool)
  const BNtokenPool = new BigNumber(tokenPool)
  const burn = 1e3 - Math.floor(burnPercent * 10)

  if (BNxtzIn.comparedTo(0) === 1 && BNxtzPool.comparedTo(0) === 1 && BNtokenPool.comparedTo(0) === 1) {
    const currentMidPrice = BNxtzPool.dividedBy(BNtokenPool)
    const xtzInNetBurn = BNxtzIn.times(burn).dividedBy(1e3)
    const postTradeMidPrice = BNxtzPool.plus(xtzInNetBurn).dividedBy(BNtokenPool.minus(expectedTokenPayout))
    const result = Math.abs(1 - parseFloat(postTradeMidPrice.dividedBy(currentMidPrice).toFixed(5)))

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
  tokenIn: BigNumber | number,
  xtzPool: BigNumber | number,
  tokenPool: BigNumber | number,
  feePercent: number,
  burnPercent: number,
  // includeSubsidy: boolean,
): BigNumber | null => {
  let _xtzPool = creditSubsidy(xtzPool)
  // if (includeSubsidy) {
  //   _xtzPool = creditSubsidy(_xtzPool).toNumber()
  // }

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
  if (tokenIn_.isGreaterThan(0) && xtzPool_.isGreaterThan(0) && tokenPool_.isGreaterThan(0)) {
    // Includes 0.1% fee and 0.1% burn calculated separately:
    // 999/1000 * 999/1000 = 998001/1000000
    let numerator = new BigNumber(tokenIn).times(new BigNumber(xtzPool)).times(new BigNumber(998001))
    let denominator = new BigNumber(tokenPool)
      .times(new BigNumber(1000000))
      .plus(new BigNumber(tokenIn).times(new BigNumber(999000)))
    return numerator.dividedBy(denominator)
  } else {
    return null
  }

  // const fee = new BigNumber(1e3).minus(Math.floor(feePercent * 10))
  // const burn = new BigNumber(1e3).minus(Math.floor(burnPercent * 10))
  // const feeAndBurnMultiplier = fee.times(burn)
  // const feeMultiplier = fee.times(1e3)
  //
  // if (tokenIn_.comparedTo(0) === 1 && xtzPool_.comparedTo(0) === 1 && tokenPool_.comparedTo(0) === 1) {
  //   const numerator = tokenIn_.times(xtzPool_).times(feeAndBurnMultiplier)
  //   const denominator = tokenPool_.times(1e6).plus(tokenIn_).times(feeMultiplier)
  //
  //   return numerator.dividedBy(denominator).toNumber()
  // }
  //
  // return null
}

export const tokenToXtzPriceImpact = (
  tokenIn: number,
  xtzPool: number,
  tokenPool: number,
  feePercent: number,
  burnPercent: number,
  includeSubsidy: boolean,
) => {
  const expectedXTZPayout = tokenToXtzXtzOutput(tokenIn, xtzPool, tokenPool, feePercent, burnPercent)

  if (!expectedXTZPayout) return null

  let _xtzPool = xtzPool
  if (includeSubsidy) {
    _xtzPool = creditSubsidy(_xtzPool).toNumber()
  }

  const BNtokenIn = new BigNumber(tokenIn)
  const BNxtzPool = new BigNumber(_xtzPool)
  const BNtokenPool = new BigNumber(tokenPool)

  if (BNtokenIn.comparedTo(0) === 1 && BNxtzPool.comparedTo(0) === 1 && BNtokenPool.comparedTo(0) === 1) {
    const currentMidPrice = BNxtzPool.dividedBy(BNtokenPool)
    const postTradeMidPrice = BNxtzPool.minus(expectedXTZPayout).dividedBy(BNtokenPool.minus(BNtokenIn))
    const result = Math.abs(1 - parseFloat(postTradeMidPrice.dividedBy(currentMidPrice).toFixed(5)))

    if (result < 1e-5) {
      return 0
    } else {
      return result
    }
  }

  return null
}

export const tokenToXtzMinimumXtzOutput = (xtzOut: number, allowedSlippage: number) => {
  if (xtzOut > 0 && allowedSlippage >= 0 && allowedSlippage <= 1) {
    const _xtzOut = new BigNumber(xtzOut).times(1e3)
    const _slippage = new BigNumber(Math.floor(allowedSlippage * 1e3 * 100))
    var result = _xtzOut.minus(_xtzOut.times(_slippage).dividedBy(1e5)).dividedBy(1e3)
    return Math.max(result.toNumber(), 1)
  }

  return null
}

// Remove liquidity handlers
export const removeLiquidityTokenOut = (
  liquidityBurned: number,
  totalLiquidity: number,
  tokenPool: number,
): number | null => {
  const BNLiquidityBurned = new BigNumber(liquidityBurned)
  const BNTotalLiquidity = new BigNumber(totalLiquidity)
  const BNtokenPool = new BigNumber(tokenPool)

  if (
    BNLiquidityBurned.comparedTo(0) === 1 &&
    BNTotalLiquidity.comparedTo(0) === 1 &&
    BNtokenPool.comparedTo(0) === 1
  ) {
    return BNtokenPool.times(BNLiquidityBurned).dividedBy(BNTotalLiquidity).toNumber()
  }

  return null
}

export const removeLiquidityXtzOut = (
  liquidityBurned: number,
  totalLiquidity: number,
  xtzPool: number,
  includeSubsidy: boolean,
): number | null => {
  let _xtzPool = xtzPool
  if (includeSubsidy) {
    _xtzPool = creditSubsidy(_xtzPool).toNumber()
  }

  const BNLiquidityBurned = new BigNumber(liquidityBurned)
  const BNTotalLiquidity = new BigNumber(totalLiquidity)
  const BNXtzPool = new BigNumber(_xtzPool)

  if (BNLiquidityBurned.comparedTo(0) === 1 && BNTotalLiquidity.comparedTo(0) === 1 && BNXtzPool.comparedTo(0) === 1) {
    return BNXtzPool.times(BNLiquidityBurned).dividedBy(BNTotalLiquidity).toNumber()
  }

  return null
}

// Add liquidity handlers

export const addLiquidityLiquidityCreated = (
  xtzIn: number,
  xtzPool: number,
  totalLiquidity: number,
  includeSubsidy: boolean,
): number | null => {
  let _xtzPool = xtzPool
  if (includeSubsidy) {
    _xtzPool = creditSubsidy(_xtzPool).toNumber()
  }

  const BNxtzIn = new BigNumber(xtzIn)
  const BNtotalLiquidity = new BigNumber(totalLiquidity)
  const BNxtzPool = new BigNumber(_xtzPool)

  if (BNxtzIn.comparedTo(0) === 1 && BNxtzPool.comparedTo(0) === 1) {
    if (BNtotalLiquidity.comparedTo(0) === 0 || BNtotalLiquidity.comparedTo(0) === 1) {
      return BNxtzIn.times(BNtotalLiquidity).dividedBy(BNxtzPool).toNumber()
    }
  }

  return null
}

export const addLiquidityTokenIn = (
  xtzIn: number,
  xtzPool: number,
  tokenPool: number,
  includeSubsidy: boolean,
): number | null => {
  let _xtzPool = xtzPool
  if (includeSubsidy) {
    _xtzPool = creditSubsidy(_xtzPool).toNumber()
  }

  const BNxtzIn = new BigNumber(xtzIn)
  const BNtokenPool = new BigNumber(tokenPool)
  const BNxtzPool = new BigNumber(_xtzPool)

  if (BNxtzIn.comparedTo(0) === 1 && BNxtzPool.comparedTo(0) === 1 && BNtokenPool.comparedTo(0) === 1) {
    const canDivide = BNxtzIn.times(BNtokenPool).mod(BNtokenPool).toNumber()

    if (canDivide >= 0) return BNxtzIn.times(BNtokenPool).dividedBy(BNtokenPool).plus(1).toNumber()
    return BNxtzIn.times(BNtokenPool).dividedBy(BNtokenPool).toNumber()
  }

  return null
}

export const addLiquidityXtzIn = (
  tokenIn: number,
  xtzPool: number,
  tokenPool: number,
  includeSubsidy: boolean,
): number | null => {
  let _xtzPool = xtzPool
  if (includeSubsidy) {
    _xtzPool = creditSubsidy(_xtzPool).toNumber()
  }

  const BNtokenIn = new BigNumber(tokenIn)
  const BNtokenPool = new BigNumber(tokenPool)
  const BNxtzPool = new BigNumber(_xtzPool)

  if (BNtokenIn.comparedTo(0) === 1 && BNxtzPool.comparedTo(0) === 1 && BNtokenPool.comparedTo(0) === 1) {
    return BNtokenIn.times(BNxtzPool).dividedBy(BNtokenPool).toNumber()
  }

  return null
}
