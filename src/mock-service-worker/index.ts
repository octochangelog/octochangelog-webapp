import type { MockedRequest } from 'msw'

const IGNORE_HOSTS = ['localhost', 'octoclairvoyant', 'fonts']

function unhandledRequestCallback(req: MockedRequest) {
	if (req.url.host === 'api.github.com') {
		throw new Error(
			`Unhandled request to GitHub API: ${req.method.toUpperCase()} ${req.url.toString()}`
		)
	}

	if (IGNORE_HOSTS.some((ignoreHost) => req.url.host.includes(ignoreHost))) {
		return undefined
	}

	// eslint-disable-next-line no-console
	console.warn('Unknown unhandled request', req)
}

async function initMocks() {
	const isServerEnv = typeof window === 'undefined'

	if (isServerEnv) {
		const { server } = await import('./server')
		server.listen({ onUnhandledRequest: unhandledRequestCallback })
	} else {
		const { worker } = await import('./browser')
		void worker.start({ onUnhandledRequest: unhandledRequestCallback })
	}
}

export { initMocks }
