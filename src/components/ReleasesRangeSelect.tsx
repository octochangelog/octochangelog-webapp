import { Stack } from '@chakra-ui/react'
import { Release, Repository, VersionRange } from 'models'
import * as React from 'react'

import ReleaseVersionFormControl from '~/components/ReleaseVersionFormControl'
import RepositorySearchCombobox from '~/components/RepositorySearchCombobox'
import { releasesComparator } from '~/utils'

const renderOptionsFromReleases = (
  releases: Release[]
): React.ReactNode[] | null => {
  return releases.sort(releasesComparator).map((release) => (
    <option key={release.id} value={release.tag_name}>
      {release.tag_name}
    </option>
  ))
}

interface Props {
  releases?: Release[]
  versionRange: VersionRange
  isLoading?: boolean
  onRepositoryChange(repo: Repository | null | undefined): void
  onVersionRangeChange(range: VersionRange): void
}

const ReleasesRangeSelect = ({
  releases,
  versionRange,
  isLoading = false,
  onRepositoryChange,
  onVersionRangeChange,
}: Props) => {
  const handleRepositorySelect = React.useCallback(
    async (repo?: Repository | null) => {
      onRepositoryChange(repo)
    },
    [onRepositoryChange]
  )

  const handleFromVersionChange = (newFrom: string) => {
    const [, to] = versionRange
    onVersionRangeChange([newFrom, to])
  }

  const handleToVersionChange = (newTo: string) => {
    const [from] = versionRange
    onVersionRangeChange([from, newTo])
  }

  const releasesOptions = releases ? renderOptionsFromReleases(releases) : null

  const selectPlaceholder =
    Array.isArray(releasesOptions) && releasesOptions.length === 0
      ? 'Releases not found'
      : 'Choose a release'

  const [fromVersion, toVersion] = versionRange

  return (
    <Stack
      spacing={{ base: 2, md: 6 }}
      direction={{ base: 'column', md: 'row' }}
    >
      <RepositorySearchCombobox onSelect={handleRepositorySelect} />
      <ReleaseVersionFormControl
        label="From release"
        id="from-version"
        width={{ base: 'full', md: '30%' }}
        isDisabled={!releasesOptions || isLoading}
        isLoading={isLoading}
        placeholder={selectPlaceholder}
        onChange={handleFromVersionChange}
        value={fromVersion}
      >
        {releasesOptions}
      </ReleaseVersionFormControl>
      <ReleaseVersionFormControl
        label="To release"
        id="to-version"
        width={{ base: 'full', md: '30%' }}
        isDisabled={!releasesOptions || isLoading}
        isLoading={isLoading}
        placeholder={selectPlaceholder}
        onChange={handleToVersionChange}
        value={toVersion}
      >
        {releasesOptions}
      </ReleaseVersionFormControl>
    </Stack>
  )
}

export default ReleasesRangeSelect
