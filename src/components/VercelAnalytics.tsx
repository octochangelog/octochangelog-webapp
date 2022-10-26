import { Analytics } from '@vercel/analytics/react'

const VercelAnalytics = () => {
	return (
		<Analytics
			beforeSend={(event) => {
				const VA_DISABLE_KEY = 'va-disable'
				const url = new URL(event.url)

				if (url.searchParams.get(VA_DISABLE_KEY)) {
					return null
				}

				if (localStorage.getItem(VA_DISABLE_KEY)) {
					return null
				}

				return event
			}}
		/>
	)
}

export default VercelAnalytics
