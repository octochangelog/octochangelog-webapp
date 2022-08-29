import type { components } from '@octokit/openapi-types'
import { rest } from 'msw'

import { renovateResults } from '~/fixtures/search/renovate-results'
import { testingLibraryResults } from '~/fixtures/search/testing-library-results'

const githubReposSearchHandlers = [
	rest.get(
		'https://api.github.com/search/repositories',
		(req, res, context) => {
			const searchQuery = req.url.searchParams.get('q') ?? ''
			const cleanSearchQuery = searchQuery.replace(/[-_]/g, ' ')
			const items: Array<components['schemas']['repo-search-result-item']> = []

			if (cleanSearchQuery.includes('test')) {
				items.push(...testingLibraryResults)
			}

			if (cleanSearchQuery.includes('reno')) {
				items.push(...renovateResults)
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
