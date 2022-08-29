import type { RestHandler } from 'msw'

import { githubReposSearchHandlers } from './github-repos-search'

const handlers: Array<RestHandler> = [...githubReposSearchHandlers]

export { handlers }
