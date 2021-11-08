import { Home } from 'pages/Home/Home.controller'
import { Litepaper } from 'pages/Litepaper/Litepaper.controller'
import { Privacy } from 'pages/Privacy/Privacy.controller'
import React, { useState } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Footer } from './App.components/Footer/Footer.controller'

import { Header } from './App.components/Header/Header.controller'
import { Popup } from './App.components/Popup/Popup.controller'

export const App = () => {
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
      </Switch>
      {currentPage !== '/litepaper' && <Footer />}
    </Router>
  )
}
