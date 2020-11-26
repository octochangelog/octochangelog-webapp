import { QueryConfig, QueryResult, useQuery, useQueryCache } from 'react-query'

import { octokit } from '~/github-client'
import { Release, Repository, RepositoryQueryParams } from '~/models'
import { isStableRelease } from '~/utils'

function mapRepositoryQueryParams(
  repository?: Repository
): RepositoryQueryParams {
  return {
    owner: repository?.owner.login ?? '',
    repo: repository?.name ?? '',
  }
}

type ReleasesQueryResults = Release[]
type ReleasesQueryParams = {
  repository?: Repository
}

const QUERY_KEY = 'releases'

function useReleases(
  params: ReleasesQueryParams,
  config?: QueryConfig<ReleasesQueryResults>
): QueryResult<ReleasesQueryResults> {
  return useQuery<ReleasesQueryResults>(
    [QUERY_KEY, mapRepositoryQueryParams(params.repository)],
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
    mapRepositoryQueryParams(repository),
  ])
}

export { useReleases, useReleasesData }
