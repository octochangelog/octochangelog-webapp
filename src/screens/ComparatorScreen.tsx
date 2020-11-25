import { useToast } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import semver from 'semver'

import RateLimitExceededNotice from '~/components/RateLimitExceededNotice'
import RepositoryReleasesComparator from '~/components/RepositoryReleasesComparator'
import {
  useComparatorState,
  useComparatorUpdater,
} from '~/contexts/comparator-context'
import { octokit } from '~/github-client'
import { EMPTY_VERSION_RANGE, GITHUB_RATE_LIMIT_EXCEEDED_ERROR } from '~/global'
import { Release, Repository, VersionRange } from '~/models'

const ComparatorScreen = () => {
  const { repository } = useComparatorState()
  const { setRepository } = useComparatorUpdater()

  const [shouldShowExceeded, setShouldShowExceeded] = useState(false)
  const [versionRange, setVersionRange] = useState<VersionRange>(
    EMPTY_VERSION_RANGE
  )

  const [refinedReleases, setRefinedReleases] = useState<Release[] | undefined>(
    undefined
  )

  // TODO: move this within version range component
  const {
    data: releases,
    error: releasesError,
    isLoading: isReleasesLoading,
  } = useQuery<Release[]>(
    ['releases', repository],
    async (_, repositorySelected: Repository) => {
      return octokit.paginate('GET /repos/:owner/:repo/releases', {
        owner: repositorySelected.owner.login,
        repo: repositorySelected.name,
      })
    },
    { enabled: repository }
  )

  useEffect(
    function refineReleasesEffect() {
      let newReleases
      if (releases) {
        newReleases = releases.filter(
          // exclude pre-releases
          ({ tag_name }) =>
            semver.valid(tag_name) && !semver.prerelease(tag_name)
        )
      }

      setRefinedReleases(newReleases)
    },
    [releases]
  )

  const toast = useToast()

  const handleQueryError = useCallback(
    (err: Error) => {
      if (err) {
        toast({
          title: 'An error occurred.',
          description: err.message || 'Something went wrong',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
        })

        // TODO: get this from octokit properly
        if (err.message === GITHUB_RATE_LIMIT_EXCEEDED_ERROR) {
          setShouldShowExceeded(true)
        }
      }
    },
    [toast]
  )

  useEffect(
    function handleReleasesErrorEffect() {
      handleQueryError(releasesError as Error)
    },
    [handleQueryError, releasesError]
  )

  const handleRepositoryChange = (repo: Repository) => {
    setRepository(repo)
    setVersionRange(EMPTY_VERSION_RANGE) // clean versions
  }

  if (shouldShowExceeded) {
    return <RateLimitExceededNotice />
  }

  return (
    <RepositoryReleasesComparator
      releases={refinedReleases}
      versionRange={versionRange}
      onRepositoryChange={handleRepositoryChange}
      onVersionRangeChange={setVersionRange}
      isLoading={isReleasesLoading}
    />
  )
}

export default ComparatorScreen
