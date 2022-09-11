import { ChakraProvider, CircularProgress, Flex } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { resetIdCounter } from 'downshift'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

import { GithubAuthProvider } from '~/contexts/github-auth-provider'
import customTheme from '~/customTheme'
import { initMocks } from '~/mock-service-worker'
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

const isApiMockingEnabled = process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'

if (typeof window !== 'undefined') {
	window.isApiMockingEnabled = isApiMockingEnabled
}

function prepare(): Promise<ServiceWorkerRegistration | undefined> {
	if (isApiMockingEnabled) {
		return initMocks()
	}

	return Promise.resolve(undefined)
}

function initIsReadyState() {
	return !isApiMockingEnabled
}

function setCypressAppReady(): void {
	// @ts-expect-error FIXME
	if (window.Cypress) {
		// @ts-expect-error FIXME
		window.appReady = true
	}
}

const App = ({ Component, pageProps }: AppProps) => {
	const [isReady, setIsReady] = useState<boolean>(initIsReadyState)

	resetIdCounter()

	useEffect(() => {
		if (!isReady) {
			/**
			 * Deferred mounting with MSW.
			 * This is necessary to make sure the getInitialRepository request
			 * in comparator-context is mocked properly.
			 * https://mswjs.io/docs/recipes/deferred-mounting
			 */
			prepare().finally(() => {
				setIsReady(true)
				setCypressAppReady()
			})
		} else {
			setCypressAppReady()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider theme={customTheme}>
				<GithubAuthProvider>
					<DefaultSeo {...DefaultSEO} />
					{isReady ? (
						<Component {...pageProps} />
					) : (
						<Flex align="center" justify="center" height="100%">
							<CircularProgress isIndeterminate size="8" color="primary.400" />
						</Flex>
					)}
				</GithubAuthProvider>
			</ChakraProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

export default App
