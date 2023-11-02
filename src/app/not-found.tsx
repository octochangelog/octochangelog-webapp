import { type FC } from 'react'

import NotFoundPage from './NotFoundPage'
import { openGraph } from './shared-metadata'

export const metadata = {
	title: 'Not Found',
	description: 'This page could not be found',
	openGraph: { ...openGraph, title: 'Not Found' },
}

const NotFound: FC = () => {
	return <NotFoundPage />
}

export default NotFound
