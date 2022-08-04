import { TOGGLE_DARKTHEME, SCROLL } from "redux/action.types";

export const toggleDarkTheme = () => ({
  type: TOGGLE_DARKTHEME,
});

export const scroll = (scrollPosition: number) => ({
  type: SCROLL,
  scrollPosition
});