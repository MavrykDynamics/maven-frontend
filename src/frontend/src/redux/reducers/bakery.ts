// types
import * as actions from '../action.types'
import { BakeryState } from 'utils/interfaces'

// data
import { delegateCardData } from 'pages/Bakery/BakeryData'

export const defaultState: BakeryState = {
  delegates: delegateCardData
}

const bakery = (state = defaultState, action: any) => {
  switch (action.type) {
    case actions.GET_BAKERY_DELEGATES:
      return {
        ...state,
        delegates: action.delegates,
      }
    default:
      return state
  }
}

export default bakery
