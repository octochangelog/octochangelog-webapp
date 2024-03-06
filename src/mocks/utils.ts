import { type StartOptions } from 'msw/browser'

const IGNORE_HOSTS = ['localhost', 'octochangelog', 'fonts']

type OnUnhandledRequestCallback = StartOptions['onUnhandledRequest']

const unhandledRequestCallback: OnUnhandledRequestCallback = (req, print) => {
	const url = new URL(req.url)
	if (url.host === 'api.github.com') {
		// eslint-disable-next-line no-console
		console.log(
			`Unhandled request to GitHub API: ${req.method.toUpperCase()} ${req.url.toString()}`,
		)
		print.error()
	}

	if (IGNORE_HOSTS.some((ignoreHost) => url.host.includes(ignoreHost))) {
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
