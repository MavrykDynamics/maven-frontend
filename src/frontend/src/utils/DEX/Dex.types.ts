export type DEXType = {
  fee: number
  burn: number
  includeSubsidy: boolean
}

export interface DexCalculationOutputFormat {
  value: number,
  decimals: number
}