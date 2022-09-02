// TODO: extract reducers to different files

import { walletDefaultState, defaultUser, defaultTokens, defaultChart } from '../utils/consts'
import { combineReducers } from 'redux'

import * as actions from './action.types'
import { DARK_THEME } from './actions/preferences.action'
import { ToasterState } from 'utils/interfaces'
import { ERROR } from 'app/App.components/Toaster/Toaster.constants'

export type RPCNodeType = {
  url: string
  title: string
  nodeLogoUrl?: string
  isUser?: boolean
}

const preferences = (
  state = {
    themeSelected: DARK_THEME,
    scrollPosition: 0,
    RPC_NODES: [
      { title: 'MARIGOLD', url: 'https://jakartanet.tezos.marigold.dev/', nodeLogoUrl: 'marigold_logo.png' },
      { title: 'ECADLABS', url: 'https://jakartanet.ecadinfra.com', nodeLogoUrl: 'ECAD_logo.png' },
    ],
  },
  action: any,
) => {
  switch (action.type) {
    case actions.TOGGLE_DARK_THEME:
      return { ...state, themeSelected: action.newThemeSelected }
    case actions.SCROLL:
      return { ...state, scrollPosition: action.scrollPosition }
    case actions.TOGGLE_RPC_NODE_POPUP:
      return { ...state, changeNodePopupOpen: action.isOpened }
    case actions.SELECT_NEW_RPC_APP_NODE:
      return { ...state, REACT_APP_RPC_PROVIDER: action.newRPCNode }
    case actions.SET_RPC_NODES:
      return { ...state, RPC_NODES: action.newRPCNodes }
    default:
      return state
  }
}

const wallet = (state = walletDefaultState, action: any) => {
  switch (action.type) {
    case actions.CONNECT:
      return {
        ...state,
        tezos: action.tezos,
        ready: action.ready,
        accountPkh: action.accountPkh,
      }
    case actions.SET_WALLET:
      return { ...state, wallet: action.wallet }
    default:
      return state
  }
}

const user = (state = defaultUser, action: any) => {
  switch (action.type) {
    case actions.GET_USER_DATA:
      return {
        ...state,
        ...action.userData,
      }
    default:
      return state
  }
}

const tokens = (state = defaultTokens, action: any) => {
  switch (action.type) {
    case actions.GET_TOKENS_DATA:
      return {
        ...state,
        lbData: action.tokensData,
      }
    case actions.GET_TOKENS_PRICES:
      return {
        ...state,
        coinPrices: action.tokensPrices,
      }
    case actions.GET_GENERAL_STATS:
      return {
        ...state,
        stats: {
          ...state.stats,
          ...action.generalStats,
        },
      }
    default:
      return state
  }
}

const chart = (state = defaultChart, action: any) => {
  switch (action.type) {
    case actions.GET_CHART_DATA:
      return {
        ...state,
        chartDataCandlestick: action.chartData.candlestick,
        chartDataArea: action.chartData.area,
      }
    case actions.TOOGLE_CHART_INTERVAL:
      return {
        ...state,
        chartInterval: action.chartInterval,
      }
    case actions.TOOGLE_CHART_TYPE:
      return {
        ...state,
        chartType: action.chartType,
      }
    default:
      return state
  }
}

const toasterDefaultState: ToasterState = {
  showing: false,
  status: ERROR,
  title: undefined,
  message: undefined,
}

export function toaster(state = toasterDefaultState, action: any) {
  switch (action.type) {
    case actions.SHOW_TOASTER:
      return {
        showing: true,
        status: action.status,
        title: action.title,
        message: action.message,
      }
    case actions.HIDE_TOASTER:
      return {
        ...state,
        showing: false,
      }
    default:
      return state
  }
}

export default combineReducers({ preferences, wallet, user, tokens, chart, toaster })
