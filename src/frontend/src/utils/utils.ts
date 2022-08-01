import { PRECISION_NUMBER } from './consts'
import { WalletState } from './interfaces'

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

export const parseTimestampToTimerTimeObj = (timestamp: number): Record<string, number> => {
  const currentTimestamp = new Date().getTime()
  const diff = timestamp - currentTimestamp
  return diff > 0
    ? {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      }
    : {}
}

export const calculateAssetAmountOrPrice = ({
  currencyAmount,
  currencyType,
  assetAmount,
  actualPrices,
}: {
  currencyAmount?: number
  currencyType: 'EUR' | 'USD' | 'XTZ'
  assetAmount?: number
  actualPrices: {
    MVK_USD: number
    MVK_EUR: number
    XTZ: number
  }
}): null | number => {
  if (currencyAmount) {
    let calculatedAssetAmount = 0
    switch (currencyType) {
      case 'EUR':
        calculatedAssetAmount = currencyAmount / actualPrices.MVK_EUR
        break
      case 'USD':
        calculatedAssetAmount = currencyAmount / actualPrices.MVK_USD
        break
      case 'XTZ':
        calculatedAssetAmount = (currencyAmount * actualPrices.XTZ) / actualPrices.MVK_USD
        break
    }
    return calculatedAssetAmount
  }

  if (assetAmount) {
    let calculatedCurrencyAmount = 0
    switch (currencyType) {
      case 'EUR':
        calculatedCurrencyAmount = assetAmount * actualPrices.MVK_EUR
        break
      case 'USD':
        calculatedCurrencyAmount = assetAmount * actualPrices.MVK_USD
        break
      case 'XTZ':
        calculatedCurrencyAmount = (assetAmount * actualPrices.MVK_USD) / actualPrices.XTZ
        break
    }
    return calculatedCurrencyAmount
  }

  return null
}

export const performPaymentViaWallet = async (amount: number | string, wallet: WalletState) => {
  console.log('amount', amount, Number(amount) * Math.pow(10, 6))
  console.log('wallet', wallet)

  if (!wallet.ready || !wallet.accountPkh || Number(amount) < 5) {
    // TODO: handle this case
    return
  } else {
    try {
      // set upping the contract from my wallet to somewhere i'll get mvk
      // const contract = await wallet.tezos?.wallet.at(wallet.accountPkh)
      // console.log('contract', contract)
      // // point out the amount i want to spent (XTZ/USD??) or get in MVK
      // // what arguments should come to proposal? Or it can be empty in this case
      // const transaction = await contract?.methods.propose().send({ amount: Number(amount) * Math.pow(10, 6) })
      // console.log('transaction', transaction)
      // // confirming and performing transaction
      // const done = await transaction?.confirmation()
      // console.log('done', done)
    } catch (error: any) {
      console.error(error)
      // TODO: handle error case
    }
  }
}

export const checkIfTargetBoundsToOtherTarget = (
  target: Element | null,
  target2: Element | null,
  checkPositionTarget1: 'top' | 'bottom',
  checkPositionTarget2: 'top' | 'bottom',
  handleVisible: () => void,
  handleUnvisible: () => void,
) => {
  if (target && target2) {
    const firstTargetPosition = {
      top: window.pageYOffset + target.getBoundingClientRect().top,
      bottom: window.pageYOffset + target.getBoundingClientRect().bottom,
    }
    const secondTargetPosition = {
      top: window.pageYOffset + target2.getBoundingClientRect().top,
      bottom: window.pageYOffset + target2.getBoundingClientRect().bottom,
    }

    if (firstTargetPosition[checkPositionTarget2] < secondTargetPosition[checkPositionTarget1]) {
      handleUnvisible()
    } else {
      handleVisible()
    }
  } else {
    return
  }
}

export const checkIfElementVisible = (
  target: Element | null,
  checkPositionTarget: 'top' | 'bottom',
  checkPositionWindow: 'top' | 'bottom',
  handleVisible: () => void,
  handleUnvisible: () => void,
) => {
  if (target) {
    const targetPosition = {
      top: window.pageYOffset + target.getBoundingClientRect().top,
      bottom: window.pageYOffset + target.getBoundingClientRect().bottom,
    }
    const windowPosition = {
      top: window.pageYOffset,
      bottom: window.pageYOffset + document.documentElement.clientHeight,
    }

    if (targetPosition[checkPositionTarget] < windowPosition[checkPositionWindow]) {
      handleUnvisible()
    } else {
      handleVisible()
    }
  } else {
    return
  }
}

export const inputNumberValidation = (value: number | string): any => value >= 0 || value === ''
