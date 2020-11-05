import { useToast } from '@chakra-ui/core'
import api from 'api'
import { useState, useEffect, useCallback } from 'react'
import { useQuery } from 'react-query'
import semver from 'semver'

import Layout from '~/components/Layout'
import RateLimitExceededNotice from '~/components/RateLimitExceededNotice'
import RepositoryReleasesComparator from '~/components/RepositoryReleasesComparator'
import { EMPTY_VERSION_RANGE, GITHUB_RATE_LIMIT_EXCEEDED_ERROR } from '~/global'
import {
  Release,
  Repository,
  RepositoryQueryPayload,
  VersionRange,
} from '~/models'

const ComparatorPage = () => {
  // TODO:
  //  - deal with access token properly on Api class
  const [shouldShowExceeded, setShouldShowExceeded] = useState(false)
  const [versionRange, setVersionRange] = useState<VersionRange>(
    EMPTY_VERSION_RANGE
  )

  const [refinedReleases, setRefinedReleases] = useState<Release[] | undefined>(
    undefined
  )

  const [
    requestPayload,
    setRequestPayload,
  ] = useState<RepositoryQueryPayload | null>(null)

  const {
    data: repository,
    error: repoError,
    isFetching: isRepoFetching,
  } = useQuery<Repository>(
    ['repository', requestPayload],
    (_, payload) => api.readRepo(payload),
    { enabled: requestPayload }
  )

  const {
    data: releases,
    error: releasesError,
    isFetching: isReleasesFetching,
  } = useQuery<Release[]>(
    ['releases', requestPayload],
    (_, payload) => api.readRepoReleases(payload),
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

        if (err.message === GITHUB_RATE_LIMIT_EXCEEDED_ERROR) {
          setShouldShowExceeded(true)
        }
      }
    },
    [toast]
  )

  useEffect(
    function handleRepoErrorEffect() {
      handleQueryError(repoError as Error)
    },
    [handleQueryError, repoError]
  )

  useEffect(
    function handleReleasesErrorEffect() {
      handleQueryError(releasesError as Error)
    },
    [handleQueryError, releasesError]
  )

  const handleRepositoryPayloadChange = (payload: RepositoryQueryPayload) => {
    setRequestPayload(payload)
    setVersionRange(EMPTY_VERSION_RANGE) // clean versions
  }

  return (
    <Layout extraTitle="Comparator">
      {shouldShowExceeded ? (
        <RateLimitExceededNotice
          waitingMinutes={api.rateLimitWaitingMinutes}
          isAuth={api.isAuth}
        />
      ) : (
        <RepositoryReleasesComparator
          repository={repository}
          releases={refinedReleases}
          versionRange={versionRange}
          onRepositoryChange={handleRepositoryPayloadChange}
          onVersionRangeChange={setVersionRange}
          isFetching={isRepoFetching || isReleasesFetching}
        />
      )}
    </Layout>
  )
}

export default ComparatorPage
