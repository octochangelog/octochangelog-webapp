'use client'

import { Box } from '@chakra-ui/react'

import RepositoryReleasesComparator from '~/app/comparator/RepositoryReleasesComparator'

import { ComparatorProvider } from './comparator-context'

const ComparatorClientView = () => {
	return (
		<Box height="full" width="full" bgColor="background3">
			<ComparatorProvider>
				<RepositoryReleasesComparator />
			</ComparatorProvider>
		</Box>
	)
}

export default ComparatorClientView
