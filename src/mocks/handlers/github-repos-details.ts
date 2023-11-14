import { type RequestHandler, type DefaultBodyType } from 'msw'
import { rest } from 'msw'

import { domTestingLibraryRepoDetails } from '@/fixtures/github/repos/dom-testing-library'
import { renovateRepoDetails } from '@/fixtures/github/repos/renovate'
import { type Repository } from '@/models'

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
	rest.get<DefaultBodyType, RepoReleasesParams>(
		'https://api.github.com/repos/:repoOwner/:repoName',
		(req, res, context) => {
			const { repoName } = req.params

			const data = getRepoDetailsFixture(repoName)

			return res(context.json<Repository | NotFoundResponse>(data))
		},
	),
]

export { githubReposDetailsHandlers }
