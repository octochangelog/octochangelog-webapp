import React from 'react';
import { Divider } from '@chakra-ui/core';
import RepositoryReleasesPicker from 'components/RepositoryReleasesPicker';
import RepositoryReleasesChangelog from 'components/RepositoryReleasesChangelog';
import { Repository, VersionRange } from 'models';

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
      <RepositoryReleasesChangelog
        repository={repositorySelected}
        fromVersion={versionRage[0]}
        toVersion={versionRage[1]}
      />
    </>
  );
};

export default RepositoryReleasesComparator;
