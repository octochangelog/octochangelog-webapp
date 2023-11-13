import { type StartOptions } from 'msw/browser'

const IGNORE_HOSTS = ['localhost', 'octoclairvoyant', 'fonts']

type OnUnhandledRequestCallback = StartOptions['onUnhandledRequest']

export const unhandledRequestCallback: OnUnhandledRequestCallback = (
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
