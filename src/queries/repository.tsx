import { RestEndpointMethodTypes } from '@octokit/rest'
import { useQuery, QueryResult, QueryConfig } from 'react-query'

import { octokit } from '~/github-client'

type ReposQueryResults = RestEndpointMethodTypes['search']['repos']['response']['data']
type ReposQueryParams = RestEndpointMethodTypes['search']['repos']['parameters']

function useSearchRepositoriesQuery(
  params: ReposQueryParams,
  config?: QueryConfig<ReposQueryResults>
): QueryResult<ReposQueryResults> {
  return useQuery<ReposQueryResults>(
    ['repos', { per_page: 100, ...params }],
    async (_, queryParams: ReposQueryParams) => {
      const resp = await octokit.search.repos(queryParams)

      return resp.data
    },
    config
  )
}

export { useSearchRepositoriesQuery }
