import { GET_USER_DATA } from 'redux/action.types'
import { PRECISION_NUMBER_SIX_ZEROES } from 'utils/consts'
import { State, UserData } from 'utils/interfaces'
import env from 'utils/env'

export const getUserData = (accountPkh: string) => async (dispatch: any, getState: () => State) => {
  try {
    const {
      tokens: {
        lbData: { token_address, lqt_address },
      },
      wallet,
    } = getState()
    console.log(token_address, lqt_address)
    // account that has tokens tz1QhxptJuMYyNAouTdjWsYFcPKknuL92YkJ
    const apiNetwork = env.NODE_ENV === 'production' ? '' : env.rpcTestNetNetwork + '.'
    const xtzBalance = await (await fetch(`https://api.${apiNetwork}tzkt.io/v1/accounts/${accountPkh}/balance`)).json()

    // Test API call for checking on Mainnet
    console.log(token_address, lqt_address)
    //https://api.tzkt.io/v1/tokens/balances?account.eq=tz1QhxptJuMYyNAouTdjWsYFcPKknuL92YkJ&token.contract.in=KT1AafHA1C1vk959wvHWBispY9Y2f3fxBUUo,KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn
    const getTokenBalancesAPIUrl = `https://api.${apiNetwork}tzkt.io/v1/tokens/balances?account.eq=${accountPkh}&token.contract.in=${lqt_address},${token_address}`

    const [firstToken, secondToken] = await (await fetch(getTokenBalancesAPIUrl)).json()

    console.log('Printing out the XTZ Balance: ', xtzBalance)

    let tzBTCBalance = 0,
      lbtBalance = 0

    if (firstToken) {
      if (firstToken.token.metadata.name === 'tzBTC') {
        tzBTCBalance = parseFloat(firstToken.balance) / 10 ** parseFloat(firstToken.token.metadata.decimals)
        lbtBalance = secondToken
          ? parseFloat(secondToken.balance) / 10 ** parseFloat(secondToken.token.metadata.decimals)
          : 0
      } else {
        lbtBalance = parseFloat(firstToken.balance) / 10 ** parseFloat(firstToken.token.metadata.decimals)
        tzBTCBalance = secondToken
          ? parseFloat(secondToken.balance) / 10 ** parseFloat(secondToken.token.metadata.decimals)
          : 0
      }
    }
    const userInfo: UserData = {
      xtzBalance: xtzBalance / PRECISION_NUMBER_SIX_ZEROES || 0,
      tzBTCBalance: tzBTCBalance,
      LBTBalance: lbtBalance,
      // tzBTCBalance:
      //   (firstToken && firstToken.token.metadata.name === 'tzBTC'
      //     ? parseFloat(firstToken?.balance)
      //     : parseFloat(secondToken?.balance)) || 0,
      // LBTBalance:
      //   (firstToken.token.metadata.name === 'Sirius'
      //     ? parseFloat(firstToken?.balance)
      //     : parseFloat(secondToken?.balance)) || 0,
      mvkBalance: 0,
      smvkBalance: 0,
      userAddress: accountPkh,
      realizedPl: 0,
      unrealizedPL: 0,
      estimatedPoolTzBTCOwned: 0,
      estimatedPoolXtzOwned: 0,
    }

    console.log('Printing out User Info: ', userInfo)
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
