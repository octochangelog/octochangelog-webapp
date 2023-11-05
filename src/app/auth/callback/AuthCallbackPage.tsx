'use client'

import { type FC } from 'react'

const AuthCallbackPage: FC = () => {
	// TODO: fetch('api/auth', {method: 'POST'})
	void fetch('/api/auth', { method: 'POST' })

	return (
		<div>
			<h2>Authenticating...</h2>
		</div>
	)
}

export default AuthCallbackPage
