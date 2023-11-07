'use client'

import { type FC } from 'react'

import { AuthCallbackError } from './UIComponents'

type ErrorAuthPageProps = {
	error: Error & { digest?: string }
	reset: () => void
}

const ErrorAuthPage: FC<ErrorAuthPageProps> = ({ error }) => {
	return <AuthCallbackError errorMessage={error.message} />
}

export default ErrorAuthPage
