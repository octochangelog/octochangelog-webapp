import { ChakraProvider, CircularProgress, Flex } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Analytics } from '@vercel/analytics/react'
import { resetIdCounter } from 'downshift'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'

import { GithubAuthProvider } from '~/contexts/github-auth-provider'
import customTheme from '~/customTheme'
import { useMsw } from '~/hooks/useMsw'
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
	resetIdCounter()

	const { isReady } = useMsw()

	return (
		<>
			<Analytics />
			<QueryClientProvider client={queryClient}>
				<ChakraProvider theme={customTheme}>
					<GithubAuthProvider>
						<DefaultSeo {...DefaultSEO} />
						{isReady ? (
							<Component {...pageProps} />
						) : (
							<Flex align="center" justify="center" height="100%">
								<CircularProgress
									isIndeterminate
									size="8"
									color="primary.400"
								/>
							</Flex>
						)}
					</GithubAuthProvider>
				</ChakraProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</>
	)
}

export default App
