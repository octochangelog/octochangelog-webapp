import { http, HttpResponse, type RequestHandler } from 'msw'

import {
	renovateResults,
	testingLibraryResults,
} from '~/fixtures/github/search'
import { getApiBaseUrl } from '~/github-client'
import type { RepoSearchResultItem } from '~/models'

const githubReposSearchHandlers: Array<RequestHandler> = [
	http.get(`${getApiBaseUrl()}/search/repositories`, ({ request }) => {
		const url = new URL(request.url)
		const searchQuery = url.searchParams.get('q') ?? ''
		const cleanSearchQuery = searchQuery.replace(/[-_]/g, ' ')
		const items: Array<RepoSearchResultItem> = []

		if (cleanSearchQuery.includes('test')) {
			items.push(...testingLibraryResults)
		}

		if (cleanSearchQuery.includes('reno')) {
			items.push(...renovateResults)
		}

		return HttpResponse.json({
			total_count: items.length,
			incomplete_results: false,
			items,
		})
	}),
]

export { githubReposSearchHandlers }
