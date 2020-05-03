import { Divider, Skeleton } from '@chakra-ui/core';
import { Repository, VersionRange } from 'models';
import React from 'react';

import Container from '~/components/Container';
import RepositoryReleasesChangelogHeading from '~/components/RepositoryReleasesChangelogHeading';
import RepositoryReleasesPicker from '~/components/RepositoryReleasesPicker';

const RepositoryReleasesChangelog = React.lazy(() =>
  import('~/components/RepositoryReleasesChangelog')
);

const fallbackSkeleton: React.ReactNode = (
  <div>
    <Skeleton height="50px" mb={4} width="50%" />
    <Skeleton height="25px" width="25%" />
  </div>
);

const RepositoryReleasesComparator = () => {
  const [
    repositorySelected,
    setRepositorySelected,
  ] = React.useState<Repository | null>(null);

  const [versionRage, setVersionRange] = React.useState<VersionRange>(['', '']);

  const handleRepositoryChange = React.useCallback(
    (repository) => {
      setRepositorySelected(repository);
    },
    [setRepositorySelected]
  );

  const handleVersionRangeChange = React.useCallback(
    (newVersionRange) => {
      setVersionRange(newVersionRange);
    },
    [setVersionRange]
  );

  return (
    <>
      <Container>
        <RepositoryReleasesPicker
          onRepositoryChange={handleRepositoryChange}
          onVersionRangeChange={handleVersionRangeChange}
        />
      </Container>
      <Divider my={4} />
      {repositorySelected && (
        <>
          <RepositoryReleasesChangelogHeading
            repository={repositorySelected}
            fromVersion={versionRage[0]}
            toVersion={versionRage[1]}
          />
          <Container>
            <React.Suspense fallback={fallbackSkeleton}>
              <RepositoryReleasesChangelog
                repository={repositorySelected}
                fromVersion={versionRage[0]}
                toVersion={versionRage[1]}
              />
            </React.Suspense>
          </Container>
        </>
      )}
    </>
  );
};

export default RepositoryReleasesComparator;
