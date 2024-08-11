import { http, HttpResponse, type RequestHandler } from 'msw'

import {
	domTestingLibraryReleases,
	renovateReleases,
} from '@/fixtures/github/releases'
import { type Release } from '@/models'
import { paginateList } from '@/utils'

import { getMockApiPath } from '../utils'

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
		`${getMockApiPath()}/repos/:repoOwner/:repoName/releases`,
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

			const responseJson = HttpResponse.json<Array<Release>>(data)

			if (hasNext) {
				const nextPage = pageIndex + 1
				const repoString = `${repoOwner}/${repoName}`
				responseJson.headers.set(
					'link',
					`<${getMockApiPath()}/repos/${repoString}/releases?per_page=${perPage}&page=${nextPage}>; rel="next"`,
				)
				responseJson.headers.set(
					'access-control-expose-headers',
					'ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Used, X-RateLimit-Resource, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type, X-GitHub-SSO, X-GitHub-Request-Id, Deprecation, Sunset',
				)
			}

			return responseJson
		},
	),
]

export { githubReposReleasesHandlers }
