import { TOOGLE_POLICY_POPUP } from './../action.types'
import { AppDispatch } from 'app/App.controller'
import { TOGGLE_DARK_THEME, SCROLL } from 'redux/action.types'
import { setItemInStorage } from 'utils/utils'
import { SELECT_NEW_RPC_APP_NODE, SET_RPC_NODES, TOGGLE_RPC_NODE_POPUP } from 'redux/action.types'
import { showToaster } from '../../app/App.components/Toaster/Toaster.actions'
import { SUCCESS } from '../../app/App.components/Toaster/Toaster.constants'
import { RPCNodeType } from 'utils/interfaces'

export const LIGHT_THEME = 'light'
export const SPACE_THEME = 'space'
export const DARK_THEME = 'dark'

export type ThemeType = typeof LIGHT_THEME | typeof SPACE_THEME | typeof DARK_THEME

export const themeSetterAction = (newThemeSelected: ThemeType) => (dispatch: AppDispatch) => {
  setItemInStorage('theme', newThemeSelected)
  dispatch({
    type: TOGGLE_DARK_THEME,
    newThemeSelected,
  })
}

export const scroll = (scrollPosition: number) => ({
  type: SCROLL,
  scrollPosition,
})

export const toggleRPCNodePopup = (isOpened: boolean) => (dispatch: AppDispatch) => {
  dispatch({
    type: TOGGLE_RPC_NODE_POPUP,
    isOpened,
  })
}

export const togglePolicyPopup = (policyPopup: boolean) => (dispatch: AppDispatch) => {
  dispatch({
    type: TOOGLE_POLICY_POPUP,
    policyPopup,
  })
}

export const selectNewRPCNode = (newRPCNode: string) => (dispatch: AppDispatch) => {
  dispatch({
    type: SELECT_NEW_RPC_APP_NODE,
    newRPCNode,
  })
  dispatch(showToaster(SUCCESS, 'New RPC link selected', 'The new RPC link has been selected in the DAPP', 3000))
}

export const setNewRPCNodes = (newRPCNodes: Array<RPCNodeType>) => (dispatch: AppDispatch) => {
  dispatch({
    type: SET_RPC_NODES,
    newRPCNodes,
  })
  dispatch(showToaster(SUCCESS, 'New RPC link added', 'The new RPC link has been added in the DAPP', 3000))
}
