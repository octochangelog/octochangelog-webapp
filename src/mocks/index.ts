import { rest } from 'msw'
import { type MockedRequest } from 'msw'

const IGNORE_HOSTS = ['localhost', 'octoclairvoyant', 'fonts']

function unhandledRequestCallback(req: MockedRequest) {
	if (req.url.host === 'api.github.com') {
		throw new Error(
			`Unhandled request to GitHub API: ${req.method.toUpperCase()} ${req.url.toString()}`,
		)
	}

	if (IGNORE_HOSTS.some((ignoreHost) => req.url.host.includes(ignoreHost))) {
		return undefined
	}

	// eslint-disable-next-line no-console
	console.warn('Unknown unhandled request', req)
}

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
