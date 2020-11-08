import { MiscGroupTitles, SemVerGroupTitles, VersionRange } from '~/models'

export const globalStyles = {
  html: { height: '100%' },
  body: { height: '100%' },
  '#__next': { height: '100%' },
}

export const IS_PRODUCTION_MODE = process.env.NODE_ENV === 'production'

export const EMPTY_VERSION_RANGE: VersionRange = ['', '']

export const REPO_URL = 'https://github.com/Belco90/octoclairvoyant'

export const APP_MOTTO =
  'Compare across GitHub repositories releases with ease '

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
