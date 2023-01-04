// helpers
import { calcWithoutMu } from 'utils/utils'

// types
import { BakeryDelegateDataType } from 'redux/actions/bakery.action'

export const getFreeSpace = (data: BakeryDelegateDataType) => {
  if (data.balance === -1) return [-1]

  const balance = data.balance
  const totalAmountOfSpace = balance * 9
  const freeSpace = totalAmountOfSpace - data.delegatedBalance
  const divededByMu = calcWithoutMu(freeSpace).toFixed(2)

  return [Number(divededByMu)]
}
