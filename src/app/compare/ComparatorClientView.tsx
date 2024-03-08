'use client'

import { Box } from '@chakra-ui/react'
import { Suspense } from 'react'

import RepositoryReleasesComparator from '@/app/compare/RepositoryReleasesComparator'

import { ComparatorProvider } from './comparator-context'

const ComparatorClientView = () => {
	return (
		<Box height="full" width="full" bgColor="background3">
			<Suspense>
				<ComparatorProvider>
					<RepositoryReleasesComparator />
				</ComparatorProvider>
			</Suspense>
		</Box>
	)
}

export default ComparatorClientView
