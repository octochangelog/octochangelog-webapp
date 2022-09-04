import type { RequestHandler } from 'msw'

import { githubReposDetailsHandlers } from './github-repos-details'
import { githubReposReleasesHandlers } from './github-repos-releases'
import { githubReposSearchHandlers } from './github-repos-search'

const handlers: Array<RequestHandler> = [
	...githubReposDetailsHandlers,
	...githubReposSearchHandlers,
	...githubReposReleasesHandlers,
]

export { handlers }
