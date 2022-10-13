import { useDispatch, useSelector } from 'react-redux'
import { State } from 'utils/interfaces'
import { LBPersonalStatsView } from './LBPersonalStats.view'
import { useCallback, useEffect, useState } from 'react'
import { GET_PERSONAL_STATS_QUERY, GET_PERSONAL_STATS_VARIABLES } from 'gql/queries/personalStats.query'
import useSWR from 'swr'
import { LBGeneralStats } from '../../LiquidityBaking.view'

export const LBPersonalStats = ({ generalStats }: { generalStats: LBGeneralStats }) => {
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
  const personalStatsQueryVars = GET_PERSONAL_STATS_VARIABLES(accountPkh ?? '')
  const { data: personalStats, error: personalStatsError } = useSWR(
    accountPkh ? [GET_PERSONAL_STATS_QUERY, personalStatsQueryVars] : null,
  )

  console.log('personalStats', personalStats)

  const checkPersonalStatsLoading = !personalStatsError && !personalStats

  const calcEstimatedTzBTCOwned = useCallback(() => {
    if (!personalStats || !personalStats.position.length) return { xtzOut: 0, tzbtcOut: 0 }
    const xtzOut = (+Number(personalStats.position[0].sharesQty) * generalStats.tezPool) / generalStats.sharesTotal
    const tzbtcOut = (+Number(personalStats.position[0].sharesQty) * generalStats.tokenPool) / generalStats.sharesTotal
    return {
      xtzOut,
      tzbtcOut,
    }
  }, [generalStats, personalStats])

  const calcUnrealizedPnL = (usersShares: string, averageSharePriceXTZ: string, currentSharePriceXTZ: string) => {
    let unrealizedPnL = 0
    const positionValueXTZ = Number(usersShares) * Number(currentSharePriceXTZ)
    const avgShareCostXTZ = Number(usersShares) * Number(averageSharePriceXTZ)
    unrealizedPnL = positionValueXTZ - avgShareCostXTZ
    return unrealizedPnL
  }

  useEffect(() => {
    if (!checkPersonalStatsLoading) {
      const { xtzOut, tzbtcOut } = calcEstimatedTzBTCOwned()
      setEstimatedAssetsOwned({
        estimatedPoolXtzOwned: xtzOut,
        estimatedPoolTzBTCOwned: tzbtcOut,
      })
      setPnLStats({
        unrealizedPnL: calcUnrealizedPnL(
          personalStats.position[0]?.sharesQty ?? 0,
          personalStats.position[0]?.avgSharePx ?? 0,
          personalStats.position[0]?.exchange.sharePx ?? 0,
        ),
        realizedPnL: Number(personalStats.position[0]?.realizedPl ?? 0),
      })
    }

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
