'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { type FC, type ReactNode } from 'react'

import customTheme from '~/customTheme'

// TODO: init ReactQuery
// TODO: init GitHub context

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<CacheProvider>
			<ChakraProvider theme={customTheme}>{children}</ChakraProvider>
		</CacheProvider>
	)
}

export default Providers
