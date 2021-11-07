import { RestEndpointMethodTypes } from '@octokit/rest'
import { Root } from 'mdast'
import { ReactElement } from 'react'

export type RepositoryQueryParams = {
  repo: string
  owner: string
}

export type Repository =
  RestEndpointMethodTypes['repos']['get']['response']['data']

export type Release =
  RestEndpointMethodTypes['repos']['getRelease']['response']['data']

export type ReleaseLike = Release

export interface ProcessedRelease extends Omit<Release, 'body'> {
  title: string
  originalTitle: string
  descriptionMdast: Root
}

export type ProcessedReleasesCollection = Record<
  string,
  Array<ProcessedRelease>
>

export type ReleaseVersion = string

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

type ComponentPropsWithoutNode = Record<string, unknown>

type ComponentLike<
  T,
  P extends ComponentPropsWithoutNode = ComponentPropsWithoutNode
> = (props: P) => T | null

export type ComponentsMapping = Record<string, ComponentLike<ReactElement>>
