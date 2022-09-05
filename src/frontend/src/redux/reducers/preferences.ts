import { PreferencesType } from 'utils/interfaces'
import { getItemFromStorage } from 'utils/utils'
import * as actions from '../action.types'
import { DARK_THEME } from '../actions/preferences.action'

const defaultPreferences: PreferencesType = {
  themeSelected: getItemFromStorage('theme') || DARK_THEME,
  REACT_APP_RPC_PROVIDER: 'https://jakartanet.tezos.marigold.dev/',
  changeNodePopupOpen: false,
  scrollPosition: 0,
  RPC_NODES: [
    { title: 'MARIGOLD', url: 'https://jakartanet.tezos.marigold.dev/', nodeLogoUrl: 'marigold_logo.png' },
    { title: 'ECADLABS', url: 'https://jakartanet.ecadinfra.com', nodeLogoUrl: 'ECAD_logo.png' },
  ],
}

const preferences = (state = defaultPreferences, action: any) => {
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

export default preferences
