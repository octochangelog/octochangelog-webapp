'use client'

import { Analytics } from '@vercel/analytics/react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { type FC, useEffect } from 'react'

const VA_DISABLE_KEY = 'va-disable'
const VA_TOGGLE_HASH = '#va-toggle'

function logToggleVercelAnalyticsAction(action: 'disabled' | 'enabled') {
	// eslint-disable-next-line no-console
	console.log(`Vercel Analytics has been ${action} for this browser`)
}

const VercelAnalytics: FC = () => {
	const { replace } = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(() => {
		const url = new URL(document.URL)
		const shouldToggleVercelAnalytics = url.hash === VA_TOGGLE_HASH

		if (pathname && shouldToggleVercelAnalytics) {
			const isVercelAnalyticsDisabled = !!localStorage.getItem(VA_DISABLE_KEY)

			if (isVercelAnalyticsDisabled) {
				localStorage.removeItem(VA_DISABLE_KEY)
				logToggleVercelAnalyticsAction('enabled')
			} else {
				localStorage.setItem(VA_DISABLE_KEY, '1')
				logToggleVercelAnalyticsAction('disabled')
			}
			replace(pathname, { scroll: false })
		}
	}, [pathname, replace])

	return (
		<Analytics
			beforeSend={(event) => {
				const shouldSkipAnalytics =
					searchParams?.get(VA_DISABLE_KEY) ||
					localStorage.getItem(VA_DISABLE_KEY)

				return shouldSkipAnalytics ? null : event
			}}
		/>
	)
}

export default VercelAnalytics
