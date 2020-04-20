import React from 'react';
import { Divider } from '@chakra-ui/core';
import RepositoryReleasesPicker from 'components/RepositoryReleasesPicker';
import { Repository, VersionRange } from 'models';
const RepositoryReleasesChangelog = React.lazy(() =>
  import('components/RepositoryReleasesChangelog')
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
      <RepositoryReleasesPicker
        onRepositoryChange={handleRepositoryChange}
        onVersionRangeChange={handleVersionRangeChange}
      />
      <Divider my={4} />
      {repositorySelected && (
        <React.Suspense fallback={<div>Lazy loading...</div>}>
          <RepositoryReleasesChangelog
            repository={repositorySelected}
            fromVersion={versionRage[0]}
            toVersion={versionRage[1]}
          />
        </React.Suspense>
      )}
    </>
  );
};

export default RepositoryReleasesComparator;
