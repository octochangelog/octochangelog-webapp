import { RestEndpointMethodTypes } from '@octokit/rest'
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query'

import { octokit } from '~/github-client'

type ReposQueryResponse = RestEndpointMethodTypes['search']['repos']['response']
type ReposQueryResults = ReposQueryResponse['data']
type ReposQueryParams = RestEndpointMethodTypes['search']['repos']['parameters']

function useSearchRepositoriesQuery(
  params: ReposQueryParams,
  config?: UseQueryOptions<ReposQueryResults, Error, ReposQueryResponse>
): UseQueryResult<ReposQueryResults, Error> {
  const finalParams = { per_page: 100, ...params }
  return useQuery<ReposQueryResults, Error, ReposQueryResponse>(
    ['repos', finalParams],
    () => octokit.search.repos(finalParams),
    {
      ...config,
      select: (response) => response.data,
    }
  )
}

export { useSearchRepositoriesQuery }
