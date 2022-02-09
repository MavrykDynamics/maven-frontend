export const TOGGLE_DARKTHEME = "TOGGLE_DARKTHEME";

export const toggleDarkTheme = () => ({
  type: TOGGLE_DARKTHEME,
});

export const SCROLL = "SCROLL";

export const scroll = (scrollPosition: number) => ({
  type: SCROLL,
  scrollPosition
});