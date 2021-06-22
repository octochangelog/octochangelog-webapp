import { ChakraProvider } from '@chakra-ui/react'
import { resetIdCounter } from 'downshift'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import 'focus-visible/dist/focus-visible'

import { GithubAuthProvider } from '~/contexts/github-auth-provider'
import customTheme from '~/customTheme'
import * as gtag from '~/lib/gtag'
import DefaultSEO from '~/next-seo.config'

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
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageView(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  resetIdCounter()

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={customTheme}>
        <GithubAuthProvider>
          <DefaultSeo {...DefaultSEO} />
          <Component {...pageProps} />
        </GithubAuthProvider>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
