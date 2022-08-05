import { PRECISION_NUMBER } from './consts'

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

// export const checkIfTargetBoundsToOtherTarget = (
//   target: Element | null,
//   target2: Element | null,
//   checkPositionTarget1: 'top' | 'bottom',
//   checkPositionTarget2: 'top' | 'bottom',
//   handleVisible: () => void,
//   handleUnvisible: () => void,
// ) => {
//   if (target && target2) {
//     const firstTargetPosition = {
//       top: window.pageYOffset + target.getBoundingClientRect().top,
//       bottom: window.pageYOffset + target.getBoundingClientRect().bottom,
//     }
//     const secondTargetPosition = {
//       top: window.pageYOffset + target2.getBoundingClientRect().top,
//       bottom: window.pageYOffset + target2.getBoundingClientRect().bottom,
//     }

//     if (firstTargetPosition[checkPositionTarget2] < secondTargetPosition[checkPositionTarget1]) {
//       handleUnvisible()
//     } else {
//       handleVisible()
//     }
//   } else {
//     return
//   }
// }

// export const checkIfElementVisible = (
//   target: Element | null,
//   checkPositionTarget: 'top' | 'bottom',
//   checkPositionWindow: 'top' | 'bottom',
//   handleVisible: () => void,
//   handleUnvisible: () => void,
// ) => {
//   if (target) {
//     const targetPosition = {
//       top: window.pageYOffset + target.getBoundingClientRect().top,
//       bottom: window.pageYOffset + target.getBoundingClientRect().bottom,
//     }
//     const windowPosition = {
//       top: window.pageYOffset,
//       bottom: window.pageYOffset + document.documentElement.clientHeight,
//     }

//     if (targetPosition[checkPositionTarget] < windowPosition[checkPositionWindow]) {
//       handleUnvisible()
//     } else {
//       handleVisible()
//     }
//   } else {
//     return
//   }
// }


export const inputNumberValidation = (value: number | string): any => value >= 0 || value === ''

