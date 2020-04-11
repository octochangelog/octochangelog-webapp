import React from 'react';
import { Stack, useToast } from '@chakra-ui/core';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { GitHubRepositoryData, Release, RepositoryReleases } from 'types';
import RepositoryUrlInput from 'components/RepositoryUrlInput';
import ReleaseVersionSelect from 'components/ReleaseVersionSelect';
import useWindowWidth from 'hooks/useWindowWidth';
import { filterReleasesNodes } from 'utils';

const INLINE_BREAKPOINT = 768; // desktop

const EMPTY_VERSION_RANGE: [string, string] = ['', ''];

export const RELEASES_QUERY = gql`
  query Repository($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      name
      url
      releases(orderBy: { field: CREATED_AT, direction: DESC }, last: 100) {
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

  const [versionRage, setVersionRange] = React.useState<[string, string]>(
    EMPTY_VERSION_RANGE
  );

  const windowWidth = useWindowWidth();

  const toast = useToast();

  const { loading, error, data } = useQuery<
    { repository: RepositoryReleases },
    GitHubRepositoryData | null
  >(RELEASES_QUERY, { variables: repositoryData, skip: !repositoryData });

  React.useEffect(
    function handleDataChange() {
      if (data) {
        const { releases, ...repository } = data.repository;
        onChange(repository);
      } else {
        onChange(null);
      }
    },
    [data, onChange]
  );

  React.useEffect(
    function handleRepositoryReleasesFilter() {
      const [fromVersion, toVersion]: [string, string] = versionRage;

      if (data && fromVersion && toVersion) {
        // TODO: check range is valid
        const { releases, ...repository } = data.repository;
        const releasesNodes = [...(releases?.nodes ?? [])].reverse();

        const filteredReleasesNodes = filterReleasesNodes({
          nodes: releasesNodes,
          from: fromVersion,
          to: toVersion,
        });

        const filteredRepositoryReleases = {
          ...repository,
          releases: {
            nodes: filteredReleasesNodes,
          },
        };

        onChange(filteredRepositoryReleases);
      }
    },
    [data, onChange, versionRage]
  );

  React.useEffect(
    function handleErrorChange() {
      if (error) {
        toast({
          title: 'An error occurred.',
          description: 'Unable to retrieve repository releases',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });

        // clear versions
        setVersionRange(EMPTY_VERSION_RANGE);
      }
    },
    [error, toast]
  );

  const handleRepositoryChange = (newRepoData: GitHubRepositoryData | null) => {
    setRepositoryData(newRepoData);

    // clear versions
    setVersionRange(EMPTY_VERSION_RANGE);
  };

  const handleFromVersionChange = (fromVersion: string) => {
    const [, toVersion] = versionRage;
    setVersionRange([fromVersion, toVersion]);
  };

  const handleToVersionChange = (toVersion: string) => {
    const [fromVersion] = versionRage;
    setVersionRange([fromVersion, toVersion]);
  };

  const releasesOptions = renderOptionsFromReleases(
    data?.repository.releases?.nodes
  );

  const selectPlaceholder =
    Array.isArray(releasesOptions) && releasesOptions.length === 0
      ? 'Versions not found'
      : 'Select version';

  const [fromVersion, toVersion] = versionRage;

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
        onVersionChange={handleFromVersionChange}
        value={fromVersion}
      >
        {releasesOptions}
      </ReleaseVersionSelect>
      <ReleaseVersionSelect
        label="To release"
        id="to-release"
        width={{ base: 'full', md: '30%' }}
        isDisabled={!releasesOptions}
        placeholder={selectPlaceholder}
        onVersionChange={handleToVersionChange}
        value={toVersion}
      >
        {releasesOptions}
      </ReleaseVersionSelect>
    </Stack>
  );
};

export default RepositoryReleasesPicker;
