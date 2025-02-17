import { PreferencesType } from 'utils/interfaces'
import { getItemFromStorage } from 'utils/utils'
import * as actions from '../action.types'
import { DARK_THEME, SPACE_THEME } from '../actions/preferences.action'

const mariGoldUrl = 'https://mainnet.tezos.marigold.dev/'
const ecadLabSUrl = 'https://mainnet.api.tez.ie'

const defaultPreferences: PreferencesType = {
  themeSelected: getItemFromStorage('theme') || SPACE_THEME,
  REACT_APP_RPC_PROVIDER: ecadLabSUrl,
  changeNodePopupOpen: false,
  policyPopup: false,
  scrollPosition: 0,
  RPC_NODES: [
    { title: 'MARIGOLD', url: mariGoldUrl, nodeLogoUrl: 'marigold_logo.png', isUser: false },
    { title: 'ECADLABS', url: ecadLabSUrl, nodeLogoUrl: 'ECAD_logo.png', isUser: false },
  ],
}

const preferences = (state = defaultPreferences, action: any) => {
  switch (action.type) {
    case actions.TOGGLE_DARK_THEME:
      return { ...state, themeSelected: action.newThemeSelected }
    case actions.TOOGLE_POLICY_POPUP:
      return { ...state, policyPopup: action.policyPopup }
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
