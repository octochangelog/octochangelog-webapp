import React from 'react';
import { Stack, useToast } from '@chakra-ui/core';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import {
  GitHubRepositoryQueryVars,
  Release,
  RepositoryReleases,
  VersionRange,
} from 'types';
import RepositoryFormControl from 'components/RepositoryFormControl';
import ReleaseVersionFormControl from 'components/ReleaseVersionFormControl';
import useWindowWidth from 'hooks/useWindowWidth';

const INLINE_BREAKPOINT = 768; // desktop

const EMPTY_VERSION_RANGE: VersionRange = ['', ''];

export const RELEASES_QUERY = gql`
  query Repository($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      name
      url
      releases(orderBy: { field: CREATED_AT, direction: ASC }, last: 100) {
        nodes {
          description
          id
          name
          tagName
        }
      }
    }
  }
`;

const renderOptionsFromReleases = (
  releases?: Array<Release>
): Array<React.ReactNode> | null => {
  if (releases) {
    return releases
      .filter(({ isDraft, isPrerelease }) => !isDraft && !isPrerelease)
      .map((release) => (
        <option key={release.id} value={release.tagName}>
          {release.tagName}
        </option>
      ));
  }

  return null;
};

type PropTypes = {
  onReleaseChange(repository: RepositoryReleases | null): void;
  onVersionRangeChange(versionRange: VersionRange): void;
};

const RepositoryReleasesPicker: React.FC<PropTypes> = ({
  onReleaseChange,
  onVersionRangeChange,
}) => {
  const [
    repositoryQueryData,
    setRepositoryQueryData,
  ] = React.useState<GitHubRepositoryQueryVars | null>(null);

  const [versionRage, setVersionRange] = React.useState<VersionRange>(
    EMPTY_VERSION_RANGE
  );

  const windowWidth = useWindowWidth();

  const toast = useToast();

  const { loading, error, data } = useQuery<
    { repository: RepositoryReleases },
    GitHubRepositoryQueryVars | null
  >(RELEASES_QUERY, {
    variables: repositoryQueryData,
    skip: !repositoryQueryData,
  });

  React.useEffect(
    function handleQueryDataChange() {
      if (data) {
        onReleaseChange(data.repository);
      } else {
        onReleaseChange(null);
      }
    },
    [data, onReleaseChange]
  );

  React.useEffect(function handleVersionRangeEffect() {
    onVersionRangeChange(versionRage);
  });

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

  const handleRepositoryChange = (
    newRepoData: GitHubRepositoryQueryVars | null
  ) => {
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
    data?.repository.releases.nodes
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
      <RepositoryFormControl
        isLoading={loading}
        onChange={handleRepositoryChange}
      />
      <ReleaseVersionFormControl
        label="From release"
        id="from-release"
        width={{ base: 'full', md: '30%' }}
        isDisabled={!releasesOptions}
        placeholder={selectPlaceholder}
        onChange={handleFromVersionChange}
        value={fromVersion}
      >
        {releasesOptions}
      </ReleaseVersionFormControl>
      <ReleaseVersionFormControl
        label="To release"
        id="to-release"
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
