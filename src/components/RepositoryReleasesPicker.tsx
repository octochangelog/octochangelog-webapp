import { Stack } from '@chakra-ui/core';
import useWindowWidth from 'hooks/useWindowWidth';
import { Release, RepositoryQueryPayload, VersionRange } from 'models';
import React from 'react';

import ReleaseVersionFormControl from '~/components/ReleaseVersionFormControl';
import RepositoryFormControl from '~/components/RepositoryFormControl';
import { releasesComparator } from '~/utils';

const INLINE_BREAKPOINT = 768; // desktop

const renderOptionsFromReleases = (
  releases: Release[]
): React.ReactNode[] | null => {
  return releases.sort(releasesComparator).map((release) => (
    <option key={release.id} value={release.tag_name}>
      {release.tag_name}
    </option>
  ));
};

interface Props {
  releases?: Release[];
  versionRange: VersionRange;
  onRepositoryChange(repository: RepositoryQueryPayload | null): void;
  onVersionRangeChange(range: VersionRange): void;
}

const RepositoryReleasesPicker: React.FC<Props> = ({
  releases,
  versionRange,
  onRepositoryChange,
  onVersionRangeChange,
}) => {
  const windowWidth = useWindowWidth();

  // TODO: move this to comparator page
  // React.useEffect(
  //   function displayErrors() {
  //     if (error) {
  //       const errorMsg =
  //         // @ts-ignore
  //         error?.networkError?.result?.message ??
  //         'Unable to retrieve repository releases';
  //       toast({
  //         title: 'An error occurred.',
  //         description: errorMsg,
  //         status: 'error',
  //         duration: 5000,
  //         isClosable: true,
  //       });
  //
  //       // clear versions
  //       setVersionRange(EMPTY_VERSION_RANGE);
  //     }
  //   },
  //   [error, toast]
  // );

  const handleRepoReleasesSearch = React.useCallback(
    async (payload: RepositoryQueryPayload) => {
      onRepositoryChange(payload);
    },
    [onRepositoryChange]
  );

  const handleFromVersionChange = (newFrom: string) => {
    const [, to] = versionRange;
    onVersionRangeChange([newFrom, to]);
  };

  const handleToVersionChange = (newTo: string) => {
    const [from] = versionRange;
    onVersionRangeChange([from, newTo]);
  };

  const releasesOptions = releases ? renderOptionsFromReleases(releases) : null;

  const selectPlaceholder =
    Array.isArray(releasesOptions) && releasesOptions.length === 0
      ? 'Versions not found'
      : 'Choose a version';

  const [fromVersion, toVersion] = versionRange;

  return (
    <Stack
      spacing={{ base: 2, md: 6 }}
      isInline={windowWidth >= INLINE_BREAKPOINT}
    >
      <RepositoryFormControl
        isLoading={false}
        onSearch={handleRepoReleasesSearch}
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
