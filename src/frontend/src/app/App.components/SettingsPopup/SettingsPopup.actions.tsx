import { showToaster } from '../Toaster/Toaster.actions'
import { SUCCESS } from '../Toaster/Toaster.constants'

import type { AppDispatch } from '../../App.controller'
import { RPCNodeType } from 'utils/interfaces'

export const TOGGLE_RPC_NODE_POPUP = 'TOGGLE_RPC_NODE_POPUP'
export const toggleRPCNodePopup = (isOpened: boolean) => (dispatch: AppDispatch) => {
  dispatch({
    type: TOGGLE_RPC_NODE_POPUP,
    isOpened,
  })
}

export const SELECT_NEW_RPC_APP_NODE = 'SET_NEW_RPC_APP_NODE'
export const selectNewRPCNode = (newRPCNode: string, isRemove?: boolean) => (dispatch: AppDispatch) => {
  dispatch({
    type: SELECT_NEW_RPC_APP_NODE,
    newRPCNode,
  })
  if (!isRemove)
    dispatch(showToaster(SUCCESS, 'New RPC link selected', 'The new RPC link has been selected in the DAPP', 3000))
}

export const SET_RPC_NODES = 'SET_RPC_NODES'
export const setNewRPCNodes = (newRPCNodes: Array<RPCNodeType>, isRemove?: boolean) => (dispatch: AppDispatch) => {
  dispatch({
    type: SET_RPC_NODES,
    newRPCNodes,
  })

  if (!isRemove)
    dispatch(showToaster(SUCCESS, 'New RPC link added', 'The new RPC link has been added in the DAPP', 3000))
}
