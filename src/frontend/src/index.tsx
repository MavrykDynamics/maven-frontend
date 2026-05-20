import DarkThemeProvider from 'app/App.components/DarkThemeProvider/DarkThemeProvider.view'
import { createRoot } from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
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
        <HelmetProvider>
          <DarkThemeProvider>
            <ParallaxProvider>
              <GlobalStyle />
              <App />
            </ParallaxProvider>
          </DarkThemeProvider>
        </HelmetProvider>
      </ReduxProvider>
    </SWRConfig>
  )
}

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(<Root />)

unregister()
