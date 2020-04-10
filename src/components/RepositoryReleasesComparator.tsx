import React from 'react';
import { Divider } from '@chakra-ui/core';
import RepositoryReleasesPicker from 'components/RepositoryReleasesPicker';
import RepositoryReleasesChangelog from 'components/RepositoryReleasesChangelog';
import { RepositoryReleases } from 'types';

const RepositoryReleasesComparator = () => {
  const [
    repositorySelected,
    setRepositorySelected,
  ] = React.useState<RepositoryReleases | null>(null);

  const handleReleasesChange = React.useCallback(
    (repository) => {
      setRepositorySelected(repository);
    },
    [setRepositorySelected]
  );

  return (
    <>
      <RepositoryReleasesPicker onChange={handleReleasesChange} />
      <Divider my={4} />
      <RepositoryReleasesChangelog repository={repositorySelected} />
    </>
  );
};

export default RepositoryReleasesComparator;
