import { TOKEN_QUERY, TOKEN_QUERY_NAME } from 'gql/queries/token.query'
import { fetchFromIndexer } from 'gql/gql.helpers'
import { GET_GENERAL_STATS } from './../action.types'
import dayjs from 'dayjs'

type InteractionAndUsersAccType = {
  users: number
  interactions: number
}

type InteractionAndUsersIncomeType = {
  users: string
  interactions: string
}

export const getGeneralStats = () => async (dispatch: any, getState: any) => {
  try {
    const generalStatsData = await fetchFromIndexer(
      TOKEN_QUERY,
      TOKEN_QUERY_NAME,
      {},
      'https://dex.dipdup.net/v1/graphql',
    )

    const dueToDayNumber = dayjs(generalStatsData.stats1d[0].bucket).add(-1, 'day').date()
    const spliceEndIdx = generalStatsData.stats1d.findIndex(
      ({ bucket }: { bucket: string }) => new Date(bucket).getDate() === dueToDayNumber,
    )
    const interactionsAndUsers = generalStatsData.stats1d.slice(0, spliceEndIdx).reduce(
      (acc: InteractionAndUsersAccType, { users, interactions }: InteractionAndUsersIncomeType) => {
        acc.users += parseFloat(users)
        acc.interactions += parseFloat(interactions)
        return acc
      },
      {
        users: 0,
        interactions: 0,
      },
    )

    const parsedGeneralStatsData = {
      tvlUSD: parseFloat(generalStatsData.token[0].exchanges[0].activities[0].tvlUsd),
      tradeVolume: parseFloat(generalStatsData.token[0].exchanges[0].tradeVolume),
      avgTradingSize:
        generalStatsData.token[0].trades.reduce((acc: number, { tezQty }: { tezQty: string }) => {
          acc += parseFloat(tezQty)
          return acc
        }, 0) / generalStatsData.token[0].trades.length,
      ...interactionsAndUsers,
    }

    dispatch({
      type: GET_GENERAL_STATS,
      generalStats: parsedGeneralStatsData,
    })
  } catch (error: any) {
    console.error(error)
  }
}
