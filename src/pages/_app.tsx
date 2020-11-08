import { ChakraProvider } from '@chakra-ui/core'
import customTheme from 'customTheme'
import * as gtag from 'gtag'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Router } from 'next/router'
import NProgress from 'nprogress'
import { ReactQueryConfigProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'

import '~/styles/highlight.styles.github.css'
import '~/styles/nprogress.css'
import { GithubAuthProvider } from '~/contexts/github-auth-provider'

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeError', () => {
  NProgress.done()
})
Router.events.on('routeChangeComplete', (url) => {
  gtag.pageView(url)
  NProgress.done()
})

const globalReactQueryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: 1,
  },
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ReactQueryConfigProvider config={globalReactQueryConfig}>
      <ChakraProvider theme={customTheme}>
        <GithubAuthProvider>
          {/* TODO: chakra-v1 - update global styles config */}
          {/*<Global styles={globalStyles} />*/}
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Component {...pageProps} />
        </GithubAuthProvider>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryConfigProvider>
  )
}

export default App
