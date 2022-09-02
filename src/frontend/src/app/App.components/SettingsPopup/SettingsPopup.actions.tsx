import { SELECT_NEW_RPC_APP_NODE, SET_RPC_NODES, TOGGLE_RPC_NODE_POPUP } from 'redux/action.types'
import { showToaster } from '../Toaster/Toaster.actions'
import { SUCCESS } from '../Toaster/Toaster.constants'

import type { AppDispatch } from '../../App.controller'
import { RPCNodeType } from 'utils/interfaces'

export const toggleRPCNodePopup = (isOpened: boolean) => (dispatch: AppDispatch) => {
  dispatch({
    type: TOGGLE_RPC_NODE_POPUP,
    isOpened,
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
