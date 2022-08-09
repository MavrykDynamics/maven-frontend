import { PRECISION_NUMBER } from './consts';
import BigNumber from "bignumber.js";

export function calcWithoutPrecision(amount: string): number {
  const numberMu = parseFloat(amount) || 0
  return numberMu > 0 ? numberMu / PRECISION_NUMBER : 0
}

export const getItemFromStorage = (item: string) => {
  const itemFromStorage = localStorage.getItem(item)
  return itemFromStorage ? JSON.parse(itemFromStorage) : null
}

export const setItemInStorage = (item: string, value: any) => {
  localStorage.setItem(item, JSON.stringify(value))

  return getItemFromStorage(item)
}

export const removeItemFromStorage = (item: string) => {
  localStorage.removeItem(item)
}

export const updateItemInStorage = (item: string, updateValue: any) => {
  const itemFromStorage = getItemFromStorage(item)
  const updatedItem = {
    ...itemFromStorage,
    ...updateValue,
  }
  return setItemInStorage(item, updatedItem)
}

export const inputNumberValidation = (value: number | string): any => value >= 0 || value === ''

export const calculateAPY = (xtzPool: number): number => {
  const annualSubsidy =  new BigNumber( (2.5 * 2 * 60 * 24 * 365) * 1000000 )
  const bigIntXTZPool = new BigNumber(xtzPool)
  return bigIntXTZPool.plus(annualSubsidy).dividedBy(bigIntXTZPool).minus(1).dividedBy(2).multipliedBy(100).toNumber()
}

export const diffBetweenCoinsInPersent = (coin1Price : number, coin2Price : number): number => {
  const coinsAverage = (coin1Price + coin2Price) / 2
  const coinDiff = coin1Price - coin2Price

  return coinDiff / 2 / coinsAverage * 100
}