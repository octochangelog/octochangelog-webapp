import type { RequestHandler, DefaultBodyType } from 'msw'
import { rest } from 'msw'

import { domTestingLibraryRepoDetails } from '~/fixtures/github/repos/dom-testing-library'
import type { Repository } from '~/models'

interface RepoReleasesParams {
	repoOwner: string
	repoName: string
}

const githubReposDetailsHandlers: Array<RequestHandler> = [
	rest.get<DefaultBodyType, RepoReleasesParams>(
		'https://api.github.com/repos/:repoOwner/:repoName',
		(req, res, context) => {
			const { repoName } = req.params

			let data: Repository | undefined = undefined

			if (repoName === 'dom-testing-library') {
				data = domTestingLibraryRepoDetails
			}

			return res(context.json<Repository | undefined>(data))
		}
	),
]

export { githubReposDetailsHandlers }
