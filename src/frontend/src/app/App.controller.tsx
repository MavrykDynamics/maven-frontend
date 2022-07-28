import { Home } from 'pages/Home/Home.controller'
import LiquidityBaking from 'pages/LiquidityBaking/LiquidityBaking.controller'
import { Litepaper } from 'pages/Litepaper/Litepaper.controller'
import { Privacy } from 'pages/Privacy/Privacy.controller'
import { useState } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import { Header } from './App.components/Header/Header.controller'
import { Popup } from './App.components/Popup/Popup.controller'

export const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState('/')
  return (
      <Router>
        <Popup />
        <Header />
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
        {/* {currentPage !== '/litepaper' && <Footer />} */}
      </Router>
  )
}
