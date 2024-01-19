import { type MetadataRoute } from 'next'

import { FULL_DESCRIPTION, SITE_TITLE } from '@/common'
import customTheme from '@/custom-theme'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: SITE_TITLE,
		description: FULL_DESCRIPTION,
		short_name: SITE_TITLE,
		theme_color: customTheme.colors.primary['700'],
		icons: [{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }],
	}
}
