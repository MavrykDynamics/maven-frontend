import type { AppDispatch, GetState } from '../../App.controller'
export const SHOW_TOASTER = 'SHOW_TOASTER'
export const HIDE_TOASTER = 'HIDE_TOASTER'

export const hideToaster = () => (dispatch: AppDispatch) => {
  dispatch({
    type: HIDE_TOASTER,
  })
}

export const showToaster =
  (status: string, title: string, message: string, timeout: number = 4000) =>
  (dispatch: AppDispatch, getState: GetState) => {
    const state = getState()
    if (!state.toaster.showing) {
      dispatch({
        type: SHOW_TOASTER,
        status,
        title,
        message,
      })
      setTimeout(() => {
        dispatch(hideToaster())
      }, timeout)
    }
  }
