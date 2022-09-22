import { useDispatch, useSelector } from 'react-redux'
import { State } from 'utils/interfaces'
import { LBPersonalStatsView } from './LBPersonalStats.view'
import { useCallback, useEffect, useState } from 'react'
import { Dex } from '../../../../utils/DEX/Dex'
import { GET_PERSONAL_STATS_QUERY, GET_PERSONAL_STATS_VARIABLES } from '../../../../gql/queries/personalStats.query'
import useSWR from 'swr'

export const LBPersonalStats = () => {
  const dispatch = useDispatch()
  const { ready, accountPkh } = useSelector((state: State) => state.wallet)
  const { LBTBalance, xtzBalance, tzBTCBalance, realizedPl, unrealizedPL } = useSelector((state: State) => state.user)
  const {
    lbData: { xtz_pool, lqt_total, token_pool },
  } = useSelector((state: State) => state.tokens)

  const [sirPoolShare, setSirPoolShare] = useState((LBTBalance / lqt_total) * 100)
  const [estimatedAssetsOwned, setEstimatedAssetsOwned] = useState({
    estimatedPoolXtzOwned: 0,
    estimatedPoolTzBTCOwned: 0,
  })
  const [pnLStats, setPnLStats] = useState({
    unrealizedPnL: 0,
    realizedPnL: 0,
  })
  const dex = new Dex()
  const dexSettings = dex.settings('liquidityBaking')

  const personalStatsQueryVars = GET_PERSONAL_STATS_VARIABLES(accountPkh ?? '')
  const { data: personalStats, error: personalStatsError } = useSWR(
    accountPkh ? [GET_PERSONAL_STATS_QUERY, personalStatsQueryVars] : null,
  )
  const checkPersonalStatsLoading = !personalStatsError && !personalStats

  const calcEstimatedTzBTCOwned = useCallback(() => {
    const xtzOut = (+LBTBalance * xtz_pool) / lqt_total
    const tzbtcOut = (+LBTBalance * token_pool) / lqt_total
    return {
      xtzOut,
      tzbtcOut,
    }
  }, [LBTBalance, lqt_total, token_pool, xtz_pool])

  const calcUnrealizedPnL = (usersShares: string, averageSharePriceXTZ: string, currentSharePriceXTZ: string) => {
    let unrealizedPnL = 0
    const positionValueXTZ = Number(usersShares) * Number(currentSharePriceXTZ)
    const avgShareCostXTZ = Number(usersShares) * Number(averageSharePriceXTZ)
    unrealizedPnL = positionValueXTZ - avgShareCostXTZ
    console.log(positionValueXTZ, avgShareCostXTZ)
    return unrealizedPnL
  }
  useEffect(() => {
    const fetchData = async () => {
      await dex.fetchStorage(dex.lqdContract)
    }

    fetchData()
  }, [dex])

  useEffect(() => {
    // dispatch(getPersonalStats())
    const { xtzOut, tzbtcOut } = calcEstimatedTzBTCOwned()
    if (!checkPersonalStatsLoading) {
      setPnLStats({
        unrealizedPnL: calcUnrealizedPnL(
          personalStats.position[0].sharesQty,
          personalStats.position[0].avgSharePx,
          personalStats.position[0].exchange.sharePx,
        ),
        realizedPnL: Number(personalStats.position[0].realizedPl),
      })
    }
    setEstimatedAssetsOwned({
      estimatedPoolXtzOwned: xtzOut,
      estimatedPoolTzBTCOwned: tzbtcOut,
    })
    setSirPoolShare((LBTBalance / lqt_total) * 100)
  }, [
    calcEstimatedTzBTCOwned,
    setEstimatedAssetsOwned,
    LBTBalance,
    dispatch,
    lqt_total,
    setPnLStats,
    checkPersonalStatsLoading,
    personalStats,
  ])

  return (
    <LBPersonalStatsView
      showNone={!ready}
      balances={{
        siriusBalance: LBTBalance,
        xtzBalance,
        tzBTCBalance,
        realizedPl,
        unrealizedPL,
        xtzPool: xtz_pool,
        tzBTCPool: token_pool,
        siriusPool: lqt_total,
      }}
      userPoolShare={sirPoolShare}
      estimatedAssetsOwned={estimatedAssetsOwned}
      pnLStats={pnLStats}
    />
  )
}
