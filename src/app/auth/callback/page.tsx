import { unstable_noStore as noStore } from 'next/cache'
import { type FC } from 'react'

import { obtainAccessToken } from '~/github-client'

export const metadata = {
	title: 'Authorizing on GitHub',
}

async function getAccessToken(): Promise<string> {
	const accessToken = await obtainAccessToken()

	return accessToken
}

const Page: FC = async () => {
	noStore()
	const accessToken = await getAccessToken()
	return (
		<div>
			<h2>Auth success!</h2>
			<p>Access token: {accessToken}</p>
		</div>
	)
}

export default Page
