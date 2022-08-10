import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTokensData } from 'redux/actions/swap.action'
import LiquidityBakingView from './LiquidityBaking.view'
import { getTokensPrices } from 'redux/actions/tokenPrices.action'
import { getChartData } from 'redux/actions/chart.action'
import { State } from 'utils/interfaces'

const LiquidityBaking = () => {
  const dispatch = useDispatch()
  const { chartInterval } = useSelector((state: State) => state.chart)

  useEffect(() => {
    dispatch(getTokensData())
    dispatch(getTokensPrices())
    dispatch(getChartData(chartInterval))
  }, [chartInterval, dispatch])

  return <LiquidityBakingView />
}

export default LiquidityBaking
