import type { MockedRequest } from 'msw'

function unhandledRequestCallback(req: MockedRequest) {
	if (req.url.host.includes('api.github.com')) {
		throw new Error('There must be no unhandled request to GitHub API')
	}

	if (
		req.url.host.includes('localhost') ||
		req.url.host.includes('octoclairvoyant') ||
		req.url.host.includes('fonts')
	) {
		return undefined
	}

	throw new Error('Unknown unhandled request')
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
