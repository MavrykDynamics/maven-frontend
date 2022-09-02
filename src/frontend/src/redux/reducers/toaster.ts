import { ERROR } from "app/App.components/Toaster/Toaster.constants"
import { ToasterState } from "utils/interfaces"
import * as actions from '../action.types'

export const toasterDefaultState: ToasterState = {
  showing: false,
  status: ERROR,
  title: undefined,
  message: undefined,
}

function toaster(state = toasterDefaultState, action: any) {
  switch (action.type) {
    case actions.SHOW_TOASTER:
      return {
        showing: true,
        status: action.status,
        title: action.title,
        message: action.message,
      }
    case actions.HIDE_TOASTER:
      return {
        ...state,
        showing: false,
      }
    default:
      return state
  }
}

export default toaster