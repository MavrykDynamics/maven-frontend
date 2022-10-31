import { Home } from 'pages/Home/Home.controller'
import LiquidityBaking from 'pages/LiquidityBaking/LiquidityBaking.controller'
import { Litepaper } from 'pages/Litepaper/Litepaper.controller'
import { Privacy } from 'pages/Privacy/Privacy.controller'
import { configureStore } from 'redux/storeConfigurator'
import { State } from 'utils/interfaces'
import { Toaster } from './App.components/Toaster/Toaster.controller'
import Loader from './App.components/Loader/Loader.view'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { useSelector } from 'react-redux'

export const store = configureStore({})

export type AppDispatch = ThunkDispatch<State, unknown, AnyAction>
export type GetState = typeof store.getState

export const App = () => {
  return (
    <>
      <Loader />
      <Router>
        {/* <Popup /> */}

        <Switch>
          <Route
            exact
            path="/"
            component={() => {
              return <Home />
            }}
          />
          <Route
            exact
            path="/litepaper"
            component={() => {
              return <Litepaper />
            }}
          />
          <Route
            exact
            path="/privacy"
            component={() => {
              return <Privacy />
            }}
          />
          <Route
            exact
            path="/liquidity-baking"
            component={() => {
              return <LiquidityBaking />
            }}
          />
        </Switch>
        <Toaster />
      </Router>
    </>
  )
}
