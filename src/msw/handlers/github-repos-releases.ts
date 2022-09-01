import type { RequestHandler } from 'msw'
import { rest } from 'msw'

import { domTestingLibraryReleases } from '~/fixtures/github/releases'
import type { Release } from '~/models'
import { paginateList } from '~/utils'

/**
 * https://docs.github.com/en/rest/overview/resources-in-the-rest-api#pagination
 */
const DEFAULT_ITEMS_PER_PAGE = 30

const githubReposReleasesHandlers: Array<RequestHandler> = [
	rest.get(
		'https://api.github.com/repos/:repoOwner/:repoName/releases',
		(req, res, context) => {
			const perPage = Number(
				req.url.searchParams.get('per_page') ?? DEFAULT_ITEMS_PER_PAGE
			)
			const pageIndex = Number(req.url.searchParams.get('page') ?? 1)

			const { data, hasNext } = paginateList(
				domTestingLibraryReleases,
				perPage,
				pageIndex
			)
			if (hasNext) {
				// TODO: set next url in header
			}

			return res(context.json<Array<Release>>(data))
		}
	),
]

export { githubReposReleasesHandlers }
