import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import { App } from './app/App.controller'
import { unregister } from './serviceWorker'
import { GlobalStyle } from './styles'

import { ParallaxProvider } from 'react-scroll-parallax'
import store from './store'

import { Provider as ReduxProvider, useSelector } from 'react-redux'

import './styles/fonts.css'
import DarkThemeProvider from 'app/App.components/DarkThemeProvider/DarkThemeProvider.view'

export const Root = () => {
  return (
    <ReduxProvider store={store}>
      <DarkThemeProvider>
        <ParallaxProvider>
          <GlobalStyle />
          <App/>
        </ParallaxProvider>
      </DarkThemeProvider>
    </ReduxProvider>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<Root />, rootElement)

unregister()
