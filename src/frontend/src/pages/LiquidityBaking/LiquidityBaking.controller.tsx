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
import { SPACE_THEME, togglePolicyPopup, toggleRPCNodePopup } from 'redux/actions/preferences.action'
import { dexGqlFetcher } from '../../gql/gql.helpers'
import { SWRConfig } from 'swr'
import { getItemFromStorage, setItemInStorage } from 'utils/utils'
import { ScrollToTop } from 'app/App.components/ScrollToTop/ScrollToTop.controller'
import { PolicyPopup } from 'app/App.components/PolicyPopup/Policy.controller'
import { PopupChangeNode } from 'app/App.components/SettingsPopup/SettingsPopup.controller'
import { useLocation } from 'react-router'
import { useCookies } from 'react-cookie'
import { PolicyPopupContent } from 'app/App.components/PolicyPopup/PolicyPopupContent.controller'
import { PopupChangeNodeView } from 'app/App.components/SettingsPopup/SettingsPopup.view'

const LiquidityBaking = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const [isVisible, setIsVisible] = useState(false)
  const [isIOS, setIsIOS] = useState(true)
  const footerRef = useRef(null)
  const { chartInterval } = useSelector((state: State) => state.chart)
  const { changeNodePopupOpen, policyPopup } = useSelector((state: State) => state.preferences)

  // popup click handlers
  const openChangeNodePopup = useCallback(() => dispatch(toggleRPCNodePopup(true)), [])
  const [{ policyPopup: policyPopupFromCookie = null }, setCookie] = useCookies(['policyPopup'])
  const closeModalHandler = useCallback(() => dispatch(toggleRPCNodePopup(false)), [])
  const proccedPolicy = useCallback(() => {
    setCookie('policyPopup', true)
    dispatch(togglePolicyPopup(false))
  }, [])

  useEffect(() => {
    dispatch(getTokensData())
    dispatch(getTokensPrices())
    dispatch(getGeneralStats())

    if (!getItemFromStorage('theme')) {
      setItemInStorage('theme', SPACE_THEME)
    }

    setIsIOS(
      ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
        (navigator.userAgent.includes('Mac') && 'ontouchend' in document),
    )
  }, [])

  useEffect(() => {
    dispatch(getChartData(chartInterval))
  }, [chartInterval])

  useEffect(() => {
    dispatch(togglePolicyPopup(!Boolean(policyPopupFromCookie)))
  }, [policyPopupFromCookie])

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

  if (isIOS && policyPopup && pathname === '/liquidity-baking') {
    return <PolicyPopupContent proccedPolicy={proccedPolicy} />
  }

  if (isIOS && changeNodePopupOpen) {
    return <PopupChangeNodeView closeModal={closeModalHandler} />
  }

  return (
    <SWRConfig
      value={{
        refreshInterval: 5000,
        fetcher: dexGqlFetcher,
      }}
    >
      <PolicyPopup
        isModalOpened={!isIOS && policyPopup && pathname === '/liquidity-baking'}
        proccedPolicy={proccedPolicy}
      />
      <PopupChangeNode isModalOpened={!isIOS && changeNodePopupOpen} closeModal={closeModalHandler} />
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
