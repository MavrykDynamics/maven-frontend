export type BakeryDelegateDataType = {
  balance: number
  delegatedBalance: number
}

export const getBakeryDelegateData = async (bakerAddress: string): Promise<BakeryDelegateDataType> => {
  const response = await fetch(`https://api.tzkt.io/v1/delegates/${bakerAddress}`)
  const result = await response.json()
  return result
}
