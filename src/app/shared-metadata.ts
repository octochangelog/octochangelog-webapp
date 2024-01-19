import { type Metadata } from 'next'

import { BRIEF_DESCRIPTION, SITE_TITLE } from '@/common'

export const openGraph: NonNullable<Metadata['openGraph']> = {
	type: 'website',
	url: '/',
	title: `${SITE_TITLE}: ${BRIEF_DESCRIPTION}`,
	images: [
		{
			url: '/mascot-logo.png',
			height: 600,
			width: 600,
			type: 'image/png',
			alt: 'Octoclairvoyant mascot reading a crystal ball',
		},
	],
}
