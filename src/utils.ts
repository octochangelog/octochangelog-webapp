import { lowerCase } from 'lodash'
import {
  MiscGroupTitles,
  Release,
  RepositoryQueryParams,
  SemVerGroupTitles,
} from 'models'
import semver from 'semver'
import title from 'title'

import { HIGH_PRIORITY_GROUP_TITLES, LOW_PRIORITY_GROUP_TITLES } from '~/global'

const githubRepoRegExp = /((git@|http(s)?:\/\/)(www\.)?(github\.com)([/:]))([\w,\-_.]+)\/([\w,\-_.]+)(.git)?((\/)?)/i

export function getRepositoryDataFromUrl(
  url: string
): RepositoryQueryParams | null {
  let repoObj = null

  try {
    const matchGroups = url.match(githubRepoRegExp)
    const owner = matchGroups?.[7]
    const repo = matchGroups?.[8]?.replace('.git', '') // remove .git suffix for repo names like next.js

    if (owner && repo) {
      repoObj = {
        repo,
        owner,
      }
    }
  } catch (e) {
    // do nothing
  }

  return repoObj
}

type FilterReleasesNodes = {
  releases: Release[]
  from: string
  to: string
}

export function filterReleasesByVersionRange(
  args: FilterReleasesNodes
): Release[] {
  const { releases, from, to } = args

  // filter version range as (from, to]
  return releases.filter(
    ({ tag_name }) => semver.gt(tag_name, from) && semver.lte(tag_name, to)
  )
}

const customTitleSpecials: string[] = ['DOM', 'ESLint']

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

const getTitlePriorityGroup = (title: string): -1 | 1 | 0 => {
  if (HIGH_PRIORITY_GROUP_TITLES.includes(title)) {
    return -1
  }

  if (LOW_PRIORITY_GROUP_TITLES.includes(title)) {
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
