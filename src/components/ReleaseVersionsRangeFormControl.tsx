import { Stack, StackProps } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useQuery } from 'react-query'

import ReleaseVersionFormControl from '~/components/ReleaseVersionFormControl'
import {
  useComparatorState,
  useComparatorUpdater,
} from '~/contexts/comparator-context'
import { octokit } from '~/github-client'
import { Release, RepositoryQueryParams } from '~/models'
import { isStableRelease, releasesComparator } from '~/utils'

const renderReleasesOptions = (releases: Release[]): ReactNode[] | null => {
  return releases.sort(releasesComparator).map((release) => (
    <option key={release.id} value={release.tag_name}>
      {release.tag_name}
    </option>
  ))
}

const ReleaseVersionsRangeFormControl = (props: StackProps) => {
  const { repository, fromVersion, toVersion } = useComparatorState()
  const { setFromVersion, setToVersion } = useComparatorUpdater()

  const { data: releases, isLoading } = useQuery<Release[]>(
    ['releases', { owner: repository?.owner.login, repo: repository?.name }],
    async (_, queryParams: RepositoryQueryParams) => {
      return octokit.paginate(
        'GET /repos/:owner/:repo/releases',
        queryParams,
        (response) => response.data.filter(isStableRelease)
      )
    },
    { enabled: repository }
  )

  const releasesOptions = releases ? renderReleasesOptions(releases) : null

  const selectPlaceholder =
    Array.isArray(releasesOptions) && releasesOptions.length === 0
      ? 'Releases not found'
      : 'Choose a release'

  return (
    <Stack {...props}>
      <ReleaseVersionFormControl
        label="From release"
        id="from-version"
        isDisabled={!releasesOptions || isLoading}
        isLoading={isLoading}
        placeholder={selectPlaceholder}
        onChange={setFromVersion}
        value={fromVersion}
      >
        {releasesOptions}
      </ReleaseVersionFormControl>
      <ReleaseVersionFormControl
        label="To release"
        id="to-version"
        isDisabled={!releasesOptions || isLoading}
        isLoading={isLoading}
        placeholder={selectPlaceholder}
        onChange={setToVersion}
        value={toVersion}
      >
        {releasesOptions}
      </ReleaseVersionFormControl>
    </Stack>
  )
}

export default ReleaseVersionsRangeFormControl
