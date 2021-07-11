import { createCallbackAuth } from '@octokit/auth-callback'
import { Octokit } from '@octokit/rest'
import { destroyCookie, parseCookies, setCookie } from 'nookies'

import { IS_PRODUCTION_MODE } from '~/common'

const userAgent = IS_PRODUCTION_MODE
  ? 'Octoclairvoyant'
  : 'Test Octoclairvoyant'

const STORAGE_KEY_PREFIX = IS_PRODUCTION_MODE ? '' : 'test-'
const GITHUB_STORAGE_KEY = `${STORAGE_KEY_PREFIX}octoclairvoyant-github-access-token`

export function getGithubAccessToken(): string | undefined {
  const cookies = parseCookies(null, { path: '/' })
  return cookies[GITHUB_STORAGE_KEY]
}

export function setGithubAccessToken(newAccessToken?: string | null): void {
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

export const octokit = new Octokit({
  authStrategy: createCallbackAuth,
  auth: { callback: getGithubAccessToken },
  userAgent,
})

/**
 * Exchanges temporary `code` for an access token.
 *
 * Should be used only in SSR since it's the only side where
 * `client_secret` is available.
 *
 * @param code - The code received as a response to GitHub auth redirect
 */
export async function obtainAccessToken(
  code?: string
): Promise<Error | string> {
  if (!code) {
    throw new Error('Empty code received back from GitHub')
  }

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID,
      client_secret: process.env.GITHUB_APP_CLIENT_SECRET,
      code,
    }),
  })

  if (!response.ok) {
    throw new Error('Something went wrong obtaining access token')
  }

  const responseJson: { access_token: string } = await response.json()
  return responseJson.access_token
}

export const githubAuthUrl = new URL('https://github.com')
githubAuthUrl.pathname = '/login/oauth/authorize'
githubAuthUrl.searchParams.append(
  'client_id',
  String(process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID)
)
githubAuthUrl.searchParams.append('scope', '')
