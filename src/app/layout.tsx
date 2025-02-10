import { ColorModeScript } from '@chakra-ui/react'
import { type Viewport } from 'next'
import { type FC, type ReactNode } from 'react'

import { PirschAnalytics } from '@/app/PirschAnalytics'
import UILayout from '@/app/UILayout'
import { FULL_DESCRIPTION, SITE_TITLE } from '@/common'
import customTheme from '@/custom-theme'
import { interFont, robotoMonoFont } from '@/fonts'

import Providers from './Providers'
import { getMetadataBase, openGraph } from './shared-metadata'

export const metadata = {
	title: {
		template: `%s | ${SITE_TITLE}`,
		default: SITE_TITLE,
	},
	description: FULL_DESCRIPTION,
	metadataBase: getMetadataBase(),
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
			<PirschAnalytics />
			<ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
			<Providers>
				<UILayout>{children}</UILayout>
			</Providers>
		</body>
	</html>
)

export default RootLayout
