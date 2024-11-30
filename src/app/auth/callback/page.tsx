import { type FC } from 'react'

import { AuthCallbackSuccess } from '@/app/auth/callback/UIComponents'
import { exchangeCodeByAccessToken } from '@/github-auth'
import { type NextSearchParams } from '@/models'

export const metadata = {
	title: 'Authorizing on GitHub',
}

const AuthCallbackPage: FC<{ searchParams: NextSearchParams }> = async (
	props,
) => {
	const { code } = await props.searchParams

	if (typeof code !== 'string') {
		throw new Error('Missing GitHub code')
	}

	const accessToken = await exchangeCodeByAccessToken(code)

	return <AuthCallbackSuccess accessToken={accessToken} />
}

export default AuthCallbackPage
