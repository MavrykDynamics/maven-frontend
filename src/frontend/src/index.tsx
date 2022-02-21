import DarkThemeProvider from 'app/App.components/DarkThemeProvider/DarkThemeProvider.view'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { ParallaxProvider } from 'react-scroll-parallax'

import { App } from './app/App.controller'
import { unregister } from './serviceWorker'
import store from './store'
import { GlobalStyle } from './styles'

import './styles/fonts.css'

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
