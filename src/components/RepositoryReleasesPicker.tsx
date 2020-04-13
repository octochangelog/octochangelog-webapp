import React from 'react';
import { Stack, useToast } from '@chakra-ui/core';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import {
  RepositoryQueryVars,
  Release,
  Repository,
  RepositoryResponse,
  VersionRange,
} from 'models';
import RepositoryFormControl from 'components/RepositoryFormControl';
import ReleaseVersionFormControl from 'components/ReleaseVersionFormControl';
import useWindowWidth from 'hooks/useWindowWidth';

const INLINE_BREAKPOINT = 768; // desktop

const EMPTY_VERSION_RANGE: VersionRange = ['', ''];

export const RELEASES_QUERY = gql`
  query RepositoryReleases($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      name
      url
      releases(orderBy: { field: CREATED_AT, direction: ASC }, last: 100) {
        edges {
          node {
            description
            id
            name
            tagName
          }
        }
      }
    }
  }
`;

const renderOptionsFromReleases = (
  releases?: Release[]
): React.ReactNode[] | null => {
  if (releases) {
    return releases.map((release) => (
      <option key={release.id} value={release.tagName}>
        {release.tagName}
      </option>
    ));
  }

  return null;
};

type PropTypes = {
  onRepositoryChange(repository: Repository | null): void;
  onVersionRangeChange(versionRange: VersionRange): void;
};

const RepositoryReleasesPicker: React.FC<PropTypes> = ({
  onRepositoryChange,
  onVersionRangeChange,
}) => {
  const [
    mappedRepository,
    setMappedRepository,
  ] = React.useState<Repository | null>(null);

  const [
    repositoryQueryData,
    setRepositoryQueryData,
  ] = React.useState<RepositoryQueryVars | null>(null);

  const [versionRage, setVersionRange] = React.useState<VersionRange>(
    EMPTY_VERSION_RANGE
  );

  const windowWidth = useWindowWidth();

  const toast = useToast();

  const { loading, error, data } = useQuery<
    { repository: RepositoryResponse },
    RepositoryQueryVars | null
  >(RELEASES_QUERY, {
    variables: repositoryQueryData,
    skip: !repositoryQueryData,
  });

  React.useEffect(
    function mapQueryData() {
      let newMappedRepository = null;
      if (data) {
        newMappedRepository = {
          ...data.repository,
          releases: data.repository.releases.edges.map(({ node }) => node),
        };
      }
      setMappedRepository(newMappedRepository);
    },
    [data, onRepositoryChange]
  );

  React.useEffect(
    function handleMappedRepositoryChange() {
      onRepositoryChange(mappedRepository);
    },
    [onRepositoryChange, mappedRepository]
  );

  React.useEffect(function handleVersionRangeEffect() {
    onVersionRangeChange(versionRage);
  });

  React.useEffect(
    function displayErrors() {
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

  const handleRepositoryChange = (newRepoData: RepositoryQueryVars | null) => {
    setRepositoryQueryData(newRepoData);

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
    mappedRepository?.releases.filter(
      ({ isDraft, isPrerelease }) => !isDraft && !isPrerelease
    )
  );

  const selectPlaceholder =
    Array.isArray(releasesOptions) && releasesOptions.length === 0
      ? 'Versions not found'
      : 'Pick one version';

  const [fromVersion, toVersion] = versionRage;

  return (
    <Stack
      spacing={{ base: 2, md: 6 }}
      isInline={windowWidth >= INLINE_BREAKPOINT}
    >
      <RepositoryFormControl
        isLoading={loading}
        onChange={handleRepositoryChange}
      />
      <ReleaseVersionFormControl
        label="From version"
        id="from-version"
        width={{ base: 'full', md: '30%' }}
        isDisabled={!releasesOptions}
        placeholder={selectPlaceholder}
        onChange={handleFromVersionChange}
        value={fromVersion}
      >
        {releasesOptions}
      </ReleaseVersionFormControl>
      <ReleaseVersionFormControl
        label="To version"
        id="to-version"
        width={{ base: 'full', md: '30%' }}
        isDisabled={!releasesOptions}
        placeholder={selectPlaceholder}
        onChange={handleToVersionChange}
        value={toVersion}
      >
        {releasesOptions}
      </ReleaseVersionFormControl>
    </Stack>
  );
};

export default RepositoryReleasesPicker;
