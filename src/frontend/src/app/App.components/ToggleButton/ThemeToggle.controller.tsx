import { useSelector } from 'react-redux'
import { useAppDispatch } from 'app/App.hooks'
import { State } from '../../../utils/interfaces'
import { LIGHT_THEME, SPACE_THEME, themeSetterAction, ThemeType } from '../../../redux/actions/preferences.action'
import { useCallback } from 'react'
import { HeaderIcon } from '../Header/Header.style'
import { ThemeToggleButton } from './Toggle-button.style'

export const ThemeToggle = () => {
  const dispatch = useAppDispatch()
  const darkThemeEnabled = useSelector((state: State) => state.preferences.themeSelected !== LIGHT_THEME)
  const setNewThemeHandler = useCallback((newTheme: ThemeType) => dispatch(themeSetterAction(newTheme)), [dispatch])

  const handleThemeToggle = () => {
    setNewThemeHandler(darkThemeEnabled ? LIGHT_THEME : SPACE_THEME)
  }
  return (
    <ThemeToggleButton
      type="button"
      className="theme-toggle"
      $checked={darkThemeEnabled}
      aria-label="Dark mode toggle"
      aria-pressed={darkThemeEnabled}
      onClick={handleThemeToggle}
    >
      <span className="theme-toggle-track">
        <span className="theme-toggle-icon checked">
          <HeaderIcon src="/images/moon.svg" />
        </span>
        <span className="theme-toggle-icon unchecked">
          <HeaderIcon src="/images/sun.svg" />
        </span>
        <span className="theme-toggle-thumb" />
      </span>
    </ThemeToggleButton>
  )
}
