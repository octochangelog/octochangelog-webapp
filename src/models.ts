import type { RestEndpointMethodTypes } from '@octokit/rest'
import type { Root } from 'mdast'
import type { ReactElement } from 'react'

export type SemVerGroupTitle = 'breaking changes' | 'features' | 'bug fixes'

export type MiscGroupTitle = 'others' | 'artifacts' | 'thanks' | 'credits'

export type ReleaseGroupTitle = SemVerGroupTitle | MiscGroupTitle | string

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
  ReleaseGroupTitle,
  Array<ProcessedRelease>
>

export type ReleaseVersion = string

type ComponentPropsWithoutNode = Record<string, unknown>

type ComponentLike<
  T,
  P extends ComponentPropsWithoutNode = ComponentPropsWithoutNode
> = (props: P) => T | null

export type ComponentsMapping = Record<string, ComponentLike<ReactElement>>
