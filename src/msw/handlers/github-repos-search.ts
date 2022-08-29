import type { components } from '@octokit/openapi-types'
import { rest } from 'msw'

import { testingLibraryResults } from '~/fixtures/search/testing-library'

const githubReposSearchHandlers = [
	rest.get(
		'https://api.github.com/search/repositories',
		(req, res, context) => {
			const searchQuery = req.url.searchParams.get('q') ?? ''
			const cleanSearchQuery = searchQuery.replace(/[-_]/g, ' ')
			let items: Array<components['schemas']['repo-search-result-item']> = []

			if (cleanSearchQuery.includes('testing')) {
				items = testingLibraryResults
			}
			return res(
				context.json({
					total_count: items.length,
					incomplete_results: false,
					items,
				})
			)
		}
	),
]

export { githubReposSearchHandlers }
