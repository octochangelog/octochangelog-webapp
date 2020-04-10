import React from 'react';
import { Divider } from '@chakra-ui/core';
import ReleasesPicker from 'components/ReleasesPicker';
import ReleasesResults from 'components/ReleasesResults';
import { Release, Repository } from 'types';

const ReleaseComparator = () => {
  const [repositorySelected, setRepositorySelected] = React.useState<
    Repository | undefined
  >(undefined);
  const [releasesSelected, setReleasesSelected] = React.useState<
    Release[] | undefined
  >(undefined);

  const handleReleasesChange = (
    repository: Repository,
    releases: Release[]
  ) => {
    setRepositorySelected(repository);
    setReleasesSelected(releases);
  };

  return (
    <>
      <ReleasesPicker onChange={handleReleasesChange} />
      <Divider my={4} />
      <ReleasesResults
        repository={repositorySelected}
        releases={releasesSelected}
      />
    </>
  );
};

export default ReleaseComparator;
