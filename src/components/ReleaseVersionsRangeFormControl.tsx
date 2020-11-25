import { Stack, StackProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

import ReleaseVersionFormControl from '~/components/ReleaseVersionFormControl'
import { Release, VersionRange } from '~/models'
import { releasesComparator } from '~/utils'

type Props = StackProps & {
  releases?: Release[]
  isLoading?: boolean
  versionRange: VersionRange
  onVersionRangeChange(range: VersionRange): void
}

const renderReleasesOptions = (releases: Release[]): ReactNode[] | null => {
  return releases.sort(releasesComparator).map((release) => (
    <option key={release.id} value={release.tag_name}>
      {release.tag_name}
    </option>
  ))
}

const ReleaseVersionsRangeFormControl = ({
  releases,
  isLoading = false,
  versionRange,
  onVersionRangeChange,
  ...rest
}: Props) => {
  const handleFromVersionChange = (newFrom: string) => {
    const [, to] = versionRange
    onVersionRangeChange([newFrom, to])
  }

  const handleToVersionChange = (newTo: string) => {
    const [from] = versionRange
    onVersionRangeChange([from, newTo])
  }

  const releasesOptions = releases ? renderReleasesOptions(releases) : null

  const selectPlaceholder =
    Array.isArray(releasesOptions) && releasesOptions.length === 0
      ? 'Releases not found'
      : 'Choose a release'

  const [fromVersion, toVersion] = versionRange

  return (
    <Stack {...rest}>
      <ReleaseVersionFormControl
        label="From release"
        id="from-version"
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

export default ReleaseVersionsRangeFormControl
