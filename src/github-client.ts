import { createCallbackAuth } from '@octokit/auth-callback'
import { Octokit } from '@octokit/rest'

import { getGithubAccessToken } from '@/github-auth'

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

const octokit = new Octokit({
	authStrategy: createCallbackAuth,
	auth: { callback: getGithubAccessToken },
	userAgent: getUserAgent(),
})

export { octokit }
