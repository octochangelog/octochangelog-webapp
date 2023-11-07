import ComparatorClientView from './ComparatorClientView'

import { openGraph } from '~/app/shared-metadata'

export const metadata = {
	title: 'Comparator',
	openGraph: { ...openGraph, title: 'Comparator' },
}

const ComparatorPage = () => {
	return <ComparatorClientView />
}

export default ComparatorPage
