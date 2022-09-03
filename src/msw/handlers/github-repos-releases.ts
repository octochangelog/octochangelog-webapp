import type { RequestHandler, DefaultBodyType } from 'msw'
import { rest } from 'msw'

import { domTestingLibraryReleases } from '~/fixtures/github/releases'
import type { Release } from '~/models'
import { paginateList } from '~/utils'

/**
 * https://docs.github.com/en/rest/overview/resources-in-the-rest-api#pagination
 */
const DEFAULT_ITEMS_PER_PAGE = 30

interface RepoReleasesParams {
	repoOwner: string
	repoName: string
}

const githubReposReleasesHandlers: Array<RequestHandler> = [
	rest.get<DefaultBodyType, RepoReleasesParams>(
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

			// Keep response transformers in an array, so it can be extended later
			// if necessary. Always init with the paginated data.
			const responseTransformers = [context.json<Array<Release>>(data)]

			if (hasNext) {
				const nextPage = pageIndex + 1
				const { repoOwner, repoName } = req.params
				const repoString = `${repoOwner}/${repoName}`
				responseTransformers.push(
					context.set(
						'link',
						`<https://api.github.com/repos/${repoString}/releases?per_page=${perPage}&page=${nextPage}>; rel="next"`
					)
				)
			}

			return res(...responseTransformers)
		}
	),
]

export { githubReposReleasesHandlers }
