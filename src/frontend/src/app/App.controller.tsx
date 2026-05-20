import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

// components
import { Toaster } from './App.components/Toaster/Toaster.controller'
import Loader from './App.components/Loader/Loader.view'
import { Home } from 'pages/Home/Home.controller'
import { Litepaper } from 'pages/Litepaper/Litepaper.controller'
import { Privacy } from 'pages/Privacy/Privacy.controller'

// helpers
import { configureStore } from '../redux/storeConfigurator'

// types
import { State } from 'utils/interfaces'

export const store = configureStore({})

export type AppDispatch = ThunkDispatch<State, unknown, AnyAction>
export type GetState = typeof store.getState

export const App = () => {
  return (
    <>
      <Loader />
      <Router>
        {/* <Popup /> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/litepaper" element={<Litepaper />} />
          <Route path="/privacy" element={<Privacy />} />
          {/*<Route*/}
          {/*  exact*/}
          {/*  path="/liquidity-baking"*/}
          {/*  component={LiquidityBaking}*/}
          {/*/>*/}
          {/*<Route*/}
          {/*  exact*/}
          {/*  path="/bakery"*/}
          {/*  component={Bakery}*/}
          {/*/>*/}
          <Route path="/404" element={<Home />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  )
}
