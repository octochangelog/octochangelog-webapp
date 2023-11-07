import { CircularProgress, Flex } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'
import { Suspense } from 'react'

const RepositoryReleasesComparator = dynamic(
	() => import('~/components/RepositoryReleasesComparator'),
	{ suspense: true },
)

import Layout from '~/components/Layout'
import { ComparatorProvider } from '~/contexts/comparator-context'
import { useMsw } from '~/hooks/useMsw'

const loadingComponent = (
	<Flex align="center" justify="center" height="100%">
		<CircularProgress isIndeterminate size="8" color="primary.400" />
	</Flex>
)

const ComparatorPage = () => {
	const { isReady } = useMsw()

	return (
		<Layout pageBgColor="background3">
			<NextSeo title="Comparator" />
			{isReady ? (
				<ComparatorProvider>
					<Suspense fallback={loadingComponent}>
						<RepositoryReleasesComparator />
					</Suspense>
				</ComparatorProvider>
			) : (
				loadingComponent
			)}
		</Layout>
	)
}

export default ComparatorPage
