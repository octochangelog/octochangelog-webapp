import { QueryConfig, QueryResult, useQuery, useQueryCache } from 'react-query'

import { octokit } from '~/github-client'
import { Release, Repository, RepositoryQueryParams } from '~/models'
import { isStableRelease, mapRepositoryToQueryParams } from '~/utils'

type ReleasesQueryResults = Release[]
type ReleasesQueryParams = {
  repository?: Repository
}

const QUERY_KEY = 'releases'

function useReleasesQuery(
  params: ReleasesQueryParams,
  config?: QueryConfig<ReleasesQueryResults>
): QueryResult<ReleasesQueryResults> {
  return useQuery<ReleasesQueryResults>(
    [QUERY_KEY, mapRepositoryToQueryParams(params.repository)],
    async (_, queryParams: RepositoryQueryParams) => {
      return octokit.paginate(
        'GET /repos/:owner/:repo/releases',
        queryParams,
        (response) => response.data.filter(isStableRelease)
      )
    },
    { enabled: params.repository, ...config }
  )
}

function useReleasesData(repository: Repository): Release[] | undefined {
  const queryCache = useQueryCache()

  return queryCache.getQueryData([
    QUERY_KEY,
    mapRepositoryToQueryParams(repository),
  ])
}

export { useReleasesQuery, useReleasesData }
