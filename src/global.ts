import { MiscGroupTitles, SemVerGroupTitles } from '~/models'

export const globalStyles = {
  html: { height: '100%' },
  body: { height: '100%' },
  '#__next': { height: '100%' },
}

const githubAuthUrl = new URL('https://github.com')
githubAuthUrl.pathname = '/login/oauth/authorize'
githubAuthUrl.searchParams.append(
  'client_id',
  String(process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID)
)
githubAuthUrl.searchParams.append('scope', '')

export { githubAuthUrl }

export const EMPTY_VERSION_RANGE: [string, string] = ['', '']

export const REPO_URL = 'https://github.com/Belco90/octoclairvoyant'

export const GITHUB_COOKIE_KEY = 'gh-access-token'

export const APP_MOTTO =
  'Filter and group GitHub repositories releases to compare changes with ease'

export const HIGH_PRIORITY_GROUP_TITLES: string[] = [
  SemVerGroupTitles.breakingChanges,
  SemVerGroupTitles.features,
  SemVerGroupTitles.bugFixes,
]

export const LOW_PRIORITY_GROUP_TITLES: string[] = [
  MiscGroupTitles.unknown,
  MiscGroupTitles.credits,
  MiscGroupTitles.thanks,
  MiscGroupTitles.artifacts,
]

export const GITHUB_RATE_LIMIT_EXCEEDED_ERROR = 'Rate limit exceeded'
export const GITHUB_UNKNOWN_ERROR = 'Unknown'
