import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query'

import { octokit } from '~/github-client'
import { Release, Repository, RepositoryQueryParams } from '~/models'
import { isStableRelease, mapRepositoryToQueryParams } from '~/utils'

type ReleasesQueryResults = Release[]
type ReleasesQueryParams = {
  repository?: Repository | null
}

const QUERY_KEY = 'releases'
const MAX_AUTO_PAGINATION_ALLOWED = 10

function useReleasesQuery(
  params: ReleasesQueryParams,
  config?: UseQueryOptions<ReleasesQueryResults, Error>
): UseQueryResult<ReleasesQueryResults, Error> {
  const finalParams: RepositoryQueryParams = mapRepositoryToQueryParams(
    params.repository ?? undefined
  )

  return useQuery<ReleasesQueryResults, Error>(
    [QUERY_KEY, finalParams],
    () => {
      let paginationCount = 0
      return octokit.paginate(
        'GET /repos/{owner}/{repo}/releases',
        { ...finalParams, per_page: 100 },
        (response, done) => {
          paginationCount++

          if (paginationCount === MAX_AUTO_PAGINATION_ALLOWED) {
            done()
          }

          return response.data.filter(isStableRelease)
        }
      )
    },
    { enabled: !!params.repository, ...config }
  )
}

export { useReleasesQuery }
