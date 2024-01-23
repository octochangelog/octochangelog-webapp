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

type FetchReleasesArgs = RepositoryQueryParams & { page?: number | undefined }

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

async function fetchReleases({ owner, repo, page }: FetchReleasesArgs) {
	const response = await octokit.rest.repos.listReleases({
		owner,
		repo,
		per_page: 100,
		page,
	})

	return response.data.filter(isStableRelease)
}

function useReleasesQuery(
	params: ReleasesQueryParams,
	config?: ConfigArg,
): UseQueryResult<ReleasesQueryResults, Error> {
	const finalParams: RepositoryQueryParams = mapRepositoryToQueryParams(
		params.repository ?? undefined,
	)
	const { fromVersion, toVersion } = params

	return useQuery<ReleasesQueryResults, Error>({
		queryKey: [QUERY_KEY, finalParams],
		queryFn: async () => {
			const { owner, repo } = finalParams

			const releases = await fetchReleases({ owner, repo })

			return releases
		},
		enabled: Boolean(params.repository),
		...config,
	})
}

export { useReleasesQuery }
