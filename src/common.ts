import type { MiscGroup, SemVerGroup } from '~/models'

export const IS_PRODUCTION_MODE = process.env.NODE_ENV === 'production'

export const REPO_URL =
  'https://github.com/octoclairvoyant/octoclairvoyant-webapp'

export const SITE_TITLE = 'Octoclairvoyant'

export const BRIEF_DESCRIPTION =
  'Compare GitHub changelogs across multiple releases'

export const FULL_DESCRIPTION =
  'Compare GitHub changelogs across multiple releases in a single view'

export const HIGH_PRIORITY_GROUP_TITLES: Array<SemVerGroup> = [
  'breaking changes',
  'features',
  'bug fixes',
]

export const LOW_PRIORITY_GROUP_TITLES: Array<MiscGroup> = [
  'others',
  'credits',
  'thanks',
  'artifacts',
]

export const GITHUB_RATE_LIMIT_EXCEEDED_ERROR = 'Rate limit exceeded'
