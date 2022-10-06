import { LiquidityBakingAction } from 'utils/interfaces'
import {
  SWAP_TOKEN_TO_XTZ_ERROR,
  SWAP_TOKEN_TO_XTZ_REQUEST,
  SWAP_TOKEN_TO_XTZ_RESULT,
  SWAP_XTZ_TO_TOKEN_ERROR,
  SWAP_XTZ_TO_TOKEN_REQUEST,
  SWAP_XTZ_TO_TOKEN_RESULT,
} from '../actions/swap.action'
import {
  ADD_LIQUIDITY_ERROR,
  ADD_LIQUIDITY_ONLY_XTZ_ERROR,
  ADD_LIQUIDITY_ONLY_XTZ_REQUEST,
  ADD_LIQUIDITY_ONLY_XTZ_RESULT,
  ADD_LIQUIDITY_REQUEST,
  ADD_LIQUIDITY_RESULT,
  REMOVE_LIQUIDITY_ERROR,
  REMOVE_LIQUIDITY_REQUEST,
  REMOVE_LIQUIDITY_RESULT,
} from '../actions/liquidity.action'

export type SWAP_XTZ_TO_TZBTC =
  | typeof SWAP_XTZ_TO_TOKEN_REQUEST
  | typeof SWAP_XTZ_TO_TOKEN_RESULT
  | typeof SWAP_XTZ_TO_TOKEN_ERROR
export type SWAP_TZBTC_TO_XTZ =
  | typeof SWAP_TOKEN_TO_XTZ_REQUEST
  | typeof SWAP_TOKEN_TO_XTZ_RESULT
  | typeof SWAP_TOKEN_TO_XTZ_ERROR
export type ADD_LIQUIDITY = typeof ADD_LIQUIDITY_REQUEST | typeof ADD_LIQUIDITY_RESULT | typeof ADD_LIQUIDITY_ERROR
export type REMOVE_LIQUIDITY =
  | typeof REMOVE_LIQUIDITY_REQUEST
  | typeof REMOVE_LIQUIDITY_RESULT
  | typeof REMOVE_LIQUIDITY_ERROR
export type ADD_LIQUIDITY_ONLY_XTZ =
  | typeof ADD_LIQUIDITY_ONLY_XTZ_REQUEST
  | typeof ADD_LIQUIDITY_ONLY_XTZ_RESULT
  | typeof ADD_LIQUIDITY_ONLY_XTZ_ERROR
export const defaultLiquidityBaking: LiquidityBakingAction = {
  amount: 0,
  type: undefined,
  error: undefined,
}

const liquidityBaking = (state = defaultLiquidityBaking, action: any) => {
  switch (action.type) {
    case ADD_LIQUIDITY_REQUEST:
    case ADD_LIQUIDITY_ONLY_XTZ_REQUEST:
    case REMOVE_LIQUIDITY_REQUEST:
    case SWAP_XTZ_TO_TOKEN_REQUEST:
    case SWAP_TOKEN_TO_XTZ_REQUEST:
      return {
        ...state,
        amount: action.amount,
      }
    case ADD_LIQUIDITY_RESULT:
    case ADD_LIQUIDITY_ONLY_XTZ_RESULT:
    case REMOVE_LIQUIDITY_RESULT:
    case SWAP_XTZ_TO_TOKEN_RESULT:
    case SWAP_TOKEN_TO_XTZ_RESULT:
      return {
        ...state,
        amount: action.amount,
      }
    case ADD_LIQUIDITY_ERROR:
    case ADD_LIQUIDITY_ONLY_XTZ_ERROR:
    case REMOVE_LIQUIDITY_ERROR:
    case SWAP_XTZ_TO_TOKEN_ERROR:
    case SWAP_TOKEN_TO_XTZ_ERROR:
      return {
        ...state,
        amount: 0,
        error: action.error,
      }

    default:
      return state
  }
}

export default liquidityBaking
