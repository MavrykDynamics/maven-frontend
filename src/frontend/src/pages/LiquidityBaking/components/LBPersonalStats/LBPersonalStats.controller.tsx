import { useDispatch, useSelector } from 'react-redux'
import { State } from 'utils/interfaces'
import { LBPersonalStatsView } from './LBPersonalStats.view'
import { useCallback, useEffect, useState } from 'react'
import { getPersonalStats } from './LBPersonalStats.actions'
import { Dex } from '../../../../utils/DEX/Dex'

export const LBPersonalStats = () => {
  const dispatch = useDispatch()
  const { ready } = useSelector((state: State) => state.wallet)
  const { LBTBalance, xtzBalance, tzBTCBalance, realizedPl, unrealizedPL } = useSelector((state: State) => state.user)
  const {
    lbData: { xtz_pool, lqt_total, token_pool },
  } = useSelector((state: State) => state.tokens)
  const [sirPoolShare, setSirPoolShare] = useState((LBTBalance / lqt_total) * 100)
  const [estimatedAssetsOwned, setEstimatedAssetsOwned] = useState({
    estimatedPoolXtzOwned: 0,
    estimatedPoolTzBTCOwned: 0,
  })
  const dex = new Dex()
  const dexSettings = dex.settings('liquidityBaking')

  const calcEstimatedTzBTCOwned = useCallback(() => {
    const xtzOut = (+LBTBalance * xtz_pool) / lqt_total
    const tzbtcOut = (+LBTBalance * token_pool) / lqt_total
    return {
      xtzOut,
      tzbtcOut,
    }
  }, [LBTBalance, lqt_total, token_pool, xtz_pool])

  useEffect(() => {
    const fetchData = async () => {
      await dex.fetchStorage(dex.lqdContract)
    }

    fetchData()
  }, [dex])

  useEffect(() => {
    dispatch(getPersonalStats())
    const { xtzOut, tzbtcOut } = calcEstimatedTzBTCOwned()
    setEstimatedAssetsOwned({
      estimatedPoolXtzOwned: xtzOut,
      estimatedPoolTzBTCOwned: tzbtcOut,
    })
    setSirPoolShare((LBTBalance / lqt_total) * 100)
  }, [calcEstimatedTzBTCOwned, setEstimatedAssetsOwned, LBTBalance, dispatch, lqt_total])

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
    />
  )
}
