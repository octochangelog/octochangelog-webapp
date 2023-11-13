import { http } from 'msw'

import { unhandledRequestCallback } from '~/mocks/utils'

async function initMocks(): Promise<ServiceWorkerRegistration | undefined> {
	const isServerEnv = typeof window === 'undefined'

	if (isServerEnv) {
		const { server } = await import('./server')
		server.listen({ onUnhandledRequest: unhandledRequestCallback })
		return Promise.resolve(undefined)
	} else {
		const { worker } = await import('./browser')

		// Make the `worker` and `http` references available globally,
		// so they can be accessed in both runtime and test suites.
		window.msw = {
			worker,
			http,
		}

		return worker.start({ onUnhandledRequest: unhandledRequestCallback })
	}
}

export { initMocks }
