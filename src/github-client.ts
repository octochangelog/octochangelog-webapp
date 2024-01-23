import { createCallbackAuth } from '@octokit/auth-callback'
import { Octokit } from '@octokit/rest'

import { getGithubAccessToken } from '@/github-auth'

function getUserAgent(): string {
	const userAgent = 'Octoclairvoyant'
	const isVercelEnv = ['production', 'preview'].includes(
		String(process.env.NEXT_PUBLIC_VERCEL_ENV),
	)

	if (isVercelEnv) {
		return userAgent
	}

	return `Test ${userAgent}`
}

const octokit = new Octokit({
	authStrategy: createCallbackAuth,
	auth: { callback: getGithubAccessToken },
	retry: { enabled: false }, // React Query already retries
	userAgent: getUserAgent(),
	baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || undefined,
})

export { octokit }
