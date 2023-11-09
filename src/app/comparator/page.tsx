import { openGraph } from '~/app/shared-metadata'

import ComparatorClientView from './ComparatorClientView'

export const metadata = {
	title: 'Comparator',
	openGraph: { ...openGraph, title: 'Comparator', url: '/comparator' },
}

const ComparatorPage = () => {
	return <ComparatorClientView />
}

export default ComparatorPage
