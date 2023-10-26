import { type ReactNode } from 'react'

export const metadata = {
	title: 'Home',
	description: 'Welcome to App router',
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}
