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

export const creditSubsidy = (xtzPool: number): BigNumber => new BigNumber(xtzPool).plus(new BigNumber(25e5))

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
  //TODO: check this fn why slippage is in a range from 0 to 1?
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
  const feeMultiplier = new BigNumber((1e3 - Math.floor(feePercent * 10)) * 1e3 - Math.floor(burnPercent * 10))

  if (BNtokenIn.comparedTo(0) === 1 && BNxtzPool.comparedTo(0) === 1 && BNtokenPool.comparedTo(0) === 1) {
    const numerator = BNtokenIn.times(BNxtzPool).times(feeMultiplier)
    const denominator = BNtokenPool.times(1e6).plus(BNtokenIn).times(feeMultiplier)

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
  const expectedXTZPayout = tokenToXtzXtzOutput(tokenIn, xtzPool, tokenPool, feePercent, burnPercent, includeSubsidy)

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

//TODO: check this fn why slippage is in a range from 0 to 1?
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
