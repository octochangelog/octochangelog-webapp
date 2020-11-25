import { Stack } from '@chakra-ui/react'
import { Release, Repository, VersionRange } from 'models'
import * as React from 'react'

import ReleaseVersionsRangeFormControl from '~/components/ReleaseVersionsRangeFormControl'
import RepositorySearchCombobox from '~/components/RepositorySearchCombobox'

interface Props {
  releases?: Release[]
  versionRange: VersionRange
  isLoading?: boolean
  onRepositoryChange(repo: Repository | null | undefined): void
  onVersionRangeChange(range: VersionRange): void
}

const RepositoriesComparatorFilters = ({
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

  return (
    <Stack
      spacing={{ base: 2, md: 6 }}
      direction={{ base: 'column', md: 'row' }}
    >
      <RepositorySearchCombobox onSelect={handleRepositorySelect} />
      <ReleaseVersionsRangeFormControl
        width={{ base: 'full', md: '80%' }}
        direction={{ base: 'column', md: 'row' }}
        releases={releases}
        versionRange={versionRange}
        onVersionRangeChange={onVersionRangeChange}
        isLoading={isLoading}
      />
    </Stack>
  )
}

export default RepositoriesComparatorFilters
