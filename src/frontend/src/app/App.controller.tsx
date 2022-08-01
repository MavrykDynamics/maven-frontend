import { Header } from './App.components/Header/Header.controller'
import { Popup } from './App.components/Popup/Popup.controller'
import { Home } from 'pages/Home/Home.controller'
import LiquidityBaking from 'pages/LiquidityBaking/LiquidityBaking.controller'
import { Litepaper } from 'pages/Litepaper/Litepaper.controller'
import { Privacy } from 'pages/Privacy/Privacy.controller'
import { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { TempleWallet } from '@temple-wallet/dapp'
import { useDispatch } from 'react-redux'
import { setWalletAction } from 'actions'

export const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState('/')
  const dispatch = useDispatch()
  useEffect(() => {
    return TempleWallet.onAvailabilityChange((available) => {
      console.log('available', new TempleWallet(process.env.REACT_APP_NAME || 'MAVRYK'))
      if (available) dispatch(setWalletAction(new TempleWallet(process.env.REACT_APP_NAME || 'MAVRYK')))
    })
  }, [dispatch])

  return (
    <Router>
      <Popup />
      {/* <Header /> */}
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
