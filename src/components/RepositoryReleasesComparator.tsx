import React from 'react';
import { Divider } from '@chakra-ui/core';
import RepositoryReleasesPicker from 'components/RepositoryReleasesPicker';
import RepositoryReleasesChangelog from 'components/RepositoryReleasesChangelog';
import { RepositoryReleases, VersionRange } from 'types';

const RepositoryReleasesComparator = () => {
  const [
    repositorySelected,
    setRepositorySelected,
  ] = React.useState<RepositoryReleases | null>(null);

  const [versionRage, setVersionRange] = React.useState<VersionRange>(['', '']);

  const handleReleasesChange = React.useCallback(
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
        onReleaseChange={handleReleasesChange}
        onVersionRangeChange={handleVersionRangeChange}
      />
      <Divider my={4} />
      <RepositoryReleasesChangelog
        repository={repositorySelected}
        fromVersion={versionRage[0]}
        toVersion={versionRage[1]}
      />
    </>
  );
};

export default RepositoryReleasesComparator;
