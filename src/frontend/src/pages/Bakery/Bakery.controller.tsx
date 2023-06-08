import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// components
import { connect } from 'redux/actions/connectWallet.actions'
import { BakeryView } from './Bakery.view'
import { MenuTopBar } from 'app/App.components/Menu/MenuTopBar.controller'
import { Footer } from 'app/App.components/Footer/Footer.controller'

// helpers
import { SPACE_THEME, toggleRPCNodePopup } from 'redux/actions/preferences.action'
import { getItemFromStorage, setItemInStorage } from 'utils/utils'

// types
import { State } from 'utils/interfaces'
import { SettingPopup } from 'app/App.components/SettingsPopup/SettingsPopup'

export function Bakery() {
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
    ;<SettingPopup isModalOpened showBackdrop={false} closeModal={closeModalHandler} />
  }

  return (
    <>
      <SettingPopup isModalOpened={!isIOS && changeNodePopupOpen} closeModal={closeModalHandler} />
      <MenuTopBar openChangeNodePopupHandler={openChangeNodePopup} />
      <BakeryView />
      <Footer />
    </>
  )
}
