import { type RestEndpointMethodTypes } from '@octokit/rest'
import {
	type UseQueryOptions,
	type UseQueryResult,
} from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

import { octokit } from '@/github-client'

type ReposQueryResponse = RestEndpointMethodTypes['search']['repos']['response']
type ReposQueryResults = ReposQueryResponse['data']
type ReposQueryParams = RestEndpointMethodTypes['search']['repos']['parameters']
type ConfigArg = Omit<
	UseQueryOptions<ReposQueryResponse, Error, ReposQueryResults>,
	'queryKey' | 'queryFn'
>

function useSearchRepositoriesQuery(
	params: ReposQueryParams,
	config?: ConfigArg,
): UseQueryResult<ReposQueryResults, Error> {
	const finalParams = { per_page: 100, ...params }
	return useQuery<ReposQueryResponse, Error, ReposQueryResults>({
		...config,
		queryKey: ['repos', finalParams],
		queryFn: async () => octokit.search.repos(finalParams),
		select: (response) => response.data,
	})
}

export { useSearchRepositoriesQuery }
