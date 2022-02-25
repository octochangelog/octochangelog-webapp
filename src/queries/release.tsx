import type { UseQueryOptions, UseQueryResult } from 'react-query'
import { useQuery } from 'react-query'
import * as semver from 'semver'

import { octokit } from '~/github-client'
import type {
  Release,
  ReleaseVersion,
  Repository,
  RepositoryQueryParams,
} from '~/models'
import { isStableRelease, mapRepositoryToQueryParams } from '~/utils'

type ReleasesQueryResults = Array<Release>
type ReleasesQueryParams = {
  repository?: Repository | null
  fromVersion?: ReleaseVersion | null
  toVersion?: ReleaseVersion | null
}

const QUERY_KEY = 'releases'
const MAX_AUTO_PAGINATION = 10

function useReleasesQuery(
  params: ReleasesQueryParams,
  config?: UseQueryOptions<ReleasesQueryResults, Error>
): UseQueryResult<ReleasesQueryResults, Error> {
  const finalParams: RepositoryQueryParams = mapRepositoryToQueryParams(
    params.repository ?? undefined
  )
  const { fromVersion, toVersion } = params
  const hasFromVersion = !!fromVersion
  const hasToVersion = !!toVersion

  return useQuery<ReleasesQueryResults, Error>(
    [QUERY_KEY, finalParams],
    async () => {
      let paginationCount = 0
      return octokit.paginate(
        'GET /repos/{owner}/{repo}/releases',
        { ...finalParams, per_page: 100 },
        (response, done) => {
          paginationCount++

          const isMaxAutoPagination = paginationCount === MAX_AUTO_PAGINATION
          const lastReleaseFetched = response.data[response.data.length - 1]
          const isFromReleaseFetched =
            !hasFromVersion ||
            semver.gte(fromVersion, lastReleaseFetched.tag_name)
          const isToReleaseFetched =
            !hasToVersion || semver.gte(toVersion, lastReleaseFetched.tag_name)

          if (
            isMaxAutoPagination &&
            isFromReleaseFetched &&
            isToReleaseFetched
          ) {
            done()
          }

          return response.data.filter(isStableRelease)
        }
      )
    },
    { enabled: Boolean(params.repository), ...config }
  )
}

export { useReleasesQuery }
