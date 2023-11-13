import { ColorModeScript } from '@chakra-ui/react'
import { type Viewport } from 'next'
import { type FC, type ReactNode, Suspense } from 'react'

import UILayout from '~/app/UILayout'
import { BRIEF_DESCRIPTION, FULL_DESCRIPTION, SITE_TITLE } from '~/common'
import customTheme from '~/custom-theme'
import { interFont, robotoMonoFont } from '~/fonts'

import Mocks from './Mocks'
import Providers from './Providers'
import VercelAnalytics from './VercelAnalytics'
import { openGraph } from './shared-metadata'

export const metadata = {
	title: {
		template: `%s | ${SITE_TITLE}`,
		default: `${SITE_TITLE}: ${BRIEF_DESCRIPTION}`,
	},
	description: FULL_DESCRIPTION,
	openGraph: { ...openGraph },
}

export const viewport: Viewport = {
	colorScheme: 'light dark',
	themeColor: [
		{
			media: '(prefers-color-scheme: light)',
			color: customTheme.colors.primary['300'],
		},
		{
			media: '(prefers-color-scheme: dark)',
			color: customTheme.colors.primary['700'],
		},
	],
}

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
	<html
		lang="en"
		className={`${interFont.variable} ${robotoMonoFont.variable}`}
		suppressHydrationWarning
	>
		<body suppressHydrationWarning>
			<ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
			<Suspense>
				{/* Avoid entire page deopted into client-side rendering */}
				{/* https://nextjs.org/docs/messages/deopted-into-client-rendering */}
				<VercelAnalytics />
			</Suspense>
			<Mocks />
			<Providers>
				<UILayout>{children}</UILayout>
			</Providers>
		</body>
	</html>
)

export default RootLayout
