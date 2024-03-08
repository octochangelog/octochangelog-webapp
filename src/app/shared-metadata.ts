import { type Metadata } from 'next'

import { BRIEF_DESCRIPTION, SITE_TITLE } from '@/common'

export const openGraph: NonNullable<Metadata['openGraph']> = {
	type: 'website',
	url: '/',
	title: SITE_TITLE,
	description: BRIEF_DESCRIPTION,
	images: ['/mascot-icon.png'],
}

export const getMetadataBase: () => URL = () => {
	const vercelUrl = process.env.VERCEL_URL

	if (vercelUrl) {
		return new URL(`https://${process.env.VERCEL_URL}`)
	}

	return new URL(`http://localhost:${process.env.PORT || 3000}`)
}
