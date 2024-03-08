import { openGraph } from '@/app/shared-metadata'

import ComparatorClientView from './ComparatorClientView'

export const metadata = {
	title: 'Compare',
	openGraph: { ...openGraph, title: 'Compare', url: '/compare' },
}

const ComparatorPage = () => {
	return <ComparatorClientView />
}

export default ComparatorPage
