import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getTokensData } from 'redux/actions/swap.action'
import { fetchFromIndexer } from 'gql/gql.heplers'
import LiquidityBakingView from './LiquidityBaking.view'
import { getTokensPrices } from 'redux/actions/tokenPrices.action'

const LiquidityBaking = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTokensData())
    dispatch(getTokensPrices())
  }, [])

  return <LiquidityBakingView />
}

export default LiquidityBaking
