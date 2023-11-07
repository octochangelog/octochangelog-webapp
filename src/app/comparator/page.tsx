import ComparatorPageClient from './ComparatorPageClient'

import { openGraph } from '~/app/shared-metadata'

export const metadata = {
	title: 'Comparator',
	openGraph: { ...openGraph, title: 'Comparator' },
}

const ComparatorPage = () => {
	return <ComparatorPageClient />
}

export default ComparatorPage
