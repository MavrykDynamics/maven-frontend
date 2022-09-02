import { AppDispatch } from 'app/App.controller'
import { TOGGLE_DARK_THEME, SCROLL } from 'redux/action.types'
import { setItemInStorage } from 'utils/utils'

export const LIGHT_THEME = 'light'
export const SPACE_THEME = 'space'
export const DARK_THEME = 'dark'

export type ThemeType = typeof LIGHT_THEME | typeof SPACE_THEME | typeof DARK_THEME

export const themeSetterAction = (newThemeSelected: ThemeType) => (dispatch: AppDispatch) => {
  setItemInStorage('theme', newThemeSelected)
  dispatch({
    type: TOGGLE_DARK_THEME,
    newThemeSelected,
  })
}

export const scroll = (scrollPosition: number) => ({
  type: SCROLL,
  scrollPosition,
})
