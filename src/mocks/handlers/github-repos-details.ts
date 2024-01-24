import { http, HttpResponse, type RequestHandler } from 'msw'

import { domTestingLibraryRepoDetails } from '@/fixtures/github/repos/dom-testing-library'
import { renovateRepoDetails } from '@/fixtures/github/repos/renovate'
import { type Repository } from '@/models'

import { getMockApiPath } from '../utils'

interface RepoReleasesParams {
	repoOwner: string
	repoName: string
}

interface NotFoundResponse {
	message: string
}

const NOT_FOUND_DATA: NotFoundResponse = {
	message: 'Not Found',
}

function getRepoDetailsFixture(
	repoName: string,
): Repository | NotFoundResponse {
	if (repoName === 'dom-testing-library') {
		return domTestingLibraryRepoDetails
	}

	if (repoName === 'renovate') {
		return renovateRepoDetails
	}

	return NOT_FOUND_DATA
}

const githubReposDetailsHandlers: Array<RequestHandler> = [
	http.get<RepoReleasesParams>(
		`${getMockApiPath()}/repos/:repoOwner/:repoName`,
		({ params }) => {
			const { repoName } = params

			const data = getRepoDetailsFixture(repoName)

			return HttpResponse.json(data)
		},
	),
]

export { githubReposDetailsHandlers }
