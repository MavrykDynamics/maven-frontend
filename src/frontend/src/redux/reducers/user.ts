import { UserData } from 'utils/interfaces'
import * as actions from '../action.types'

export const defaultUser: UserData = {
  xtzBalance: 0,
  tzBTCBalance: 0,
  LBTBalance: 0,
  userAddress: '',
  mvkBalance: 0,
  smvkBalance: 0
}

const user = (state = defaultUser, action: any) => {
  switch (action.type) {
    case actions.GET_USER_DATA:
      return {
        ...state,
        ...action.userData,
      }
    default:
      return state
  }
}

export default user
