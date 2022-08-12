import { GET_USER_DATA } from "redux/action.types"
import { PRECISION_NUMBER_SIX_ZEROES } from "utils/consts"
import { State, UserData } from "utils/interfaces"



export const getUserData = (accountPkh: string) => async (dispatch: any, getState: () => State) => {
  try {
    const {tokens: {lbData : {token_address, lqt_address}}} = getState()

    // account that has tokens tz1QhxptJuMYyNAouTdjWsYFcPKknuL92YkJ
    const xtzBalance = await (await fetch(`https://api.tzkt.io/v1/accounts/${'tz1QhxptJuMYyNAouTdjWsYFcPKknuL92YkJ'}/balance`)).json()
    const [firstToken, secondToken] = await (await fetch(`https://api.tzkt.io/v1/tokens/balances?account.eq=${'tz1QhxptJuMYyNAouTdjWsYFcPKknuL92YkJ'}&token.contract.in=${lqt_address},${token_address}`)).json()

    const userInfo: UserData = {
      xtzBalance: (xtzBalance / PRECISION_NUMBER_SIX_ZEROES) || 0,
      tzBTCBalance: (firstToken.token.metadata.name === 'tzBTC' ? parseFloat(firstToken.balance) : parseFloat(secondToken.balance)) || 0,
      LBTBalance: (firstToken.token.metadata.name === 'Sirius' ? parseFloat(firstToken.balance) : parseFloat(secondToken.balance)) || 0,
      userAddress: accountPkh
    }

    dispatch({
      type: GET_USER_DATA,
      userData: userInfo,
    })
  } catch (error: any) {
    console.error(error)
    dispatch({
      type: GET_USER_DATA,
      userData: {},
    })
  }
}