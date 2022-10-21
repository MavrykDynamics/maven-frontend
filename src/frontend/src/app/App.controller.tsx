import { Home } from 'pages/Home/Home.controller'
import LiquidityBaking from 'pages/LiquidityBaking/LiquidityBaking.controller'
import { Litepaper } from 'pages/Litepaper/Litepaper.controller'
import { Privacy } from 'pages/Privacy/Privacy.controller'
import { configureStore } from 'redux/storeConfigurator'
import { State } from 'utils/interfaces'
import { PopupChangeNode } from './App.components/SettingsPopup/SettingsPopup.controller'
import { Toaster } from './App.components/Toaster/Toaster.controller'
import { togglePolicyPopup, toggleRPCNodePopup } from 'redux/actions/preferences.action'
import Loader from './App.components/Loader/Loader.view'

import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { AnyAction } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { PolicyPopup } from './App.components/PolicyPopup/Policy.controller'

export const store = configureStore({})

export type AppDispatch = ThunkDispatch<State, unknown, AnyAction>
export type GetState = typeof store.getState

export const App = () => {
  const [page, setPage] = useState<string | null>(null)
  const dispatch = useDispatch()
  const loader = useSelector((state: State) => state.loading)
  const { changeNodePopupOpen, policyPopup } = useSelector((state: State) => state.preferences)

  const [{ policyPopup: policyPopupFromCookie = null }, setCookie] = useCookies(['policyPopup'])

  useEffect(() => {
    dispatch(togglePolicyPopup(!Boolean(policyPopupFromCookie)))
  }, [policyPopupFromCookie])

  const closeModalHandler = useCallback(() => dispatch(toggleRPCNodePopup(false)), [])
  const proccedPolicy = useCallback(() => {
    setCookie('policyPopup', true)
    dispatch(togglePolicyPopup(false))
  }, [])

  return (
    <Router>
      {/* <Popup /> */}
      <PolicyPopup isModalOpened={policyPopup && page === '/liquidity-baking'} proccedPolicy={proccedPolicy} />
      {loader ? <Loader loaderType={loader} /> : null}
      <Switch>
        <Route
          exact
          path="/"
          component={() => {
            setPage('/')
            return <Home />
          }}
        />
        <Route
          exact
          path="/litepaper"
          component={() => {
            setPage('/litepaper')
            return <Litepaper />
          }}
        />
        <Route
          exact
          path="/privacy"
          component={() => {
            setPage('/privacy')
            return <Privacy />
          }}
        />
        <Route
          exact
          path="/liquidity-baking"
          component={() => {
            setPage('/liquidity-baking')
            return <LiquidityBaking />
          }}
        />
      </Switch>
      <PopupChangeNode isModalOpened={changeNodePopupOpen} closeModal={closeModalHandler} />
      <Toaster />
    </Router>
  )
}
