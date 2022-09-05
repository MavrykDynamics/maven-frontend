import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTokensData } from 'redux/actions/swap.action'
import LiquidityBakingView from './LiquidityBaking.view'
import { getTokensPrices } from 'redux/actions/tokenPrices.action'
import { getChartData } from 'redux/actions/chart.action'
import { State } from 'utils/interfaces'
import { getGeneralStats } from 'redux/actions/stats.action'
import { MenuTopBar } from 'app/App.components/Menu/MenuTopBar.controller'
import { Footer } from 'app/App.components/Footer/Footer.controller'
import { LBStyled } from './LiquidityBaking.styles'
import { toggleRPCNodePopup } from 'redux/actions/preferences.action'

const LiquidityBaking = () => {
  const dispatch = useDispatch()
  const { chartInterval } = useSelector((state: State) => state.chart)
  const openChangeNodePopup = useCallback(() => dispatch(toggleRPCNodePopup(true)), [])

  useEffect(() => {
    dispatch(getTokensData())
    dispatch(getTokensPrices())
    dispatch(getChartData(chartInterval))
    dispatch(getGeneralStats())
  }, [chartInterval, dispatch])

  return (
    <>
      <LBStyled>
        <MenuTopBar openChangeNodePopupHandler={openChangeNodePopup} />
        <LiquidityBakingView />
      </LBStyled>
      <Footer />
    </>
  )
}

export default LiquidityBaking
