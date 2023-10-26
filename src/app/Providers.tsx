'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { type FC, type ReactNode } from 'react'

import { GithubAuthProvider } from '~/contexts/github-auth-provider'
import customTheme from '~/customTheme'

// TODO: init ReactQuery

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<CacheProvider>
			<ChakraProvider theme={customTheme}>
				<GithubAuthProvider>{children}</GithubAuthProvider>
			</ChakraProvider>
		</CacheProvider>
	)
}

export default Providers
