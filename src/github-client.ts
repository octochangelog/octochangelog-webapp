import { createCallbackAuth } from '@octokit/auth-callback'
import { Octokit } from '@octokit/rest'

import { getGithubAccessToken } from '@/github-auth'
import { getIsApiMocked } from '@/utils'

function getUserAgent(): string {
	const userAgent = 'Octoclairvoyant'
	const isVercelEnv =
		process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ||
		process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
	if (isVercelEnv) {
		return userAgent
	}

	return `Test ${userAgent}`
}

function getApiBaseUrl(): string {
	if (getIsApiMocked()) {
		return 'http://localhost:9090'
	}

	return 'https://api.github.com'
}

const octokit = new Octokit({
	authStrategy: createCallbackAuth,
	auth: { callback: getGithubAccessToken },
	userAgent: getUserAgent(),
	baseUrl: getApiBaseUrl(),
})

export { octokit }
