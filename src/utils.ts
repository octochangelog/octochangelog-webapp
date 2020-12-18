import { lowerCase } from 'lodash'
import {
  MiscGroupTitles,
  Release,
  ReleaseVersion,
  Repository,
  RepositoryQueryParams,
  SemVerGroupTitles,
} from 'models'
import semver from 'semver'
import title from 'title'

import { HIGH_PRIORITY_GROUP_TITLES, LOW_PRIORITY_GROUP_TITLES } from '~/global'

export function mapRepositoryToQueryParams(
  repository?: Repository
): RepositoryQueryParams {
  return {
    owner: repository?.owner?.login ?? '',
    repo: repository?.name ?? '',
  }
}

export function mapStringToRepositoryQueryParams(
  str: string
): RepositoryQueryParams | null {
  try {
    const [owner, repo] = str.split('/')
    return { owner, repo }
  } catch (e) {
    return null
  }
}

type FilterReleasesNodes = {
  releases: Release[]
  from: ReleaseVersion
  to: ReleaseVersion
}

export function getReleaseVersion(release: Release): string {
  if (release.tag_name === 'latest') {
    return release.name || release.tag_name
  }
  return release.tag_name
}

export function filterReleasesByVersionRange(
  args: FilterReleasesNodes
): Release[] {
  const { releases, from, to: originalTo } = args

  const to =
    originalTo.toLowerCase() === 'latest'
      ? getReleaseVersion(releases[0])
      : originalTo

  // filter version range as (from, to]
  return releases.filter(
    ({ tag_name }) => semver.gt(tag_name, from) && semver.lte(tag_name, to)
  )
}

export function isStableRelease(release: Release): boolean {
  const { tag_name } = release

  return !!semver.valid(tag_name) && !semver.prerelease(tag_name)
}

const customTitleSpecials: string[] = ['DOM', 'ESLint', 'UI']

export function getRepositoryNameDisplay(repoName: string): string {
  return title(repoName.replace(/[_-]/g, ' '), {
    special: customTitleSpecials,
  })
}

// TODO: add tests for all variants
export function getReleaseGroupTitle(
  mdastNode: any
): SemVerGroupTitles | MiscGroupTitles | string {
  const mdastTitle = lowerCase(mdastNode.children[0].value)

  // check features before than breaking changes to group here "Major Features"
  // and avoid grouping them under breaking changes group
  if (mdastTitle.match(/^.*(feature|minor).*$/i)) {
    return SemVerGroupTitles.features
  }

  if (mdastTitle.match(/^.*(breaking.*change|major).*$/i)) {
    return SemVerGroupTitles.breakingChanges
  }

  if (mdastTitle.match(/^.*(bug|fix|patch).*$/i)) {
    return SemVerGroupTitles.bugFixes
  }

  if (mdastTitle.match(/^.*thank.*$/)) {
    return MiscGroupTitles.thanks
  }

  if (mdastTitle.match(/^.*artifact.*$/)) {
    return MiscGroupTitles.artifacts
  }

  if (mdastTitle.match(/^.*credit.*$/)) {
    return MiscGroupTitles.credits
  }

  return mdastTitle
}

const getTitlePriorityGroup = (titleParam: string): -1 | 1 | 0 => {
  if (HIGH_PRIORITY_GROUP_TITLES.includes(titleParam)) {
    return -1
  }

  if (LOW_PRIORITY_GROUP_TITLES.includes(titleParam)) {
    return 1
  }

  return 0
}

// TODO: add tests for all variants
export function compareReleaseGroupTitlesSort(a: string, b: string): number {
  const aPriority = getTitlePriorityGroup(a)
  const bPriority = getTitlePriorityGroup(b)

  // they belong to different priorities group, sort by highest one
  if (aPriority !== bPriority) {
    return aPriority - bPriority
  }

  // they belong to neutral priority group, maintain sort unchanged
  if (aPriority === 0) {
    return 0
  }

  // they belong to high or low priority group,
  // sort by most important one within their group
  const priorityGroupReference =
    aPriority === -1 ? HIGH_PRIORITY_GROUP_TITLES : LOW_PRIORITY_GROUP_TITLES

  const indexOfA = priorityGroupReference.indexOf(a)
  const indexOfB = priorityGroupReference.indexOf(b)

  if (indexOfA < indexOfB) {
    return -1
  }

  if (indexOfA > indexOfB) {
    return 1
  }

  // maintain sort unchanged just in case
  return 0
}

export const releasesComparator = (
  a: Release,
  b: Release,
  order: 'asc' | 'desc' = 'desc'
): number => {
  const { tag_name: verA } = a
  const { tag_name: verB } = b

  if (semver.gt(verA, verB)) {
    return order === 'desc' ? -1 : 1
  } else if (semver.lt(verA, verB)) {
    return order === 'desc' ? 1 : -1
  }

  return 0
}
