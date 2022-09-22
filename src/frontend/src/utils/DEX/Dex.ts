// @ts-ignore
import dexterCalculations from 'dex-calcs/dist/index-mobile.min'
import { DexCalcOutput } from './DexCalcOutput'
import BigNumber from 'bignumber.js'
import env from '../env'

interface Settings {
  fee: string
  burn: string
  includeSubsidy: boolean
}

export class Dex {
  readonly lqdTokenContract = 'KT1AafHA1C1vk959wvHWBispY9Y2f3fxBUUo'
  readonly lqdContract = 'KT1TxqZ8QtKvLu3V3JH7Gx58n7Co8pgtpQU5'
  readonly tzBTCContract = 'KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn'

  public storage: { [index: string]: any } = {}
  public dipdupContracts = []

  constructor() {}

  async fetchContracts(offset = 0): Promise<void> {
    const baseUrl = `https://dex.dipdup.net/v1/graphql`
    const req = {
      query: `
      {
        dipdupContract(where: {}, offset: ${offset}) {
          address, name, typename, updatedAt, createdAt
        }
      }`,
    }
    try {
      const response = await (
        await fetch(baseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req),
        })
      ).json()
      if (response?.data?.dipdupContract?.length > 0) {
        this.dipdupContracts.concat(response.data.dipdupContract)
        await this.fetchContracts(offset + 100)
      } else if (offset === 0) {
        throw new Error()
      }
      return
    } catch (e) {
      throw new Error()
    }
  }

  async fetchStorage(contract: any): Promise<void> {
    try {
      const apiNetwork = env.NODE_ENV === 'production' ? '' : env.rpcTestNetNetwork + '.'
      return await fetch(`https://api.${apiNetwork}tzkt.io/v1/contracts/${contract}/storage`)
        .then((r) => r.json())
        .then((r) => {
          this.storage[contract] = {}
          this.storage[contract].total_pool = r['lqtTotal']
          this.storage[contract].tez_pool = r['xtzPool']
          this.storage[contract].token_pool = r['tokenPool']
        })
    } catch (e) {
      throw new Error()
    }
  }

  settings(dex: string): Settings {
    switch (dex) {
      case 'liquidityBaking':
        return { fee: '0.1', burn: '0.1', includeSubsidy: true }
      case 'quipuswap':
        return { fee: '0.3', burn: '0', includeSubsidy: false }
      default:
        return { fee: '0.3', burn: '0', includeSubsidy: false }
    }
  }

  createPoolAmounts(): { xtzPool: DexCalcOutput; tokenPool: DexCalcOutput } {
    console.log(
      'here in create pool amounts: ',
      this.storage[this.lqdContract]?.tez_pool,
      this.storage[this.lqdContract]?.token_pool,
    )
    const xtzPool = new DexCalcOutput({
      rpcAmount: parseFloat(this.storage[this.lqdContract]?.tez_pool),
      decimalPlaces: 6,
    })
    const tokenPool = new DexCalcOutput({
      rpcAmount: parseFloat(this.storage[this.lqdContract]?.token_pool),
      decimalPlaces: 8,
    })
    return { xtzPool, tokenPool }
  }

  calculateXtzToToken(
    xtzToSell: DexCalcOutput,
    xtzPool: DexCalcOutput,
    tokenPool: DexCalcOutput,
    maxSlippage: number,
    dex: Settings,
  ): { expected: DexCalcOutput; minimum: DexCalcOutput; rate: string; impactDouble: number } {
    console.log('Here in dex.calculateXtzToToken()')
    console.log(
      'Logging dex.calculateXtzToToken() input: ',
      xtzToSell.internalBigInt,
      xtzPool.internalBigInt,
      tokenPool.internalBigInt,
      dex,
    )
    const expected = this.xtzToTokenExpectedReturn(xtzToSell, xtzPool, tokenPool, dex)
    const minimum = this.xtzToTokenMinimumReturn(expected, maxSlippage)
    const rate = this.xtzToTokenExchangeRateDisplay(xtzToSell, xtzPool, tokenPool, dex)
    const priceImpact = this.xtzToTokenPriceImpact(xtzToSell, xtzPool, tokenPool, dex)
    const impactDouble = priceImpact ?? 0
    return { expected, minimum, rate, impactDouble }
  }

  calculateXtzToTokenFromToken(
    tokenToSell: DexCalcOutput,
    xtzPool: DexCalcOutput,
    tokenPool: DexCalcOutput,
    maxSlippage: number,
    dex: Settings,
  ): { xtz: any; token: any } {
    const result = this.calculateTokenToXTZ(tokenToSell, xtzPool, tokenPool, maxSlippage, dex)
    const expected = this.xtzToTokenExpectedReturn(result.expected, xtzPool, tokenPool, dex)
    const minimum = this.xtzToTokenMinimumReturn(expected, maxSlippage)
    const rate = this.xtzToTokenExchangeRateDisplay(result.expected, xtzPool, tokenPool, dex)
    const priceImpact = this.xtzToTokenPriceImpact(result.expected, xtzPool, tokenPool, dex)
    const impactDouble = priceImpact ?? 0
    return { xtz: result, token: { expected, minimum, rate, impactDouble } }
  }

  calculateTokenToXTZ(
    tokenToSell: DexCalcOutput,
    xtzPool: DexCalcOutput,
    tokenPool: DexCalcOutput,
    maxSlippage: number,
    dex: Settings,
  ): { expected: DexCalcOutput; minimum: DexCalcOutput; rate: string; impactDouble: number } {
    console.log('Here in dex.calculateTokenToXTZ()')
    console.log('Logging dex.calculateTokenToXTZ() input: ', tokenToSell, xtzPool, tokenPool, dex)
    const expected = this.tokenToXtzExpectedReturn(tokenToSell, xtzPool, tokenPool, dex)
    const minimum = this.tokenToXtzMinimumReturn(expected, maxSlippage)
    const rate = this.tokenToXtzExchangeRateDisplay(tokenToSell, xtzPool, tokenPool, dex)
    const priceImpact = this.tokenToXtzPriceImpact(tokenToSell, xtzPool, tokenPool, dex)
    const impactDouble = priceImpact ?? 0
    console.log('Logging dex.calculateTokenToXTZ() output: ', expected, minimum, rate, priceImpact, impactDouble)
    return { expected, minimum, rate, impactDouble }
  }

  calculateTokenToXTZFromXTZ(
    xtzToSell: DexCalcOutput,
    xtzPool: DexCalcOutput,
    tokenPool: DexCalcOutput,
    maxSlippage: number,
    dex: Settings,
  ): { xtz: any; token: any } {
    const result = this.calculateXtzToToken(xtzToSell, xtzPool, tokenPool, maxSlippage, dex)
    const expected = this.tokenToXtzExpectedReturn(result.expected, xtzPool, tokenPool, dex)
    const minimum = this.tokenToXtzMinimumReturn(expected, maxSlippage)
    const rate = this.tokenToXtzExchangeRateDisplay(result.expected, xtzPool, tokenPool, dex)
    const priceImpact = this.tokenToXtzPriceImpact(result.expected, xtzPool, tokenPool, dex)
    const impactDouble = priceImpact ?? 0
    return { xtz: { expected, minimum, rate, impactDouble }, token: result }
  }

  calculateAddLiquidityXTZ(
    xtz: DexCalcOutput,
    xtzPool: DexCalcOutput,
    tokenPool: DexCalcOutput,
    totalLiquidity: number,
    maxSlippage: number,
    dex: Settings,
  ): {
    liquidityExpected: DexCalcOutput
    liquidityMinimum: DexCalcOutput
    tokenRequired: DexCalcOutput
    exchangeRate: string
  } {
    const tokenRequired = this.addLiquidityTokenRequired(xtz, xtzPool, tokenPool, dex)
    const liquidityReturned = this.addLiquidityReturn(xtz, xtzPool, totalLiquidity, maxSlippage, dex)
    const exchangeRate = this.xtzToTokenExchangeRateDisplay(xtz, xtzPool, tokenPool, dex)
    return {
      liquidityExpected: liquidityReturned?.expected,
      liquidityMinimum: liquidityReturned?.minimum,
      tokenRequired,
      exchangeRate,
    }
  }

  calculateAddLiquidityToken(
    token: DexCalcOutput,
    xtzPool: DexCalcOutput,
    tokenPool: DexCalcOutput,
    totalLiquidity: number,
    maxSlippage: number,
    dex: Settings,
  ): {
    liquidityExpected: DexCalcOutput
    liquidityMinimum: DexCalcOutput
    xtzRequired: DexCalcOutput
    exchangeRate: string
  } {
    const xtzRequired = this.addLiquidityXtzRequired(token, xtzPool, tokenPool, dex)
    const liquidityReturned = this.addLiquidityReturn(xtzRequired, xtzPool, totalLiquidity, maxSlippage, dex)
    const exchangeRate = this.xtzToTokenExchangeRateDisplay(xtzRequired, xtzPool, tokenPool, dex)
    return {
      liquidityExpected: liquidityReturned?.expected,
      liquidityMinimum: liquidityReturned?.minimum,
      xtzRequired,
      exchangeRate,
    }
  }

  calculateRemoveLiquidity(
    liquidityBurned: DexCalcOutput,
    xtzPool: DexCalcOutput,
    tokenPool: DexCalcOutput,
    totalLiquidity: number,
    maxSlippage: number,
    dex: Settings,
  ): {
    xtzExpected: DexCalcOutput
    xtzMinimum: DexCalcOutput
    tokenExpected: DexCalcOutput
    tokenMinimum: DexCalcOutput
    exchangeRate: string
  } {
    const xtzOut = this.removeLiquidityXtzReceived(liquidityBurned, totalLiquidity, xtzPool, maxSlippage, dex)
    const tokenOut = this.removeLiquidityTokenReceived(liquidityBurned, totalLiquidity, tokenPool, maxSlippage)
    const exchangeRate = this.xtzToTokenExchangeRateDisplay(xtzOut?.expected, xtzPool, tokenPool, dex)

    return {
      xtzExpected: xtzOut?.expected,
      xtzMinimum: xtzOut?.minimum,
      tokenExpected: tokenOut?.expected,
      tokenMinimum: tokenOut?.minimum,
      exchangeRate,
    }
  }

  xtzToTokenExpectedReturn(
    xtzToSell: DexCalcOutput,
    xtzPool: DexCalcOutput,
    tokenPool: DexCalcOutput,
    dex: Settings,
  ): DexCalcOutput {
    const xtz = xtzToSell.internalBigInt
    const xPool = xtzPool.internalBigInt
    const tPool = tokenPool.internalBigInt
    const result = dexterCalculations.xtzToTokenTokenOutput(
      xtz.toString(),
      xPool.toString(),
      tPool.toString(),
      dex.fee.toString(),
      dex.burn.toString(),
      dex.includeSubsidy,
    )
    console.log('Here in xtzToTokenExpectedReturn: ', result)
    return new DexCalcOutput({
      rpcAmount: result?.toString() || '0',
      decimalPlaces: tokenPool.decimalPlaces,
    })
  }

  xtzToTokenMinimumReturn(tokenAmount: DexCalcOutput, slippage: number): DexCalcOutput {
    const token = tokenAmount.internalBigInt
    if (slippage < 0 || slippage > 1) {
      console.log(`slippage value supplied to 'xtzToTokenMinimumReturn' was not between 0 and 1: ${slippage}`)
      return new DexCalcOutput(0)
    }
    const result = dexterCalculations.xtzToTokenMinimumTokenOutput(token.toString(), slippage)
    return new DexCalcOutput({
      rpcAmount: result?.value?.toString() || '0',
      decimalPlaces: tokenAmount.decimalPlaces,
    })
  }

  xtzToTokenRequiredXtzFor(
    tokenAmount: DexCalcOutput,
    xtzPool: DexCalcOutput,
    tokenPool: DexCalcOutput,
    dex: Settings,
  ): DexCalcOutput {
    const tokenRequired = tokenAmount.internalBigInt
    const xtzPoolRpc = xtzPool.internalBigInt
    const tokenPoolRpc = tokenPool.internalBigInt

    const result = dexterCalculations.xtzToTokenXtzInput(
      tokenRequired,
      xtzPoolRpc,
      tokenPoolRpc,
      tokenAmount.decimalPlaces,
      dex.fee.toString(),
      dex.burn.toString(),
      dex.includeSubsidy,
    )
    return new DexCalcOutput({ rpcAmount: result.toString() })
  }

  xtzToTokenExchangeRate(
    xtzToSell: DexCalcOutput,
    xtzPool: DexCalcOutput,
    tokenPool: DexCalcOutput,
    dex: Settings,
  ): number {
    const xtz = xtzToSell.internalBigInt
    const xtzPoolRpc = xtzPool.internalBigInt
    const tokenPoolRpc = tokenPool.internalBigInt

    const result = dexterCalculations.xtzToTokenExchangeRate(
      xtz,
      xtzPoolRpc,
      tokenPoolRpc,
      dex.fee.toString(),
      dex.burn.toString(),
      dex.includeSubsidy,
    )
    return parseFloat(result.toString())
  }

  xtzToTokenExchangeRateDisplay(
    xtzToSell: DexCalcOutput,
    xtzPool: DexCalcOutput,
    tokenPool: DexCalcOutput,
    dex: Settings,
  ): string {
    const xtz = xtzToSell.internalBigInt
    const xPool = xtzPool.internalBigInt
    const tPool = tokenPool.internalBigInt
    const result = dexterCalculations.xtzToTokenExchangeRateForDisplay(
      xtz.toString(),
      xPool.toString(),
      tPool.toString(),
      tokenPool.decimalPlaces,
      dex.fee.toString(),
      dex.burn.toString(),
      dex.includeSubsidy,
    )
    return result?.toString() ?? '0'
  }

  xtzToTokenPriceImpact(
    xtzToSell: DexCalcOutput,
    xtzPool: DexCalcOutput,
    tokenPool: DexCalcOutput,
    dex: Settings,
  ): number {
    const xtz = xtzToSell.internalBigInt
    const xtzPoolRpc = xtzPool.internalBigInt
    const tokenPoolRpc = tokenPool.internalBigInt

    const result = dexterCalculations.xtzToTokenPriceImpact(
      xtz.toString(),
      xtzPoolRpc.toString(),
      tokenPoolRpc.toString(),
      dex.fee.toString(),
      dex.burn.toString(),
      dex.includeSubsidy,
    )
    return parseFloat(result?.toString() ?? 0)
  }

  tokenToXtzExpectedReturn(
    tokenToSell: DexCalcOutput,
    xtzPool: DexCalcOutput,
    tokenPool: DexCalcOutput,
    dex: Settings,
  ): DexCalcOutput {
    const token = tokenToSell.internalBigInt
    const xtzPoolRpc = xtzPool.internalBigInt
    const tokenPoolRpc = tokenPool.internalBigInt
    const result = dexterCalculations.tokenToXtzXtzOutput(
      token.toString(),
      xtzPoolRpc.toString(),
      tokenPoolRpc.toString(),
      dex.fee.toString(),
      dex.burn.toString(),
      dex.includeSubsidy,
    )
    return new DexCalcOutput({
      rpcAmount: result?.toString() || '0',
      decimalPlaces: 6,
    })
  }

  tokenToXtzMinimumReturn(xtzAmount: DexCalcOutput, slippage: number): DexCalcOutput {
    const xtz = xtzAmount.internalBigInt

    if (slippage < 0 || slippage > 1) {
      console.log(`slippage value supplied to 'tokenToXtzMinimumReturn' was not between 0 and 1: ${slippage}`)
      return new DexCalcOutput(0)
    }

    const result = dexterCalculations.tokenToXtzMinimumXtzOutput(xtz.toString(), slippage)
    return new DexCalcOutput({
      rpcAmount: result?.toString() || '0',
      decimalPlaces: 6,
    })
  }

  tokenToXtzRequiredTokenFor(
    xtzAmount: DexCalcOutput,
    xtzPool: DexCalcOutput,
    tokenPool: DexCalcOutput,
    dex: Settings,
  ): DexCalcOutput {
    const xtzRequired = xtzAmount.internalBigInt
    const xPool = xtzPool.internalBigInt
    const tPool = tokenPool.internalBigInt

    const result = dexterCalculations.tokenToXtzTokenInput(
      xtzRequired,
      xPool,
      tPool,
      tokenPool.decimalPlaces,
      dex.fee.toString(),
      dex.burn.toString(),
      dex.includeSubsidy,
    )
    return new DexCalcOutput({
      rpcAmount: result.toString(),
      decimalPlaces: tokenPool.decimalPlaces,
    })
  }

  tokenToXtzExchangeRate(
    tokenToSell: DexCalcOutput,
    xtzPool: DexCalcOutput,
    tokenPool: DexCalcOutput,
    dex: Settings,
  ): number {
    const token = tokenToSell.internalBigInt
    const xtzPoolRpc = xtzPool.internalBigInt
    const tokenPoolRpc = tokenPool.internalBigInt

    const result = dexterCalculations.tokenToXtzExchangeRate(
      token.toString(),
      xtzPoolRpc,
      tokenPoolRpc,
      dex.fee.toString(),
      dex.burn.toString(),
      dex.includeSubsidy,
    )
    return parseFloat(result.toString())
  }

  tokenToXtzExchangeRateDisplay(
    tokenToSell: DexCalcOutput,
    xtzPool: DexCalcOutput,
    tokenPool: DexCalcOutput,
    dex: Settings,
  ): string {
    const token = tokenToSell.internalBigInt
    const xPool = xtzPool.internalBigInt
    const tPool = tokenPool.internalBigInt

    const result = dexterCalculations.tokenToXtzExchangeRateForDisplay(
      token.toString(),
      xPool.toString(),
      tPool.toString(),
      tokenPool.decimalPlaces,
      dex.fee.toString(),
      dex.burn.toString(),
      dex.includeSubsidy,
    )
    return result?.toString() ?? '0'
  }

  tokenToXtzMarketRate(xtzPool: DexCalcOutput, tokenPool: DexCalcOutput): number {
    const xPool = xtzPool.internalBigInt
    const tPool = tokenPool.internalBigInt

    const result = dexterCalculations.tokenToXtzMarketRate(xPool, tPool, tokenPool.decimalPlaces)
    return parseFloat(parseFloat(result.toString()).toFixed(tokenPool.decimalPlaces))
  }

  tokenToXtzPriceImpact(
    tokenToSell: DexCalcOutput,
    xtzPool: DexCalcOutput,
    tokenPool: DexCalcOutput,
    dex: Settings,
  ): number {
    const token = tokenToSell.internalBigInt
    const xtzPoolRpc = xtzPool.internalBigInt
    const tokenPoolRpc = tokenPool.internalBigInt

    const result = dexterCalculations.tokenToXtzPriceImpact(
      token.toString(),
      xtzPoolRpc.toString(),
      tokenPoolRpc.toString(),
      dex.fee.toString(),
      dex.burn.toString(),
      dex.includeSubsidy,
    )
    return parseFloat(result?.toString() ?? 0)
  }

  addLiquidityReturn(
    xtzToDeposit: DexCalcOutput,
    xtzPool: DexCalcOutput,
    totalLiquidity: number,
    slippage: number,
    dex: Settings,
  ): { expected: DexCalcOutput; minimum: DexCalcOutput } {
    if (slippage < 0 || slippage > 1) {
      console.log(`slippage value supplied to 'addLiquidityReturn' was not between 0 and 1: ${slippage}`)
      return { expected: new DexCalcOutput(0), minimum: new DexCalcOutput(0) }
    }

    const xtzIn = xtzToDeposit.internalBigInt
    const xPool = xtzPool.internalBigInt
    const totalLqt = totalLiquidity

    const result = dexterCalculations.addLiquidityLiquidityCreated(
      xtzIn.toString(),
      xPool.toString(),
      totalLqt.toString(),
      dex.includeSubsidy,
    )
    const expected = new DexCalcOutput({
      rpcAmount: result?.value ?? 0,
      decimalPlaces: 0,
    })
    const minimum = expected.internalNormalised - expected.internalNormalised * slippage
    const minAmount = new DexCalcOutput({
      normalisedAmount: minimum ?? 0,
      decimalPlaces: 0,
    })
    return { expected, minimum: minAmount }
  }

  addLiquidityTokenRequired(
    xtzToDeposit: DexCalcOutput,
    xtzPool: DexCalcOutput,
    tokenPool: DexCalcOutput,
    dex: Settings,
  ): DexCalcOutput {
    const xtzIn = xtzToDeposit.internalBigInt
    const xPool = xtzPool.internalBigInt
    const tPool = tokenPool.internalBigInt

    const result = dexterCalculations.addLiquidityTokenIn(
      xtzIn.toString(),
      xPool.toString(),
      tPool.toString(),
      dex.includeSubsidy,
    )
    return new DexCalcOutput({
      rpcAmount: result?.toString() ?? '0',
      decimalPlaces: tokenPool.decimalPlaces,
    })
  }

  addLiquidityXtzRequired(
    tokenToDeposit: DexCalcOutput,
    xtzPool: DexCalcOutput,
    tokenPool: DexCalcOutput,
    dex: Settings,
  ): DexCalcOutput {
    const tokenIn = tokenToDeposit.internalBigInt
    const xPool = xtzPool.internalBigInt
    const tPool = tokenPool.internalBigInt

    const result = dexterCalculations.addLiquidityXtzIn(
      tokenIn.toString(),
      xPool.toString(),
      tPool.toString(),
      dex.includeSubsidy,
    )
    return new DexCalcOutput({ rpcAmount: result?.toString() ?? '0', decimalPlaces: xtzPool.decimalPlaces })
  }

  removeLiquidityTokenReceived(
    liquidityBurned: DexCalcOutput,
    totalLiquidity: number,
    tokenPool: DexCalcOutput,
    slippage: number,
  ): { expected: DexCalcOutput; minimum: DexCalcOutput } {
    if (slippage < 0 || slippage > 1) {
      console.log(`slippage value supplied to 'removeLiquidityTokenReceived' was not between 0 and 1: ${slippage}`)
      return { expected: new DexCalcOutput(0), minimum: new DexCalcOutput(0) }
    }

    const lqtBurned = liquidityBurned.internalBigInt
    const tLqt = totalLiquidity
    const tPool = tokenPool.internalBigInt

    const result = dexterCalculations.removeLiquidityTokenOut(lqtBurned.toString(), tLqt.toString(), tPool.toString())

    if (!!new BigNumber(result?.value).toString()) {
      const expected = new DexCalcOutput({
        rpcAmount: result?.value ?? 0,
        decimalPlaces: 8,
      })
      const minimum = expected.internalNormalised - expected.internalNormalised * slippage
      const minAmount = new DexCalcOutput({
        normalisedAmount: minimum,
        decimalPlaces: 8,
      })
      return { expected, minimum: minAmount }
    } else {
      return { expected: new DexCalcOutput(0), minimum: new DexCalcOutput(0) }
    }
  }

  removeLiquidityXtzReceived(
    liquidityBurned: DexCalcOutput,
    totalLiquidity: number,
    xtzPool: DexCalcOutput,
    slippage: number,
    dex: Settings,
  ): { expected: DexCalcOutput; minimum: DexCalcOutput } {
    if (slippage < 0 || slippage > 1) {
      console.log(`slippage value supplied to 'removeLiquidityXtzReceived' was not between 0 and 1: ${slippage}`)
      return { expected: new DexCalcOutput(0), minimum: new DexCalcOutput(0) }
    }

    const lqtBurned = liquidityBurned.internalBigInt
    const tLqt = totalLiquidity
    const xPool = xtzPool.internalBigInt

    const result = dexterCalculations.removeLiquidityXtzOut(
      lqtBurned.toString(),
      tLqt.toString(),
      xPool.toString(),
      dex.includeSubsidy,
    )

    if (!!new BigNumber(result?.value).toString()) {
      const expected = new DexCalcOutput({
        rpcAmount: result?.value,
        decimalPlaces: 6,
      })
      const minimum = expected.internalNormalised - expected.internalNormalised * slippage
      const minAmount = new DexCalcOutput({
        normalisedAmount: minimum,
        decimalPlaces: 6,
      })
      return { expected, minimum: minAmount }
    } else {
      return { expected: new DexCalcOutput(0), minimum: new DexCalcOutput(0) }
    }
  }

  estimateLiquidityBakingAPY() {
    return (
      'APY: ' + dexterCalculations.estimateLiquidityBakingAPY(this.storage[this.lqdContract]?.tez_pool).toFixed(2) + '%'
    )
  }
}
