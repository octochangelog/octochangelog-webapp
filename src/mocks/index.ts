import { rest } from 'msw'

import { unhandledRequestCallback } from './utils'

async function initMocks(): Promise<ServiceWorkerRegistration | undefined> {
	const isServerEnv = typeof window === 'undefined'

	if (isServerEnv) {
		const { server } = await import('./server')
		server.listen({ onUnhandledRequest: unhandledRequestCallback })
		return Promise.resolve(undefined)
	} else {
		const { worker } = await import('./browser')

		// Make the `worker` and `rest` references available globally,
		// so they can be accessed in both runtime and test suites.
		window.msw = {
			worker,
			rest,
		}

		return worker.start({ onUnhandledRequest: unhandledRequestCallback })
	}
}

export { initMocks }
