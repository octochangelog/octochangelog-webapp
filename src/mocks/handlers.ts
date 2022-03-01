import type { RestHandler } from 'msw'
import { rest } from 'msw'

import { GITHUB_API_ROOT_ENDPOINT } from '~/common'
import type { Release } from '~/models'

const getFakeRelease = (id: number, repoSlug: string): Release => {
  const releaseVersion = `v${id}.0.0`

  return {
    id,
    url: `https://api.github.com/repos/${repoSlug}/releases/${id}`,
    assets_url: `https://api.github.com/repos/${repoSlug}/releases/${id}/assets`,
    upload_url: `https://uploads.github.com/repos/${repoSlug}/releases/${id}/assets{?name,label}`,
    html_url: `https://github.com/${repoSlug}/releases/tag/${releaseVersion}`,
    tag_name: releaseVersion,
    target_commitish: 'main',
    name: releaseVersion,
    draft: false,
    prerelease: false,
    created_at: '2022-01-25T18:00:09Z',
    published_at: '2022-01-25T18:04:25Z',
    assets: [],
    body: `## ${releaseVersion}`,
  } as unknown as Release
}

const getFakeReleasesRange = (
  page: number,
  perPage: number,
  repoSlug: string
): Array<Release> => {
  const endsAt = page * perPage
  const startsAt = endsAt - perPage + 1

  const releasesRange = []
  for (let i = startsAt; i <= endsAt; i++) {
    releasesRange.push(getFakeRelease(i, repoSlug))
  }

  return releasesRange
}

const handlers: Array<RestHandler> = [
  rest.get<undefined, { owner: string; name: string }, Array<Release>>(
    `${GITHUB_API_ROOT_ENDPOINT}/repos/:owner/:name/releases`,
    (req, res, ctx) => {
      const page = Number(req.url.searchParams.get('page') ?? '1')
      const perPage = Number(req.url.searchParams.get('per_page'))
      const repoSlug = `${req.params.owner}/${req.params.name}`

      return res(
        ctx.status(200),
        ctx.json(getFakeReleasesRange(page, perPage, repoSlug))
      )
    }
  ),
]

export { handlers }
