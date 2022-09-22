import DarkThemeProvider from 'app/App.components/DarkThemeProvider/DarkThemeProvider.view'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { ParallaxProvider } from 'react-scroll-parallax'

import { App, store } from './app/App.controller'
import { unregister } from './serviceWorker'
import { GlobalStyle } from './styles'

import './styles/fonts.css'
import { SWRConfig } from 'swr'
import { mavrykGqlFetcher } from './gql/gql.helpers'

export const Root = () => {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: mavrykGqlFetcher,
      }}
    >
      <ReduxProvider store={store}>
        <DarkThemeProvider>
          <ParallaxProvider>
            <GlobalStyle />
            <App />
          </ParallaxProvider>
        </DarkThemeProvider>
      </ReduxProvider>
    </SWRConfig>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<Root />, rootElement)

unregister()
