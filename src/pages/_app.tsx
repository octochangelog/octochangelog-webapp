import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { resetIdCounter } from 'downshift'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'

import { GithubAuthProvider } from '~/contexts/github-auth-provider'
import customTheme from '~/customTheme'
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

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
	require('~/msw')
}

const App = ({ Component, pageProps }: AppProps) => {
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
