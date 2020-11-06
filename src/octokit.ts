import { Octokit } from '@octokit/rest'

import { IS_PRODUCTION_MODE } from '~/global'

const userAgent = IS_PRODUCTION_MODE
  ? 'Octoclairvoyant'
  : 'Test Octoclairvoyant'

const octokit = new Octokit({
  userAgent,
  log: IS_PRODUCTION_MODE ? undefined : console,
})

export default octokit
