import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { resetIdCounter } from 'downshift'
import type { AppProps } from 'next/app'
import { Inter, Roboto_Mono } from 'next/font/google'
import { DefaultSeo } from 'next-seo'

import VercelAnalytics from '~/components/VercelAnalytics'
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

const interFont = Inter({
	subsets: ['latin'],
})

const robotoMonoFont = Roboto_Mono({
	subsets: ['latin'],
})

const App = ({ Component, pageProps }: AppProps) => {
	resetIdCounter()

	return (
		<>
			<style jsx global>{`
				:root {
					--font-inter: ${interFont.style.fontFamily};
					--font-roboto-mono: ${robotoMonoFont.style.fontFamily};
				}
			`}</style>
			<VercelAnalytics />
			<DefaultSeo {...DefaultSEO} />
			<QueryClientProvider client={queryClient}>
				<ChakraProvider theme={customTheme}>
					<GithubAuthProvider>
						<Component {...pageProps} />
					</GithubAuthProvider>
				</ChakraProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</>
	)
}

export default App
