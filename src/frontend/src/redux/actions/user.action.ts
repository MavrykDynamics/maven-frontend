import { fetchFromIndexer } from 'gql/gql.heplers'
import { USER_INFO_QUERY, USER_INFO_QUERY_NAME, USER_INFO_QUERY_VARIABLES } from 'gql/queries/userInfo'
import { GET_USER_DATA } from 'redux/action.types'
import { PRECISION_NUMBER_SIX_ZEROES } from 'utils/consts'
import { State, UserData } from 'utils/interfaces'

export const getUserData = (accountPkh: string) => async (dispatch: any, getState: () => State) => {
  try {
    const {
      tokens: {
        lbData: { token_address, lqt_address },
      },
    } = getState()

    const accountPkhFake = 'tz1QhxptJuMYyNAouTdjWsYFcPKknuL92YkJ'

    // TODO: use actuall accountPkh
    const xtzBalance = await (await fetch(`https://api.tzkt.io/v1/accounts/${accountPkhFake}/balance`)).json()
    const [firstToken, secondToken] = await (
      await fetch(
        `https://api.tzkt.io/v1/tokens/balances?account.eq=${accountPkhFake}&token.contract.in=${lqt_address},${token_address}`,
      )
    ).json()

    const userInfoFromIndexer = await fetchFromIndexer(
      USER_INFO_QUERY,
      USER_INFO_QUERY_NAME,
      USER_INFO_QUERY_VARIABLES(accountPkhFake),
    )

    console.log('userInfoFromIndexer', userInfoFromIndexer)

    const userInfo: UserData = {
      xtzBalance: xtzBalance / PRECISION_NUMBER_SIX_ZEROES || 0,
      tzBTCBalance:
        (firstToken.token.metadata.name === 'tzBTC'
          ? parseFloat(firstToken.balance)
          : parseFloat(secondToken.balance)) || 0,
      LBTBalance:
        (firstToken.token.metadata.name === 'Sirius'
          ? parseFloat(firstToken.balance)
          : parseFloat(secondToken.balance)) || 0,
      mvkBalance: 0,
      smvkBalance: 0,
      userAddress: accountPkh,
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
