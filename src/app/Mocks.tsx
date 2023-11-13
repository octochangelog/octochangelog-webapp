'use client'

import { http } from 'msw'
import { type FC, useEffect } from 'react'

const getIsApiMockingEnabled = (): boolean =>
	process.env.NEXT_PUBLIC_API_MOCKING === 'enabled' &&
	!process.env.NEXT_PUBLIC_VERCEL_ENV // We don't want to mock the API in the actual Vercel environments

const initBrowserMocks = async () => {
	const { worker } = await import('~/mocks/browser')
	const { unhandledRequestCallback } = await import('~/mocks/utils')

	// Make the `worker` and `http` references available globally,
	// so they can be accessed in both runtime and test suites.
	window.msw = {
		worker,
		http,
	}

	return worker.start({ onUnhandledRequest: unhandledRequestCallback })
}

const Mocks: FC = () => {
	// Inits MSW mocks in the browser.
	useEffect(() => {
		const isApiMockingEnabled = getIsApiMockingEnabled()
		window.isApiMockingEnabled = isApiMockingEnabled

		if (isApiMockingEnabled) {
			// eslint-disable-next-line no-console
			console.log('Init msw in the browser')
			initBrowserMocks()
				.then(() => {
					window.isApiMockingReady = true
				})
				.catch((err) => {
					// eslint-disable-next-line no-console
					console.error(`Error starting msw: ${err}`)
				})
		}
	}, [])

	return null
}

export default Mocks
