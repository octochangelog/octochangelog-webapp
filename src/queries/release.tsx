import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query'

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
  config?: UseQueryOptions<ReleasesQueryResults, Error>
): UseQueryResult<ReleasesQueryResults, Error> {
  const finalParams: RepositoryQueryParams = mapRepositoryToQueryParams(
    params.repository
  )

  return useQuery<ReleasesQueryResults, Error>(
    [QUERY_KEY, finalParams],
    () => {
      return octokit.paginate(
        'GET /repos/{owner}/{repo}/releases',
        finalParams,
        (response) => response.data.filter(isStableRelease)
      )
    },
    { enabled: !!params.repository, ...config }
  )
}

export { useReleasesQuery }
