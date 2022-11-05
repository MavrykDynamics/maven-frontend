import { UserData } from 'utils/interfaces'
import * as actions from '../action.types'

export const defaultUser: UserData = {
  xtzBalance: 0,
  tzBTCBalance: 0,
  LBTBalance: 0,
  userAddress: '',
  mvkBalance: 0,
  smvkBalance: 0,
  realizedPl: 0,
  unrealizedPL: 0,
  estimatedPoolTzBTCOwned: 0,
  estimatedPoolXtzOwned: 0,
}

const user = (state = defaultUser, action: any) => {
  switch (action.type) {
    case actions.GET_USER_DATA:
      return {
        ...state,
        ...action.userData,
      }
    case actions.GET_PERSONAL_STATS:
      return {
        ...state,
        realizedPl: action.personalStats.realizedPl,
        unrealizedPL: action.personalStats.unrealizedPL,
        estimatedPoolTzBTCOwned: action.personalStats.estimatedPoolTzBTCOwned,
        estimatedPoolXtzOwned: action.personalStats.estimatedPoolXtzOwned,
      }
    case actions.DISCONNECT:
      return {
        ...defaultUser,
      }
    default:
      return state
  }
}

export default user
