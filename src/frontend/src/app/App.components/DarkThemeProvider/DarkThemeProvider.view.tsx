import React from 'react'
import { useSelector } from 'react-redux'
import { DARK_THEME, LIGHT_THEME } from '../../../redux/actions/preferences.action'
import { ThemeProvider } from 'styled-components'
import { darkMode, lightMode, spaceMode } from 'styles'
import { MavenTheme, State } from 'utils/interfaces'

const DarkThemeProvider = ({ children }: any) => {
  const { themeSelected } = useSelector((state: State) => state.preferences)
  const theme = (themeSelected === LIGHT_THEME
    ? { isDarkTheme: false, ...lightMode }
    : { isDarkTheme: true, ...spaceMode }) as unknown as MavenTheme

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default DarkThemeProvider
