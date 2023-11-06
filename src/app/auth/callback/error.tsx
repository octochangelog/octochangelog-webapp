'use client'

import { type FC } from 'react'

type ErrorAuthPageProps = {
	error: Error & { digest?: string }
	reset: () => void
}

const ErrorAuthPage: FC<ErrorAuthPageProps> = ({ error }) => {
	return (
		<div>
			<h1>Something went wrong!</h1>

			<p>Description: {error.message}</p>
		</div>
	)
}

export default ErrorAuthPage
