import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SWRConfig } from 'swr'

// components
import { BakeryView } from './Bakery.view'
import { MenuTopBar } from 'app/App.components/Menu/MenuTopBar.controller'
import { PopupChangeNodeView } from 'app/App.components/SettingsPopup/SettingsPopup.view'
import { PopupChangeNode } from 'app/App.components/SettingsPopup/SettingsPopup.controller'
import { connect } from 'redux/actions/connectWallet.actions'

// helpers
import { dexGqlFetcher } from '../../gql/gql.helpers'
import { SPACE_THEME, toggleRPCNodePopup } from 'redux/actions/preferences.action'
import { getItemFromStorage, setItemInStorage } from 'utils/utils'

// types
import { State } from 'utils/interfaces'

// styles
import { FooterStyled } from "./Bakery.style";

export function Bakery () {
  const dispatch = useDispatch()
  const { changeNodePopupOpen } = useSelector((state: State) => state.preferences)
  const [isIOS, setIsIOS] = useState(true)

  const openChangeNodePopup = useCallback(() => dispatch(toggleRPCNodePopup(true)), [])
  const closeModalHandler = useCallback(() => dispatch(toggleRPCNodePopup(false)), [])

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
        <MenuTopBar openChangeNodePopupHandler={openChangeNodePopup} />
        <PopupChangeNode isModalOpened={!isIOS && changeNodePopupOpen} closeModal={closeModalHandler} />

        <BakeryView />

        <FooterStyled />
    </SWRConfig>
  )
}
