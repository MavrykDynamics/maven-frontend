import { PRECISION_NUMBER_NINE_ZEROES, PRECISION_NUMBER_SIX_ZEROES } from './consts'
import BigNumber from 'bignumber.js'

export function calcWithoutPrecision(amount: string): number {
  const numberMu = parseFloat(amount) || 0
  return numberMu > 0 ? numberMu / PRECISION_NUMBER_NINE_ZEROES : 0
}

export function calcWithoutMu(amount: string | number): number {
  const numberMu = parseFloat(amount?.toString()) || 0
  return numberMu > 0 ? numberMu / PRECISION_NUMBER_SIX_ZEROES : 0
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

export const parseSrtToNum = (arg: string | number): number => {
  if (typeof arg === 'number') return arg

  if (arg) return parseFloat(arg)

  return 0
}

export const slippagePercentToValue = (slippagePercent: string | number): number => {
  const convertedPercent = parseSrtToNum(slippagePercent)
  return (1 / 100) * convertedPercent
}

export const inputNumberValidation = (value: number | string): any => value >= 0 || value === ''

export const calculateAPY = (xtzPool: number): number => {
  const annualSubsidy = new BigNumber(2.5 * 2 * 60 * 24 * 365)
  const bigIntXTZPool = new BigNumber(xtzPool)
  return bigIntXTZPool.plus(annualSubsidy).dividedBy(bigIntXTZPool).minus(1).dividedBy(2).multipliedBy(100).toNumber()
}

export const diffBetweenCoinsInPercent = (coin1Price: number, coin2Price: number): number => {
  const coinsAverage = coin1Price + coin2Price
  const coinDiff = Math.abs(coin1Price - coin2Price)
  return (coinDiff / 2 / coinsAverage) * 100
}

export const nonNumberSymbolsValidation = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const { key } = e
  if (key === '-' || key === 'e' || key === '+') {
    e.preventDefault()
  }
}

export function isWholeNumber(input: number): boolean {
  return input - Math.floor(input) === 0
}

export const removeDecimal = (number: number): number => {
  return Number(number.toFixed(0))
}

export const getFullNumber = (value?: number | string) => {
  // it's exponential number if e-7 it will scientific notation, every that are < -7 normal notation
  if (Number(value)?.toString().includes('e')) {
    const [number, tenGrade] = Number(value).toString().split('e')
    const [integer = '', decimals = ''] = number.split('.')
    // extra low number
    if (+tenGrade < 0) {
      // how much zeroes we will have
      const newTenGrade = Number(tenGrade) + integer.length

      return `0.${''.padEnd(Math.abs(+newTenGrade), '0')}${integer}${decimals}`
    }
  }

  return value
}

export const percentageDifference = (a: number, b: number) => {
  const value = ((a - b) / ((a + b) / 2)) * 100
  return Math.round(value * 100) / 100
}
