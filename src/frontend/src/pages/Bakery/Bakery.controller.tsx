import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { useCookies } from 'react-cookie'

// components
import { PopupChangeNodeView } from 'app/App.components/SettingsPopup/SettingsPopup.view'
import { PopupChangeNode } from 'app/App.components/SettingsPopup/SettingsPopup.controller'
import { connect } from 'redux/actions/connectWallet.actions'
import { BakeryView } from './Bakery.view'
import { MenuTopBar } from 'app/App.components/Menu/MenuTopBar.controller'
import { PolicyPopup } from 'app/App.components/PolicyPopup/Policy.controller'
import { PolicyPopupContent } from 'app/App.components/PolicyPopup/PolicyPopupContent.controller'

// styles
import { FooterStyled } from "./Bakery.style";

// helpers
import { SPACE_THEME, toggleRPCNodePopup, togglePolicyPopup } from 'redux/actions/preferences.action'
import { getItemFromStorage, setItemInStorage } from 'utils/utils'

// types
import { State } from 'utils/interfaces'

export function Bakery () {
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const { changeNodePopupOpen, policyPopup } = useSelector((state: State) => state.preferences)
  const [{ policyPopup: policyPopupFromCookie = null }, setCookie] = useCookies(['policyPopup'])
  const [isIOS, setIsIOS] = useState(true)

  const openChangeNodePopup = useCallback(() => dispatch(toggleRPCNodePopup(true)), [])
  const closeModalHandler = useCallback(() => dispatch(toggleRPCNodePopup(false)), [])
  const proccedPolicy = useCallback(() => {
    setCookie('policyPopup', true)
    dispatch(togglePolicyPopup(false))
  }, [])

  useEffect(() => {
    if (
      localStorage.getItem('beacon:active-account') &&
      localStorage.getItem('beacon:active-account') !== 'undefined'
    ) {
      dispatch(connect())
    }

    if (!getItemFromStorage('theme')) {
      setItemInStorage('theme', SPACE_THEME)
    }

    setIsIOS(
      ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform),
    )
  }, [])

  useEffect(() => {
    dispatch(togglePolicyPopup(!Boolean(policyPopupFromCookie)))
  }, [policyPopupFromCookie])

  if (isIOS && policyPopup && pathname === '/liquidity-baking') {
    return <PolicyPopupContent proccedPolicy={proccedPolicy} />
  }

  if (isIOS && changeNodePopupOpen) {
    return <PopupChangeNodeView closeModal={closeModalHandler} />
  }

  return (
    <>
      <PolicyPopup
        isModalOpened={!isIOS && policyPopup && pathname === '/bakery'}
        proccedPolicy={proccedPolicy}
      />
      <PopupChangeNode isModalOpened={!isIOS && changeNodePopupOpen} closeModal={closeModalHandler} />
      <MenuTopBar openChangeNodePopupHandler={openChangeNodePopup} />
      <BakeryView />
      <FooterStyled />
    </>
  )
}
