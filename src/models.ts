import { RestEndpointMethodTypes } from '@octokit/rest'
import { Parent } from 'unist'

declare global {
  interface Window {
    gtag: Function
  }
}

export type RepositoryQueryParams = RestEndpointMethodTypes['repos']['get']['parameters']

export type Repository = RestEndpointMethodTypes['repos']['get']['response']['data']

export type Release = RestEndpointMethodTypes['repos']['getRelease']['response']['data']

export type VersionRange = [string, string]

// FIXME: generate proper types for processed release
export type ProcessedReleasesCollection = any

export interface ProcessedReleaseChange extends Omit<Release, 'description'> {
  title: string
  originalTitle: string
  // level: enumerate with error, warning, info or unknown
  descriptionMdast: Parent
}

export enum SemVerGroupTitles {
  breakingChanges = 'breaking changes',
  features = 'features',
  bugFixes = 'bug fixes',
}

export enum MiscGroupTitles {
  unknown = 'others',
  artifacts = 'artifacts',
  thanks = 'thanks',
  credits = 'credits',
}

export interface GitHubRateLimit {
  limit: number
  remaining: number
  reset: number
}
