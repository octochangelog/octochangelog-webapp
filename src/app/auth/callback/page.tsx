import { type FC } from 'react'

import AuthCallbackPage from './AuthCallbackPage'

export const metadata = {
	title: 'Authorizing on GitHub',
}

const Page: FC = () => {
	return <AuthCallbackPage />
}

export default Page
