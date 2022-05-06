import { combineReducers } from "redux";

import * as actions from "./actions";

const preferences = (state = { darkThemeEnabled: true, scrollPosition: 0 }, action: any) => {
  switch (action.type) {
    case actions.TOGGLE_DARKTHEME:
      return { ...state, darkThemeEnabled: !state.darkThemeEnabled };
    case actions.SCROLL:
      return { ...state, scrollPosition: action.scrollPosition };
    default:
      return state;
  }
};

export default combineReducers({ preferences });