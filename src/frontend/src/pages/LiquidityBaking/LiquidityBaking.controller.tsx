import { useCallback, useEffect, useRef, useState } from 'react'
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
import { SPACE_THEME, toggleRPCNodePopup } from 'redux/actions/preferences.action'
import { dexGqlFetcher } from '../../gql/gql.helpers'
import { SWRConfig } from 'swr'
import { getItemFromStorage, setItemInStorage } from 'utils/utils'
import { ScrollToTop } from 'app/App.components/ScrollToTop/ScrollToTop.controller'

const LiquidityBaking = () => {
  const dispatch = useDispatch()
  const [isVisible, setIsVisible] = useState(true)
  const footerRef = useRef(null)
  const { chartInterval } = useSelector((state: State) => state.chart)
  const openChangeNodePopup = useCallback(() => dispatch(toggleRPCNodePopup(true)), [])

  useEffect(() => {
    dispatch(getTokensData())
    dispatch(getTokensPrices())
    dispatch(getGeneralStats())

    if (!getItemFromStorage('theme')) {
      setItemInStorage('theme', SPACE_THEME)
    }
  }, [])

  useEffect(() => {
    dispatch(getChartData(chartInterval))
  }, [chartInterval])

  const observerFn = ([entry]: any) => {
    setIsVisible(!Boolean(entry.isIntersecting))
  }

  useEffect(() => {
    const observer = new IntersectionObserver(observerFn, {
      threshold: 0.1,
    })

    if (footerRef.current) observer.observe(footerRef.current)

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current)
    }
  }, [])

  return (
    <SWRConfig
      value={{
        refreshInterval: 5000,
        fetcher: dexGqlFetcher,
      }}
    >
      <LBStyled>
        <MenuTopBar openChangeNodePopupHandler={openChangeNodePopup} />
        <LiquidityBakingView />
      </LBStyled>
      <div className="footer-wrap" ref={footerRef}>
        <Footer />
      </div>
      <ScrollToTop isVisible={isVisible} />
    </SWRConfig>
  )
}

export default LiquidityBaking
