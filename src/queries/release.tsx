import {
	useQuery,
	type UseQueryOptions,
	type UseQueryResult,
} from '@tanstack/react-query'
import * as semver from 'semver'

import { octokit } from '@/github-client'
import {
	type Release,
	type ReleaseVersion,
	type Repository,
	type RepositoryQueryParams,
} from '@/models'
import { isStableRelease, mapRepositoryToQueryParams } from '@/utils'

type ReleasesQueryResults = Array<Release>
type ReleasesQueryParams = {
	repository?: Repository | null
	fromVersion?: ReleaseVersion | null
	toVersion?: ReleaseVersion | null
}
type ConfigArg =
	| Omit<UseQueryOptions<ReleasesQueryResults, Error>, 'queryKey' | 'queryFn'>
	| undefined

const QUERY_KEY = 'releases'
const MAX_AUTO_PAGINATION = 10

function getHasNextPage(link: string): boolean {
	return link.includes('rel="next"')
}

function useReleasesQuery(
	params: ReleasesQueryParams,
	config?: ConfigArg,
): UseQueryResult<ReleasesQueryResults, Error> {
	const finalParams: RepositoryQueryParams = mapRepositoryToQueryParams(
		params.repository ?? undefined,
	)
	const { fromVersion, toVersion } = params
	const hasFromVersion = !!fromVersion
	const hasToVersion = !!toVersion

	return useQuery<ReleasesQueryResults, Error>({
		queryKey: [QUERY_KEY, finalParams],
		queryFn: async () => {
			const { owner, repo } = finalParams
			const releases: Array<Release> = []
			let shouldKeepPaginating = true
			let pagination = 1

			while (shouldKeepPaginating) {
				const response = await octokit.rest.repos.listReleases({
					owner,
					repo,
					per_page: 100,
					page: pagination,
				})
				const { data: releasesBatch, headers } = response
				releases.push(...releasesBatch.filter(isStableRelease))

				pagination++
				const hasNextPage = !!headers.link && getHasNextPage(headers.link)
				const isMaxAutoPaginationReached = pagination > MAX_AUTO_PAGINATION
				const lastReleaseFetched = releasesBatch[releasesBatch.length - 1]
				const isFromReleaseFetched =
					!hasFromVersion ||
					semver.gte(fromVersion, lastReleaseFetched.tag_name)
				const isToReleaseFetched =
					!hasToVersion ||
					toVersion === 'latest' ||
					semver.gte(toVersion, lastReleaseFetched.tag_name)

				shouldKeepPaginating =
					hasNextPage &&
					(!isMaxAutoPaginationReached ||
						!isFromReleaseFetched ||
						!isToReleaseFetched)
			}

			return releases
		},
		enabled: Boolean(params.repository),
		...config,
	})
}

export { useReleasesQuery }
