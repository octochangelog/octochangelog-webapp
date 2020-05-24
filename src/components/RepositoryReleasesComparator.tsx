import { Divider, Skeleton } from '@chakra-ui/core';
import {
  Repository,
  RepositoryQueryPayload,
  VersionRange,
  Release,
} from 'models';
import React from 'react';

import Container from '~/components/Container';
import RepositoryReleasesChangelogHeading from '~/components/RepositoryReleasesChangelogHeading';
import RepositoryReleasesPicker from '~/components/RepositoryReleasesPicker';
import useIsClientSideHydrated from '~/hooks/useLazyShowChild';

const RepositoryReleasesChangelog = React.lazy(() =>
  import('~/components/RepositoryReleasesChangelog')
);

const fallbackSkeleton: React.ReactNode = (
  <div>
    <Skeleton height="50px" mb={4} width="50%" />
    <Skeleton height="25px" width="25%" />
  </div>
);

interface Props {
  repository?: Repository;
  releases?: Release[];
  versionRange: VersionRange;
  isFetching?: boolean;
  onRepositoryChange(repository: RepositoryQueryPayload | null): void;
  onVersionRangeChange(range: VersionRange): void;
}

const RepositoryReleasesComparator: React.FC<Props> = ({
  repository,
  releases,
  versionRange,
  isFetching = false,
  onRepositoryChange,
  onVersionRangeChange,
}) => {
  const isHydrated = useIsClientSideHydrated();

  return (
    <>
      <Container>
        {isHydrated && (
          <RepositoryReleasesPicker
            releases={releases}
            versionRange={versionRange}
            isFetching={isFetching}
            onRepositoryChange={onRepositoryChange}
            onVersionRangeChange={onVersionRangeChange}
          />
        )}
      </Container>
      <Divider my={4} />
      {repository && (
        <>
          <RepositoryReleasesChangelogHeading
            repository={repository}
            fromVersion={versionRange[0]}
            toVersion={versionRange[1]}
          />
          <Container>
            <React.Suspense fallback={fallbackSkeleton}>
              <RepositoryReleasesChangelog
                repository={repository}
                releases={releases}
                fromVersion={versionRange[0]}
                toVersion={versionRange[1]}
              />
            </React.Suspense>
          </Container>
        </>
      )}
    </>
  );
};

export default RepositoryReleasesComparator;
