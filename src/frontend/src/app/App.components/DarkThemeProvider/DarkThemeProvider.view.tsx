import React from 'react'
import { useSelector } from 'react-redux'
import { DARK_THEME, LIGHT_THEME } from 'redux/actions/preferences.action'
import { ThemeProvider } from 'styled-components'
import { darkMode, lightMode, spaceMode } from 'styles'
import { State } from 'utils/interfaces'

const DarkThemeProvider = ({ children }: any) => {
  const { themeSelected } = useSelector((state: State) => state.preferences)
  return (
    <ThemeProvider
      theme={
        themeSelected === LIGHT_THEME
          ? { isDarkTheme: false, ...lightMode }
          : themeSelected === DARK_THEME
          ? { isDarkTheme: true, ...darkMode }
          : { isDarkTheme: true, ...spaceMode }
      }
    >
      {children}
    </ThemeProvider>
  )
}

export default DarkThemeProvider
