import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

// components
import { PopupChangeNodeView } from 'app/App.components/SettingsPopup/SettingsPopup.view'
import { PopupChangeNode } from 'app/App.components/SettingsPopup/SettingsPopup.controller'
import { connect } from 'redux/actions/connectWallet.actions'
import { Toaster } from './App.components/Toaster/Toaster.controller'
import Loader from './App.components/Loader/Loader.view'
import { Home } from 'pages/Home/Home.controller'
import LiquidityBaking from 'pages/LiquidityBaking/LiquidityBaking.controller'
import { Bakery } from 'pages/Bakery/Bakery.controller'
import { Litepaper } from 'pages/Litepaper/Litepaper.controller'
import { Privacy } from 'pages/Privacy/Privacy.controller'

// helpers
import { SPACE_THEME, toggleRPCNodePopup } from 'redux/actions/preferences.action'
import { getItemFromStorage, setItemInStorage } from 'utils/utils'
import { configureStore } from 'redux/storeConfigurator'

// types
import { State } from 'utils/interfaces'

export const store = configureStore({})

export type AppDispatch = ThunkDispatch<State, unknown, AnyAction>
export type GetState = typeof store.getState

export const App = () => {
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
    <>
      <PopupChangeNode isModalOpened={!isIOS && changeNodePopupOpen} closeModal={closeModalHandler} />
      <Loader />
      <Router>
        {/* <Popup /> */}

        <Switch>
          <Route
            exact
            path="/"
            component={Home}
          />
          <Route
            exact
            path="/litepaper"
            component={Litepaper}
          />
          <Route
            exact
            path="/privacy"
            component={Privacy}
          />
          <Route
            exact
            path="/liquidity-baking"
            component={LiquidityBaking}
          />
          <Route
            exact
            path="/bakery"
            component={() => <Bakery openChangeNodePopup={openChangeNodePopup}/>}
          />
        </Switch>
        <Toaster />
      </Router>
    </>
  )
}
