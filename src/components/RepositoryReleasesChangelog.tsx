import {
  Alert,
  AlertIcon,
  Box,
  Heading,
  Skeleton,
  Stack,
} from '@chakra-ui/react'
import useProcessReleases from 'hooks/useProcessReleases'
import {
  MiscGroupTitles,
  ProcessedReleaseChange,
  Release,
  ReleaseVersion,
  Repository,
  SemVerGroupTitles,
} from 'models'
import { useState, useEffect } from 'react'
import { useQueryCache } from 'react-query'
import {
  compareReleaseGroupTitlesSort,
  filterReleasesByVersionRange,
  releasesComparator,
} from 'utils'

import ProcessedReleaseChangeDescription from '~/components/ProcessedReleaseChangeDescription'
import TextSkeleton from '~/components/TextSkeleton'

interface RepositoryReleasesChangelogProps {
  repository: Repository
  fromVersion?: ReleaseVersion
  toVersion?: ReleaseVersion
}

const RepositoryReleasesChangelog = ({
  repository,
  fromVersion,
  toVersion,
}: RepositoryReleasesChangelogProps) => {
  const queryCache = useQueryCache()
  const [filteredReleases, setFilteredReleases] = useState<Release[] | null>(
    null
  )

  const { processedReleases, isProcessing } = useProcessReleases(
    filteredReleases
  )

  // TODO: extract this to some util when creating RQ custom query hooks
  const releases: Release[] | undefined = queryCache.getQueryData([
    'releases',
    { owner: repository.owner.login, repo: repository.name },
  ])

  const shouldShowProcessedReleaseTitle = () => {
    if (!processedReleases) {
      return false
    }

    const groupsTitles = Object.keys(processedReleases)

    return (
      groupsTitles.length > 1 || !groupsTitles.includes(MiscGroupTitles.unknown)
    )
  }

  useEffect(
    function filterReleases() {
      if (releases && fromVersion && toVersion) {
        const newFilteredReleases = filterReleasesByVersionRange({
          releases,
          from: fromVersion,
          to: toVersion,
        }).sort((a, b) => releasesComparator(a, b, 'asc'))
        setFilteredReleases(newFilteredReleases)
      } else {
        setFilteredReleases(null)
      }
    },
    [fromVersion, releases, toVersion]
  )

  // TODO: simplify conditional renders with state machine
  return (
    <>
      {isProcessing && (
        <>
          <Skeleton width="20%" height={8} mb={4} />
          <TextSkeleton />
        </>
      )}

      {!isProcessing && processedReleases && (
        <Stack spacing={6}>
          {Object.keys(processedReleases)
            .sort(compareReleaseGroupTitlesSort)
            .map((title: string) => {
              // TODO: update `release` type to ProcessedReleaseGroup when available
              const processedRelease = processedReleases[title]
              const textTransform =
                title === SemVerGroupTitles.breakingChanges
                  ? 'uppercase'
                  : 'capitalize'
              return (
                <Box key={title}>
                  {shouldShowProcessedReleaseTitle() && (
                    <Heading
                      as="h2"
                      size="xl"
                      mb={4}
                      textTransform={textTransform}
                    >
                      {title}
                    </Heading>
                  )}
                  <Box mb={4}>
                    {processedRelease.map(
                      (processedReleaseChange: ProcessedReleaseChange) => (
                        <ProcessedReleaseChangeDescription
                          key={`${title}-${processedReleaseChange.id}`}
                          repository={repository}
                          processedReleaseChange={processedReleaseChange}
                          mb={8}
                        />
                      )
                    )}
                  </Box>
                </Box>
              )
            })}
        </Stack>
      )}

      {fromVersion && toVersion && !processedReleases && !isProcessing && (
        <Alert status="error">
          <AlertIcon />
          No processed releases to show
        </Alert>
      )}
    </>
  )
}

export default RepositoryReleasesChangelog
