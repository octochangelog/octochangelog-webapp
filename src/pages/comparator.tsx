import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const RepositoryReleasesComparator = dynamic(
	() => import('~/components/RepositoryReleasesComparator'),
	{ suspense: true }
)

import Layout from '~/components/Layout'
import { ComparatorProvider } from '~/contexts/comparator-context'

const ComparatorPage = () => (
	<Layout pageBgColor="background3">
		<NextSeo title="Comparator" />
		<ComparatorProvider>
			<Suspense fallback={<div />}>
				<RepositoryReleasesComparator />
			</Suspense>
		</ComparatorProvider>
	</Layout>
)

export default ComparatorPage
