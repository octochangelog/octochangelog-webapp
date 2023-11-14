import { type StartOptions } from 'msw'

const IGNORE_HOSTS = ['localhost', 'octoclairvoyant', 'fonts']

type OnUnhandledRequestCallback = StartOptions['onUnhandledRequest']

const unhandledRequestCallback: OnUnhandledRequestCallback = (req, print) => {
	if (req.url.host === 'api.github.com') {
		throw new Error(
			`Unhandled request to GitHub API: ${req.method.toUpperCase()} ${req.url.toString()}`,
		)
	}

	if (IGNORE_HOSTS.some((ignoreHost) => req.url.host.includes(ignoreHost))) {
		return undefined
	}

	print.warning()
}

/**
 * The mock API path must be "" while we use the express server workaround for MSW.
 *
 * When that gets reverted and we can use the regular MSW setup,
 * this can return "https://api.github.com".
 */
const getMockApiPath = (): string => {
	return ''
}

export { unhandledRequestCallback, getMockApiPath }
