import { Inter, Roboto_Mono } from 'next/font/google'
import { type FC, type ReactNode } from 'react'

import Providers from '~/app/Providers'

const interFont = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
})

const robotoMonoFont = Roboto_Mono({
	subsets: ['latin'],
	variable: '--font-roboto-mono',
})

export const metadata = {
	title: 'Home',
	description: 'Welcome to App router',
}

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
	<html
		lang="en"
		className={`${interFont.variable} ${robotoMonoFont.variable}`}
	>
		<body>
			{/* ColorModeScript */}
			<Providers>{children}</Providers>
		</body>
	</html>
)

export default RootLayout
