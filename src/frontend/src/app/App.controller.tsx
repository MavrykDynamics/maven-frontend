import { Home } from 'pages/Home/Home.controller'
import LiquidityBaking from 'pages/LiquidityBaking/LiquidityBaking.controller'
import { Litepaper } from 'pages/Litepaper/Litepaper.controller'
import { Privacy } from 'pages/Privacy/Privacy.controller'
import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { TempleWallet } from '@temple-wallet/dapp'
import { useDispatch, useSelector } from 'react-redux'
import { configureStore } from 'redux/storeConfigurator'
import { setWalletAction } from 'redux/actions/wallet.action'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { State } from 'utils/interfaces'
import { PopupChangeNode } from './App.components/SettingsPopup/SettingsPopup.controller'
import { Toaster } from './App.components/Toaster/Toaster.controller'
import { toggleRPCNodePopup } from 'redux/actions/preferences.action'
import Loader from './App.components/Loader/Loader.view'

export const store = configureStore({})

export type AppDispatch = ThunkDispatch<State, unknown, AnyAction>
export type GetState = typeof store.getState

export const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState('/')
  const loader = useSelector((state: State) => state.loading)
  const { changeNodePopupOpen } = useSelector((state: State) => state.preferences)
  const closeModalHandler = useCallback(() => dispatch(toggleRPCNodePopup(false)), [])

  const dispatch = useDispatch()
  useEffect(() => {
    return TempleWallet.onAvailabilityChange((available) => {
      console.log('available', new TempleWallet(process.env.REACT_APP_NAME || 'MAVRYK'))
      if (available) dispatch(setWalletAction(new TempleWallet(process.env.REACT_APP_NAME || 'MAVRYK')))
    })
  }, [dispatch])

  return (
    <Router>
      {/* <Popup /> */}
      {loader ? <Loader loaderType={loader} /> : null}
      <Switch>
        <Route
          exact
          path="/"
          component={() => {
            setCurrentPage('/')
            return <Home />
          }}
        />
        <Route
          exact
          path="/litepaper"
          component={() => {
            setCurrentPage('/litepaper')
            return <Litepaper />
          }}
        />
        <Route
          exact
          path="/privacy"
          component={() => {
            setCurrentPage('/')
            return <Privacy />
          }}
        />
        <Route
          exact
          path="/liquidity-baking"
          component={() => {
            setCurrentPage('/liquidity-baking')
            return <LiquidityBaking />
          }}
        />
      </Switch>
      <PopupChangeNode isModalOpened={changeNodePopupOpen} closeModal={closeModalHandler} />
      <Toaster />
    </Router>
  )
}
