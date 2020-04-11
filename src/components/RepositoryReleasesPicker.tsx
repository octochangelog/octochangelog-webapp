import React from 'react';
import { Stack, useToast } from '@chakra-ui/core';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { GitHubRepositoryData, Release, RepositoryReleases } from 'types';
import RepositoryUrlInput from 'components/RepositoryUrlInput';
import ReleaseVersionSelect from 'components/ReleaseVersionSelect';
import useWindowWidth from 'hooks/useWindowWidth';

const INLINE_BREAKPOINT = 768; // desktop

export const RELEASES_QUERY = gql`
  query Repository($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      name
      url
      releases(orderBy: { field: CREATED_AT, direction: ASC }, first: 100) {
        pageInfo {
          hasNextPage
        }
        nodes {
          description
          id
          name
        }
      }
    }
  }
`;

const renderOptionsFromReleases = (
  releases?: Array<Release>
): Array<React.ReactNode> | null => {
  if (releases) {
    return releases.map((release) => (
      <option key={release.name} value={release.name}>
        {release.name}
      </option>
    ));
  }

  return null;
};

type PropTypes = {
  onChange(repository: RepositoryReleases | null): void;
};

const RepositoryReleasesPicker: React.FC<PropTypes> = ({ onChange }) => {
  const [
    repositoryData,
    setRepositoryData,
  ] = React.useState<GitHubRepositoryData | null>(null);

  const windowWidth = useWindowWidth();

  const toast = useToast();

  const { loading, error, data } = useQuery<
    { repository: RepositoryReleases },
    GitHubRepositoryData | null
  >(RELEASES_QUERY, { variables: repositoryData, skip: !repositoryData });

  React.useEffect(() => {
    if (data) {
      const { releases, ...repository } = data.repository;
      onChange(repository);
    } else {
      onChange(null);
    }
  }, [data, onChange]);

  React.useEffect(() => {
    if (error) {
      toast({
        title: 'An error occurred.',
        description: 'Unable to retrieve repository releases',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  const handleRepositoryChange = (newRepoData: GitHubRepositoryData | null) => {
    setRepositoryData(newRepoData);
  };

  const releasesOptions = renderOptionsFromReleases(
    data?.repository.releases?.nodes
  );

  const selectPlaceholder =
    Array.isArray(releasesOptions) && releasesOptions.length === 0
      ? 'Versions not found'
      : 'Select version';

  return (
    <Stack
      spacing={{ base: 2, md: 6 }}
      isInline={windowWidth >= INLINE_BREAKPOINT}
    >
      <RepositoryUrlInput
        isLoading={loading}
        onRepositoryChange={handleRepositoryChange}
      />
      <ReleaseVersionSelect
        label="From release"
        id="from-release"
        width={{ base: 'full', md: '30%' }}
        isDisabled={!releasesOptions}
        placeholder={selectPlaceholder}
      >
        {releasesOptions}
      </ReleaseVersionSelect>
      <ReleaseVersionSelect
        label="To release"
        id="to-release"
        width={{ base: 'full', md: '30%' }}
        isDisabled={!releasesOptions}
        placeholder={selectPlaceholder}
      >
        {releasesOptions}
      </ReleaseVersionSelect>
    </Stack>
  );
};

export default RepositoryReleasesPicker;
