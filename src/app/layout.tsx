import { ColorModeScript } from '@chakra-ui/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { type Viewport } from 'next'
import { type FC, type ReactNode, Suspense } from 'react'

import UILayout from '@/app/UILayout'
import { FULL_DESCRIPTION, SITE_TITLE } from '@/common'
import customTheme from '@/custom-theme'
import { interFont, robotoMonoFont } from '@/fonts'

import Providers from './Providers'
import VercelAnalytics from './VercelAnalytics'
import { openGraph } from './shared-metadata'

export const metadata = {
	title: {
		template: `%s | ${SITE_TITLE}`,
		default: SITE_TITLE,
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
			<SpeedInsights />
			<ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
			<Suspense>
				{/* Avoid entire page deopted into client-side rendering */}
				{/* https://nextjs.org/docs/messages/deopted-into-client-rendering */}
				<VercelAnalytics />
			</Suspense>
			<Providers>
				<UILayout>{children}</UILayout>
			</Providers>
		</body>
	</html>
)

export default RootLayout
