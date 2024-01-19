import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import * as semver from 'semver'

import { octokit } from '@/github-client'
import type {
	Release,
	ReleaseVersion,
	Repository,
	RepositoryQueryParams,
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
			const releases: Array<Release> = []
			let paginationCount = 0

			for await (const response of octokit.paginate.iterator(
				'GET /repos/{owner}/{repo}/releases',
				{ ...finalParams, per_page: 100 },
			)) {
				paginationCount++
				releases.push(...response.data.filter(isStableRelease))

				const isMaxAutoPaginationReached =
					paginationCount >= MAX_AUTO_PAGINATION
				const lastReleaseFetched = response.data[response.data.length - 1]
				const isFromReleaseFetched =
					!hasFromVersion ||
					semver.gte(fromVersion, lastReleaseFetched.tag_name)
				const isToReleaseFetched =
					!hasToVersion ||
					toVersion === 'latest' ||
					semver.gte(toVersion, lastReleaseFetched.tag_name)

				if (
					isMaxAutoPaginationReached &&
					isFromReleaseFetched &&
					isToReleaseFetched
				) {
					break
				}
			}

			return releases
		},
		enabled: Boolean(params.repository),
		...config,
	})
}

export { useReleasesQuery }
