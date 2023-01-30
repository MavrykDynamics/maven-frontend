import { combineReducers } from 'redux'
import chart from './reducers/chart'
import preferences from './reducers/preferences'
import toaster from './reducers/toaster'
import tokens from './reducers/tokens'
import user from './reducers/user'
import wallet from './reducers/wallet'
import bakery from './reducers/bakery'
import { loading } from './reducers/loading'

export default combineReducers({ preferences, wallet, user, tokens, chart, toaster, loading, bakery })
