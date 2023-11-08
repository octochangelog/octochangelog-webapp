import { Inter, Roboto_Mono } from 'next/font/google'

const interFont = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
})

const robotoMonoFont = Roboto_Mono({
	subsets: ['latin'],
	variable: '--font-roboto-mono',
})

export { interFont, robotoMonoFont }
