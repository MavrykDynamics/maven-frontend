import {  walletDefaultState, defaultUser, defaultTokens } from './utils/consts';
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
      return state;
  }
};

const user = (state = defaultUser, action: any) => {
  switch (action.type) {
    case actions.GET_USER_DATA:
      return {
        ...state,
        ...action.userData,
      }
    // case UPDATE_USER_DATA:
    //   const userState = state.user
    //   // @ts-ignore
    //   userState[action.userKey] = action.userValue
    //   return {
    //     type: UPDATE_USER_DATA,
    //     user: userState,
    //   }
    default:
      return state
  }
};

const tokens = (state = defaultTokens, action: any) => {
  switch (action.type) {
    case actions.GET_TOKENS_DATA:
      return {
        ...state,
        ...action.tokensData,
      }
    default:
      return state
  }
};

export default combineReducers({preferences, wallet, user, tokens});