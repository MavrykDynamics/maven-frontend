import * as React from 'react'
import ReactDOM from 'react-dom'

import { App } from './app/App.controller'
import { unregister } from './serviceWorker'
import { GlobalStyle } from './styles'

import { ParallaxProvider } from 'react-scroll-parallax'

import './styles/fonts.css'

export const Root = () => {
  return (
    <div>
      <ParallaxProvider>
        <GlobalStyle />
        <App />
      </ParallaxProvider>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<Root />, rootElement)

unregister()
