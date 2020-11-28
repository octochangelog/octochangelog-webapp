import { Stack } from '@chakra-ui/react'
import * as React from 'react'

import ReleaseVersionsRangeFormControl from '~/components/ReleaseVersionsRangeFormControl'
import RepositorySearchCombobox from '~/components/RepositorySearchCombobox'
import {
  useComparatorState,
  useComparatorUpdater,
} from '~/contexts/comparator-context'

const RepositoriesComparatorFilters = () => {
  const { initialValues } = useComparatorState()
  const { setRepository } = useComparatorUpdater()

  return (
    <Stack
      spacing={{ base: 2, md: 6 }}
      direction={{ base: 'column', md: 'row' }}
    >
      <RepositorySearchCombobox
        onSelect={setRepository}
        initialInputValue={initialValues.repository?.full_name}
      />
      <ReleaseVersionsRangeFormControl
        width={{ base: 'full', md: '80%' }}
        direction={{ base: 'column', md: 'row' }}
      />
    </Stack>
  )
}

export default RepositoriesComparatorFilters
