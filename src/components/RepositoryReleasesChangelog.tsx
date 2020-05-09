import {
  Alert,
  AlertIcon,
  Box,
  Heading,
  Skeleton,
  Stack,
} from '@chakra-ui/core';
import useProcessReleases from 'hooks/useProcessReleases';
import {
  MiscGroupTitles,
  ProcessedReleaseChange,
  Release,
  Repository,
  SemVerGroupTitles,
} from 'models';
import React from 'react';
import {
  compareReleaseGroupTitlesSort,
  filterReleasesByVersionRange,
} from 'utils';

import ProcessedReleaseChangeDescription from '~/components/ProcessedReleaseChangeDescription';
import TextSkeleton from '~/components/TextSkeleton';

interface RepositoryReleasesChangelogProps {
  repository: Repository;
  fromVersion: string;
  toVersion: string;
}

const RepositoryReleasesChangelog = ({
  repository,
  fromVersion,
  toVersion,
}: RepositoryReleasesChangelogProps) => {
  const [filteredReleases, setFilteredReleases] = React.useState<
    Release[] | null
  >(null);

  const { processedReleases, isProcessing } = useProcessReleases(
    filteredReleases
  );

  const { releases, ...repoInfo } = repository;

  const shouldShowProcessedReleaseTitle = () => {
    if (!processedReleases) {
      return false;
    }

    const groupsTitles = Object.keys(processedReleases);

    return (
      groupsTitles.length > 1 || !groupsTitles.includes(MiscGroupTitles.unknown)
    );
  };

  React.useEffect(
    function filterReleases() {
      if (releases && fromVersion && toVersion) {
        setFilteredReleases(
          filterReleasesByVersionRange({
            releases,
            from: fromVersion,
            to: toVersion,
          })
        );
      } else {
        setFilteredReleases(null);
      }
    },
    [releases, fromVersion, toVersion]
  );

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
              const processedRelease = processedReleases[title];
              const textTransform =
                title === SemVerGroupTitles.breakingChanges
                  ? 'uppercase'
                  : 'capitalize';
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
                          key={processedReleaseChange.id}
                          repository={repoInfo}
                          processedReleaseChange={processedReleaseChange}
                          mb={8}
                        />
                      )
                    )}
                  </Box>
                </Box>
              );
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
  );
};

export default RepositoryReleasesChangelog;
