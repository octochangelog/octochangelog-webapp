import { ColorModeScript } from '@chakra-ui/react'
import { type Viewport } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'
import { type FC, type ReactNode, Suspense } from 'react'

import Providers from './Providers'
import VercelAnalytics from './VercelAnalytics'
import { openGraph } from './shared-metadata'

import UILayout from '~/app/UILayout'
import { BRIEF_DESCRIPTION, FULL_DESCRIPTION, SITE_TITLE } from '~/common'
import customTheme from '~/customTheme'

const interFont = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
})

const robotoMonoFont = Roboto_Mono({
	subsets: ['latin'],
	variable: '--font-roboto-mono',
})

export const metadata = {
	title: {
		template: `%s | ${SITE_TITLE}`,
		default: `${SITE_TITLE}: ${BRIEF_DESCRIPTION}`,
	},
	description: FULL_DESCRIPTION,
	openGraph: { ...openGraph },

	// TODO: Move this to `generateViewport` in Next.js v14
	//  https://nextjs.org/docs/app/api-reference/functions/generate-viewport
	themeColor: customTheme.colors.primary['700'],
}

export const viewport: Viewport = {
	colorScheme: 'light dark',
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
			<Providers>
				<UILayout>{children}</UILayout>
			</Providers>
		</body>
	</html>
)

export default RootLayout
