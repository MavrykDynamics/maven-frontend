import LBFAQ from './components/FAQ/FAQ.controller'
import { LBAction } from './components/LBAction/LBAction.controller'
import { LBChart } from './components/LBChart/LBChart.controller'
import LBHeader from './components/LBHeader/LBHeader.controller'
import { LBPersonalStats } from './components/LBPersonalStats/LBPersonalStats.controller'
import { useEffect, useState } from 'react'
import { GET_GENERAL_STATS_QUERY, GET_GENERAL_STATS_VARIABLES } from '../../gql/queries/generalStats.query'
import useSWR from 'swr'

export interface LBGeneralStats {
  address: string
  midPrice: number
  name: string
  originatedAt: string
  sharePx: number
  sharePxBtc: number
  sharePxUsd: number
  sharesTotal: number
  standard: string
  tezPool: number
  tokenId: string
  tokenPool: number
  tradeVolume: number
  typeHash: number
}

const LiquidityBakingView = () => {
  const [generalDexStats, setGeneralDexStats] = useState<LBGeneralStats>({
    address: '',
    midPrice: 0,
    name: '',
    originatedAt: '',
    sharePx: 0,
    sharePxBtc: 0,
    sharePxUsd: 0,
    sharesTotal: 0,
    standard: '',
    tezPool: 0,
    tokenId: '',
    tokenPool: 0,
    tradeVolume: 0,
    typeHash: 0,
  })

  const generalStatsQueryVars = GET_GENERAL_STATS_VARIABLES()
  const { data: generalStats, error: generalStatsError } = useSWR([GET_GENERAL_STATS_QUERY, generalStatsQueryVars])

  const checkGeneralStatsLoading = !generalStatsError && !generalStats

  useEffect(() => {
    if (!checkGeneralStatsLoading && generalStats?.exchange) {
      setGeneralDexStats({
        address: generalStats.exchange[0].address,
        midPrice: Number(generalStats.exchange[0].midPrice),
        name: generalStats.exchange[0].name,
        originatedAt: generalStats.exchange[0].originatedAt,
        sharePx: Number(generalStats.exchange[0].sharePx),
        sharePxBtc: Number(generalStats.exchange[0].sharePxBtc),
        sharePxUsd: Number(generalStats.exchange[0].sharePxUsd),
        sharesTotal: Number(generalStats.exchange[0].sharesTotal),
        standard: generalStats.exchange[0].standard,
        tezPool: Number(generalStats.exchange[0].tezPool),
        tokenId: generalStats.exchange[0].tokenId,
        tokenPool: Number(generalStats.exchange[0].tokenPool),
        tradeVolume: Number(generalStats.exchange[0].tradeVolume),
        typeHash: generalStats.exchange[0].typeHash,
      })
    }
  }, [setGeneralDexStats, generalStats, checkGeneralStatsLoading])

  return (
    <div className="content-wrapper">
      {/* <LBHeader /> */}
      <div className="middle-block">
        {/* <LBPersonalStats generalStats={generalDexStats} /> */}
        <LBAction generalDexStats={generalDexStats} />
      </div>
      <LBChart className="desktop-chart" />
      {/* <LBFAQ /> */}
    </div>
  )
}

export default LiquidityBakingView
