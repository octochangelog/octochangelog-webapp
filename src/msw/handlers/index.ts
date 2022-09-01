import type { RequestHandler } from 'msw'

import { githubReposReleasesHandlers } from './github-repos-releases'
import { githubReposSearchHandlers } from './github-repos-search'

const handlers: Array<RequestHandler> = [
	...githubReposSearchHandlers,
	...githubReposReleasesHandlers,
]

export { handlers }
