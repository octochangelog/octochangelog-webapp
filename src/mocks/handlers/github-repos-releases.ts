import { http, HttpResponse, type RequestHandler } from 'msw'

import {
	domTestingLibraryReleases,
	renovateReleases,
} from '~/fixtures/github/releases'
import { getApiBaseUrl } from '~/github-client'
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

const REPO_FIXTURES_MAPPING: Record<string, Array<Release> | undefined> = {
	'dom-testing-library': domTestingLibraryReleases,
	renovate: renovateReleases,
}

const githubReposReleasesHandlers: Array<RequestHandler> = [
	http.get<RepoReleasesParams>(
		`${getApiBaseUrl()}/repos/:repoOwner/:repoName/releases`,
		({ request, params }) => {
			const { repoOwner, repoName } = params
			const releasesFixture = REPO_FIXTURES_MAPPING[repoName]

			if (!releasesFixture) {
				return HttpResponse.json({ errors: [{ message: 'Not Found' }] })
			}

			const url = new URL(request.url)
			const perPage = Number(
				url.searchParams.get('per_page') ?? DEFAULT_ITEMS_PER_PAGE,
			)
			const pageIndex = Number(url.searchParams.get('page') ?? 1)

			const { data, hasNext } = paginateList(
				releasesFixture,
				perPage,
				pageIndex,
			)

			// Keep response transformers in an array, so it can be extended later
			// if necessary. Always init with the paginated data.
			const responseJson = HttpResponse.json<Array<Release>>(data)

			if (hasNext) {
				const nextPage = pageIndex + 1
				const repoString = `${repoOwner}/${repoName}`
				// @ts-expect-error "link" is a custom header
				responseJson.headers.link = `<${getApiBaseUrl()}/repos/${repoString}/releases?per_page=${perPage}&page=${nextPage}>; rel="next"`
			}

			return responseJson
		},
	),
]

export { githubReposReleasesHandlers }
