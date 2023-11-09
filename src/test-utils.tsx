/* eslint-disable no-restricted-imports */
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type {
	RenderHookOptions,
	RenderHookResult,
	RenderOptions,
} from '@testing-library/react'
import { render, renderHook } from '@testing-library/react'
import type { FC, ReactElement, ReactNode } from 'react'

import customTheme from './custom-theme'

/**
 * Testing recommendations by TanStack Query
 * https://tanstack.com/query/v5/docs/react/guides/testing
 */
const testingQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// ✅ turns retries off
			retry: false,
		},
	},
})

/**
 * Custom render setup
 * https://testing-library.com/docs/react-testing-library/setup#custom-render
 */
const AllTheProviders: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<QueryClientProvider client={testingQueryClient}>
			<ChakraProvider theme={customTheme}>{children}</ChakraProvider>
		</QueryClientProvider>
	)
}

const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

const customRenderHook = <TResult, TProps>(
	renderCallback: (initialProps: TProps) => TResult,
	options?: Omit<RenderHookOptions<TProps>, 'wrapper'>,
): RenderHookResult<TResult, TProps> => {
	return renderHook(renderCallback, { ...options, wrapper: AllTheProviders })
}

export * from '@testing-library/react'
export { customRender as render, customRenderHook as renderHook }
