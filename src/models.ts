import { RestEndpointMethodTypes } from '@octokit/rest'
import { ReactElement } from 'react'
import { ComponentLike } from 'rehype-react'
import { Parent } from 'unist'

export type RepositoryQueryParams = {
  repo: string
  owner: string
}

export type Repository =
  RestEndpointMethodTypes['repos']['get']['response']['data']

export type Release =
  RestEndpointMethodTypes['repos']['getRelease']['response']['data']

export type ReleaseLike = Release

export type ReleaseVersion = string

// FIXME: generate proper types for processed release
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ProcessedReleasesCollection = any

export interface ProcessedReleaseChange extends ReleaseLike {
  title: string
  originalTitle: string
  // Level: enumerate with error, warning, info or unknown
  descriptionMdast: Parent
}

// eslint-disable-next-line no-shadow
export enum SemVerGroupTitles {
  breakingChanges = 'breaking changes',
  features = 'features',
  bugFixes = 'bug fixes',
}

// eslint-disable-next-line no-shadow
export enum MiscGroupTitles {
  unknown = 'others',
  artifacts = 'artifacts',
  thanks = 'thanks',
  credits = 'credits',
}

export type ComponentsMapping = Record<string, ComponentLike<ReactElement>>
