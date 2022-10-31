import BigNumber from 'bignumber.js'

export class DexCalcOutput {
  decimalPlaces: number = 6
  internalBigInt: BigNumber = new BigNumber(0)
  internalNormalised: number = 0

  constructor(c: any) {
    if (c?.rpcAmount === undefined && c?.normalisedAmount === undefined) {
      return
    }
    this.decimalPlaces = c.decimalPlaces
    if (!!c?.rpcAmount) {
      let multiplierIntValue = Math.round(Math.pow(10, this.decimalPlaces))
      let rpcAmountBigNum = new BigNumber(c.rpcAmount)
      this.internalNormalised = parseFloat(rpcAmountBigNum.div(multiplierIntValue).toString()) || 0
      this.internalBigInt = new BigNumber(c.rpcAmount)
    } else if (!!c?.normalisedAmount) {
      let multiplierIntValue = Math.round(Math.pow(10, this.decimalPlaces))
      this.internalNormalised = parseFloat(new BigNumber(c.normalisedAmount).toString()) || 0
      this.internalBigInt = new BigNumber(c.normalisedAmount).times(multiplierIntValue)
    }
  }
}
