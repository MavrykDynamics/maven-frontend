import {  walletDefaultState, defaultUser } from './utils/consts';
import { combineReducers } from "redux";

import * as actions from "./actions";

const preferences = (state = {darkThemeEnabled: true, scrollPosition: 0}, action: any) => {
  switch (action.type) {
    case actions.TOGGLE_DARKTHEME:
      return { ...state, darkThemeEnabled: !state.darkThemeEnabled };
    case actions.SCROLL:
      return { ...state, scrollPosition: action.scrollPosition };
    default:
      return state;
  }
};

const walletData = (state = {wallet: walletDefaultState, user: defaultUser}, action: any) => {
  console.log('action', action)
  switch (action.type) {
    case actions.CONNECT:
      return {
        ...state,
        wallet: {
          ...state.wallet,
          tezos: action.tezos,
          ready: action.ready,
          accountPkh: action.accountPkh,
        },
      }
    case actions.SET_WALLET:
        return { ...state, wallet: action.wallet }
    default:
      return state;
  }
};

export default combineReducers({preferences, walletData});