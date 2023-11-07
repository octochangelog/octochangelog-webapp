import { Stack } from '@chakra-ui/react'
import * as React from 'react'

import ReleaseVersionsRangeFormControl from './ReleaseVersionsRangeFormControl'
import RepositorySearchCombobox from './RepositorySearchCombobox'
import { useComparatorState, useComparatorUpdater } from './comparator-context'

const RepositoriesComparatorFilters = () => {
	const { repository } = useComparatorState()
	const { setRepository } = useComparatorUpdater()

	return (
		<Stack
			spacing={{ base: 2, md: 6 }}
			direction={{ base: 'column', md: 'row' }}
		>
			<RepositorySearchCombobox
				initialInputValue={repository?.full_name}
				onSelect={setRepository}
			/>
			<ReleaseVersionsRangeFormControl
				width={{ base: 'full', md: '80%' }}
				direction={{ base: 'column', md: 'row' }}
			/>
		</Stack>
	)
}

export default RepositoriesComparatorFilters
