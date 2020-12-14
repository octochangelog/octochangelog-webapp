import { ChakraProvider } from '@chakra-ui/react'
import customTheme from 'customTheme'
import { resetIdCounter } from 'downshift'
import * as gtag from 'gtag'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Router } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import 'focus-visible/dist/focus-visible'

import '~/styles/highlight.styles.github.css'
import { GithubAuthProvider } from '~/contexts/github-auth-provider'

Router.events.on('routeChangeComplete', (url) => {
  gtag.pageView(url)
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5min
    },
  },
})

const App = ({ Component, pageProps }: AppProps) => {
  resetIdCounter()

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={customTheme}>
        <GithubAuthProvider>
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
    </QueryClientProvider>
  )
}

export default App
