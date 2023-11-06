import { type FC } from 'react'

import { exchangeCodeByAccessToken } from '~/github-client'
import { type NextSearchParams } from '~/models'

export const metadata = {
	title: 'Authorizing on GitHub',
}

const Page: FC<{ searchParams: NextSearchParams }> = async ({
	searchParams,
}) => {
	const { code } = searchParams

	if (typeof code !== 'string') {
		throw new Error('Missing GitHub code.')
	}

	const accessToken = await exchangeCodeByAccessToken(code)

	return (
		<div>
			<h2>Auth success!</h2>
			<p>Access token: {accessToken}</p>
		</div>
	)
}

export default Page
