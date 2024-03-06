import Cookies from 'js-cookie'

const GITHUB_STORAGE_KEY = 'octochangelog-github-access-token' as const

function getGithubAccessToken(): string | undefined {
	return Cookies.get(GITHUB_STORAGE_KEY)
}

function getIsAuth(): boolean {
	return !!getGithubAccessToken()
}

function setGithubAccessToken(newAccessToken?: string | null): void {
	if (newAccessToken === getGithubAccessToken()) {
		return
	}

	if (newAccessToken) {
		// Expires in 1 year from time of creation
		Cookies.set(GITHUB_STORAGE_KEY, newAccessToken, {
			expires: 365,
			sameSite: 'Lax',
		})
	} else {
		Cookies.remove(GITHUB_STORAGE_KEY)
	}
}

/**
 * Exchanges temporary `code` for an access token.
 *
 * https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github
 *
 * Should be used only in the server since it's the only side where
 * `client_secret` is available.
 */
async function exchangeCodeByAccessToken(code: string): Promise<string> {
	const response = await fetch('https://github.com/login/oauth/access_token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify({
			code,
			client_id: process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID,
			client_secret: process.env.GITHUB_APP_CLIENT_SECRET,
		}),
	})

	if (!response.ok) {
		throw new Error('Something went wrong exchanging the code.')
	}

	const responseJson = (await response.json()) as {
		access_token: string
		scope: string
		token_type: string
	}
	return responseJson.access_token
}

function getGitHubAuthUrl({ redirectUrl }: { redirectUrl: string }): URL {
	const githubAuthUrl = new URL('https://github.com')
	githubAuthUrl.pathname = '/login/oauth/authorize'
	githubAuthUrl.searchParams.append(
		'client_id',
		String(process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID),
	)
	githubAuthUrl.searchParams.append('scope', '')
	githubAuthUrl.searchParams.append(
		'redirect_uri',
		`${redirectUrl}/auth/callback`,
	)

	return githubAuthUrl
}

export {
	getGitHubAuthUrl,
	exchangeCodeByAccessToken,
	setGithubAccessToken,
	getIsAuth,
	getGithubAccessToken,
	GITHUB_STORAGE_KEY,
}
