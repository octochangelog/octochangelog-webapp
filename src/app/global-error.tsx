'use client'

import { ColorModeScript } from '@chakra-ui/react'
import * as Sentry from '@sentry/nextjs'
import { type FC, useEffect } from 'react'

import customTheme from '@/custom-theme'
import { interFont, robotoMonoFont } from '@/fonts'
import { type NextErrorPageProps } from '@/models'

import Providers from './Providers'
import UIError from './UIError'

const GlobalError: FC<NextErrorPageProps> = ({ error, reset }) => {
	useEffect(() => {
		Sentry.captureException(error)
	}, [error])

	return (
		<html
			lang="en"
			className={`${interFont.variable} ${robotoMonoFont.variable}`}
			suppressHydrationWarning
		>
			<body suppressHydrationWarning>
				<ColorModeScript
					initialColorMode={customTheme.config.initialColorMode}
				/>
				<Providers>
					<UIError error={error} reset={reset} />
				</Providers>
			</body>
		</html>
	)
}

export default GlobalError
