import { useLazyQuery } from '@apollo/react-hooks';
import { Stack, useToast } from '@chakra-ui/core';
import { gql } from 'apollo-boost';
import ReleaseVersionFormControl from 'components/ReleaseVersionFormControl';
import RepositoryFormControl from 'components/RepositoryFormControl';
import useWindowWidth from 'hooks/useWindowWidth';
import {
  RepositoryQueryVars,
  Release,
  Repository,
  RepositoryResponse,
  VersionRange,
} from 'models';
import React from 'react';
import semver from 'semver';

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

const releasesComparator = (a: Release, b: Release): number => {
  const { tagName: verA } = a;
  const { tagName: verB } = b;

  if (semver.gt(verA, verB)) {
    return -1;
  } else if (semver.lt(verA, verB)) {
    return 1;
  }

  return 0;
};

const renderOptionsFromReleases = (
  releases?: Release[]
): React.ReactNode[] | null => {
  if (releases) {
    return releases.sort(releasesComparator).map((release) => (
      <option key={release.id} value={release.tagName}>
        {release.tagName}
      </option>
    ));
  }

  return null;
};

interface RepositoryReleasesPickerProps {
  onRepositoryChange(repository: Repository | null): void;
  onVersionRangeChange(versionRange: VersionRange): void;
}

const RepositoryReleasesPicker = ({
  onRepositoryChange,
  onVersionRangeChange,
}: RepositoryReleasesPickerProps) => {
  const [
    mappedRepository,
    setMappedRepository,
  ] = React.useState<Repository | null>(null);

  const [versionRage, setVersionRange] = React.useState<VersionRange>(
    EMPTY_VERSION_RANGE
  );

  const windowWidth = useWindowWidth();

  const toast = useToast();

  const [retrieveReleases, { loading, data, error }] = useLazyQuery<
    { repository: RepositoryResponse },
    RepositoryQueryVars | null
  >(RELEASES_QUERY);

  React.useEffect(
    function mapQueryData() {
      let newMappedRepository = null;
      if (data) {
        newMappedRepository = {
          ...data.repository,
          releases: data.repository.releases.edges
            .map(({ node }) => node)
            .filter(
              // exclude pre-releases
              ({ tagName }) =>
                semver.valid(tagName) && !semver.prerelease(tagName)
            ),
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
        const errorMsg =
          // @ts-ignore
          error?.networkError?.result?.message ??
          'Unable to retrieve repository releases';
        toast({
          title: 'An error occurred.',
          description: errorMsg,
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

  const handleRepositorySearch = React.useCallback(
    (newRepoData: RepositoryQueryVars | null) => {
      retrieveReleases({ variables: newRepoData });

      // clear versions
      setVersionRange(EMPTY_VERSION_RANGE);
    },
    [retrieveReleases]
  );

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
      : 'Choose a version';

  const [fromVersion, toVersion] = versionRage;

  return (
    <Stack
      spacing={{ base: 2, md: 6 }}
      isInline={windowWidth >= INLINE_BREAKPOINT}
    >
      <RepositoryFormControl
        isLoading={loading}
        onSearch={handleRepositorySearch}
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
