import { createCallbackAuth } from '@octokit/auth-callback'
import { Octokit } from '@octokit/rest'
import { destroyCookie, parseCookies, setCookie } from 'nookies'

function getUserAgent(): string {
	const userAgent = 'Octoclairvoyant'
	if (process.env.VERCEL_ENV === 'production') {
		return userAgent
	}

	return `Test ${userAgent}`
}

function getRedirectUri(): string | undefined {
	const vercelBranchUrl = process.env.VERCEL_BRANCH_URL

	if (vercelBranchUrl) {
		return `${vercelBranchUrl}/auth/callback`
	}

	return undefined
}

const GITHUB_STORAGE_KEY = 'octoclairvoyant-github-access-token' as const

function getGithubAccessToken(): string | undefined {
	const cookies = parseCookies(null)
	return cookies[GITHUB_STORAGE_KEY]
}

function getIsAuth(): boolean {
	return !!getGithubAccessToken()
}

function setGithubAccessToken(newAccessToken?: string | null): void {
	if (newAccessToken === getGithubAccessToken()) {
		return
	}

	if (newAccessToken) {
		setCookie(null, GITHUB_STORAGE_KEY, newAccessToken, {
			maxAge: 31536000, // 1 year
			path: '/',
		})
	} else {
		destroyCookie(null, GITHUB_STORAGE_KEY)
	}
}

const octokit = new Octokit({
	authStrategy: createCallbackAuth,
	auth: { callback: getGithubAccessToken },
	userAgent: getUserAgent(),
})

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

const githubAuthUrl = new URL('https://github.com')
githubAuthUrl.pathname = '/login/oauth/authorize'
githubAuthUrl.searchParams.append(
	'client_id',
	String(process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID),
)
githubAuthUrl.searchParams.append('scope', '')

const redirectUri = getRedirectUri()
if (redirectUri) {
	githubAuthUrl.searchParams.append('redirect_uri', redirectUri)
}

export {
	GITHUB_STORAGE_KEY,
	getGithubAccessToken,
	setGithubAccessToken,
	getIsAuth,
	exchangeCodeByAccessToken,
	octokit,
	githubAuthUrl,
}
