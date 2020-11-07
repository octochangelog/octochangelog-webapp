import { Divider, Flex, Text } from '@chakra-ui/core'
import { Release, Repository, VersionRange } from 'models'
import dynamic from 'next/dynamic'
import * as React from 'react'

import Container from '~/components/Container'
import GitHubLoginButton from '~/components/GitHubLoginButton'
import RepositoryReleasesChangelogHeading from '~/components/RepositoryReleasesChangelogHeading'
import RepositoryReleasesPicker from '~/components/RepositoryReleasesPicker'
import { useGithubAuth } from '~/contexts/github-auth-provider'
import useIsClientSide from '~/hooks/useIsClientSide'

const RepositoryReleasesChangelog = dynamic(
  () => import('~/components/RepositoryReleasesChangelog')
)

interface Props {
  repository?: Repository
  releases?: Release[]
  versionRange: VersionRange
  isFetching?: boolean
  onRepositoryChange(repo: Repository | null | undefined): void
  onVersionRangeChange(range: VersionRange): void
}

const RepositoryReleasesComparator = ({
  repository,
  releases,
  versionRange,
  isFetching = false,
  onRepositoryChange,
  onVersionRangeChange,
}: Props) => {
  const isClientSide = useIsClientSide()
  const { isAuth } = useGithubAuth()

  return (
    <>
      <Container>
        {isClientSide && (
          <RepositoryReleasesPicker
            releases={releases}
            versionRange={versionRange}
            isFetching={isFetching}
            onRepositoryChange={onRepositoryChange}
            onVersionRangeChange={onVersionRangeChange}
          />
        )}
      </Container>
      <Divider my={4} />
      {repository && (
        <>
          <RepositoryReleasesChangelogHeading
            repository={repository}
            fromVersion={versionRange[0]}
            toVersion={versionRange[1]}
          />
          <Container>
            <RepositoryReleasesChangelog
              repository={repository}
              releases={releases}
              fromVersion={versionRange[0]}
              toVersion={versionRange[1]}
            />
          </Container>
        </>
      )}
      {!repository && !isAuth && (
        <Container>
          <Flex alignItems="center" flexDirection="column">
            <Text mb={4}>
              You can increase the max number of allowed requests to GitHub by
              authorizing the app
            </Text>
            <GitHubLoginButton />
          </Flex>
        </Container>
      )}
    </>
  )
}

export default RepositoryReleasesComparator
