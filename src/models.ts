import type { components } from '@octokit/openapi-types'
import type { Root } from 'mdast'
import type { ReactElement } from 'react'

type NextErrorPageProps = {
	error: Error & { digest?: string }
	reset: () => void
}

type NextSearchParams = Record<string, string | Array<string> | undefined>

type SemVerGroup = 'breaking changes' | 'features' | 'bug fixes'

type MiscGroup = 'others' | 'artifacts' | 'thanks' | 'credits'

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
type ReleaseGroup = SemVerGroup | MiscGroup | string

type RepositoryQueryParams = {
	repo: string
	owner: string
}

type Repository = components['schemas']['full-repository']

type Release = components['schemas']['release']

type RepoSearchResultItem = components['schemas']['repo-search-result-item']

interface ProcessedRelease extends Omit<Release, 'body'> {
	title: string
	originalTitle: string
	descriptionMdast: Root
}

type ProcessedReleasesCollection = Record<ReleaseGroup, Array<ProcessedRelease>>

type ReleaseVersion = string

type ComponentPropsWithoutNode = Record<string, unknown>

type ComponentLike<
	T,
	P extends ComponentPropsWithoutNode = ComponentPropsWithoutNode,
> = (props: P) => T | null

type ComponentsMapping = Record<string, ComponentLike<ReactElement>>

export type {
	NextErrorPageProps,
	NextSearchParams,
	SemVerGroup,
	MiscGroup,
	ReleaseGroup,
	RepositoryQueryParams,
	Repository,
	Release,
	RepoSearchResultItem,
	ProcessedRelease,
	ProcessedReleasesCollection,
	ReleaseVersion,
	ComponentsMapping,
}
