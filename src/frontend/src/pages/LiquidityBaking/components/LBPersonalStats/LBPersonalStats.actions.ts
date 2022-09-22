import { fetchFromIndexer } from 'gql/gql.helpers'

import {
  GET_PERSONAL_STATS_QUERY,
  GET_PERSONAL_STATS_QUERY_NAME,
  GET_PERSONAL_STATS_VARIABLES,
} from '../../../../gql/queries/personalStats.query'
import { GET_PERSONAL_STATS } from '../../../../redux/action.types'

export const getPersonalStats = () => async (dispatch: any, getState: any) => {
  const state = getState()

  if (!state.wallet.ready) {
    console.log('Wallet not connected')
    return
  }
  try {
    const personalStatsData = await fetchFromIndexer(
      GET_PERSONAL_STATS_QUERY,
      GET_PERSONAL_STATS_QUERY_NAME,
      GET_PERSONAL_STATS_VARIABLES(state.wallet.accountPkh),
      'https://dex.dipdup.net/v1/graphql',
    )

    const personalStats = {
      realizedPl: 0,
      unrealizedPL: 0,
      estimatedPoolTzBTCOwned: 0,
      estimatedPoolXtzOwned: 0,
    }
    if (personalStatsData.position[0]) {
      const { avgSharePx, exchange, realizedPl, sharesQty } = personalStatsData.position[0]
      personalStats.realizedPl = Number(realizedPl)
    }

    console.log('Logging personal stats', personalStatsData)

    dispatch({
      type: GET_PERSONAL_STATS,
      personalStats: personalStats,
    })
  } catch (error: any) {
    console.error(error)
  }
}
