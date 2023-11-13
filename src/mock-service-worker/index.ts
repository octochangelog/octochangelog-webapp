import { http } from 'msw'
import { type StartOptions } from 'msw/browser'

const IGNORE_HOSTS = ['localhost', 'octoclairvoyant', 'fonts']

type OnUnhandledRequestCallback = StartOptions['onUnhandledRequest']

const unhandledRequestCallback: OnUnhandledRequestCallback = (
	request,
	print,
) => {
	const url = new URL(request.url)
	if (url.host === 'api.github.com') {
		throw new Error(
			`Unhandled request to GitHub API: ${request.method.toUpperCase()} ${url.toString()}`,
		)
	}

	if (IGNORE_HOSTS.some((ignoreHost) => url.host.includes(ignoreHost))) {
		return undefined
	}

	print.warning()
}

async function initMocks(): Promise<ServiceWorkerRegistration | undefined> {
	const isServerEnv = typeof window === 'undefined'

	if (isServerEnv) {
		const { server } = await import('./server')
		server.listen({
			onUnhandledRequest: (request, print) => {
				const url = new URL(request.url)
				if (url.host === 'api.github.com') {
					throw new Error(
						`Unhandled request to GitHub API: ${request.method.toUpperCase()} ${url.toString()}`,
					)
				}

				if (IGNORE_HOSTS.some((ignoreHost) => url.host.includes(ignoreHost))) {
					return undefined
				}

				print.warning()
			},
		})
		return Promise.resolve(undefined)
	} else {
		const { worker } = await import('./browser')

		// Make the `worker` and `rest` references available globally,
		// so they can be accessed in both runtime and test suites.
		window.msw = {
			worker,
			http,
		}

		return worker.start({ onUnhandledRequest: unhandledRequestCallback })
	}
}

export { initMocks }
