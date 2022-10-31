import { GET_USER_DATA } from 'redux/action.types'
import { PRECISION_NUMBER_SIX_ZEROES } from 'utils/consts'
import { State, UserData } from 'utils/interfaces'
import env from 'utils/env'
import { SIR_CONTRACT, TZBTC_CONTRACT } from './swap.action'

export const getUserData = (newUserAddress?: string) => async (dispatch: any, getState: () => State) => {
  const {
    wallet: { accountPkh },
  } = getState()
  if (!accountPkh && !newUserAddress) return
  try {
    // account that has tokens tz1QhxptJuMYyNAouTdjWsYFcPKknuL92YkJ
    const apiNetwork = env.NODE_ENV === 'production' ? '' : env.rpcTestNetNetwork + '.'
    const xtzBalance = await (
      await fetch(`https://api.${apiNetwork}tzkt.io/v1/accounts/${newUserAddress ?? accountPkh}/balance`)
    ).json()

    // Test API call for checking on Mainnet
    //https://api.tzkt.io/v1/tokens/balances?account.eq=tz1QhxptJuMYyNAouTdjWsYFcPKknuL92YkJ&token.contract.in=KT1AafHA1C1vk959wvHWBispY9Y2f3fxBUUo,KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn
    const getTokenBalancesAPIUrl = `https://api.${apiNetwork}tzkt.io/v1/tokens/balances?account.eq=${
      newUserAddress ?? accountPkh
    }&token.contract.in=${SIR_CONTRACT},${TZBTC_CONTRACT}`

    const [firstToken, secondToken] = await (await fetch(getTokenBalancesAPIUrl)).json()

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
      mvkBalance: 0,
      smvkBalance: 0,
      userAddress: newUserAddress ?? accountPkh ?? '',
      realizedPl: 0,
      unrealizedPL: 0,
      estimatedPoolTzBTCOwned: 0,
      estimatedPoolXtzOwned: 0,
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
