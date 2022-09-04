import type { MockedRequest } from 'msw'

function unhandledRequestCallback(req: MockedRequest) {
	if (req.url.host.includes('api.github.com')) {
		throw new Error(
			`Unhandled request to GitHub API: ${req.method.toUpperCase()} ${req.url.toString()}`
		)
	}

	if (
		req.url.host.includes('localhost') ||
		req.url.host.includes('octoclairvoyant') ||
		req.url.host.includes('fonts')
	) {
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

void initMocks()

export {}
