'use client'

import { ColorModeScript } from '@chakra-ui/react'
import { type FC } from 'react'

import customTheme from '~/customTheme'
import { interFont, robotoMonoFont } from '~/fonts'
import { type NextErrorPageProps } from '~/models'

import Providers from './Providers'
import UIError from './UIError'

const GlobalError: FC<NextErrorPageProps> = ({ error, reset }) => {
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
