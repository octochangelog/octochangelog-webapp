/* eslint-disable no-restricted-imports */
import { ChakraProvider } from '@chakra-ui/react'
import type {
  RenderHookOptions,
  RenderHookResult,
  Renderer,
} from '@testing-library/react-hooks'
import { renderHook } from '@testing-library/react-hooks'
import type { FunctionComponent } from 'react'
import { QueryClient, QueryClientProvider, setLogger } from 'react-query'

import { GithubAuthProvider } from '~/contexts/github-auth-provider'
import customTheme from '~/customTheme'

const testingQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,

      // ✅ prevents "Jest did not exit one second after the test run completed" error message
      cacheTime: Infinity,
    },
  },
})

setLogger({
  log: console.log,
  warn: console.warn,
  // ✅ no more errors on the console
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  error: () => {},
})

const AllTheProviders: FunctionComponent = ({ children }) => {
  return (
    <QueryClientProvider client={testingQueryClient}>
      <ChakraProvider theme={customTheme}>
        <GithubAuthProvider>{children}</GithubAuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

const customRenderHook = <TProps, TResult>(
  callback: (props: TProps) => TResult,
  options?: Omit<RenderHookOptions<TProps>, 'wrapper'> | undefined
): RenderHookResult<TProps, TResult, Renderer<TProps>> => {
  return renderHook(callback, { ...options, wrapper: AllTheProviders })
}

export * from '@testing-library/react-hooks'
export { customRenderHook as renderHook }
