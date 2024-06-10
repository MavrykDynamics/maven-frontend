import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import {AnyAction} from 'redux'
import {ThunkDispatch} from 'redux-thunk'

// components
import {Toaster} from './App.components/Toaster/Toaster.controller'
import Loader from './App.components/Loader/Loader.view'
import {Home} from 'pages/Home/Home.controller'
import {Litepaper} from 'pages/Litepaper/Litepaper.controller'
import {Privacy} from 'pages/Privacy/Privacy.controller'

// helpers
import {configureStore} from 'redux/storeConfigurator'

// types
import {State} from 'utils/interfaces'

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
          <Route
            exact
            path="/404"
          >
            <Home />
          </Route>
          <Redirect to='/404' />
        </Switch>
        <Toaster />
      </Router>
    </>
  )
}
