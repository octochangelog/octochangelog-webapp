import { Divider, Flex, Text } from '@chakra-ui/react'
import { Release, Repository, VersionRange } from 'models'
import dynamic from 'next/dynamic'
import * as React from 'react'

import Container from '~/components/Container'
import GitHubLoginButton from '~/components/GitHubLoginButton'
import RepositoriesComparatorFilters from '~/components/RepositoriesComparatorFilters'
import RepositoryReleasesChangelogHeading from '~/components/RepositoryReleasesChangelogHeading'
import { useComparatorState } from '~/contexts/comparator-context'
import { useGithubAuth } from '~/contexts/github-auth-provider'
import useIsClientSide from '~/hooks/useIsClientSide'

const RepositoryReleasesChangelog = dynamic(
  () => import('~/components/RepositoryReleasesChangelog')
)

interface Props {
  releases?: Release[]
  versionRange: VersionRange
  isLoading?: boolean
  onRepositoryChange(repo: Repository | null | undefined): void
  onVersionRangeChange(range: VersionRange): void
}

const RepositoryReleasesComparator = ({
  releases,
  versionRange,
  isLoading = false,
  onRepositoryChange,
  onVersionRangeChange,
}: Props) => {
  const isClientSide = useIsClientSide()
  const { isAuth } = useGithubAuth()
  const { repository } = useComparatorState()

  return (
    <>
      <Container>
        <RepositoriesComparatorFilters
          releases={releases}
          versionRange={versionRange}
          isLoading={isLoading}
          onRepositoryChange={onRepositoryChange}
          onVersionRangeChange={onVersionRangeChange}
        />
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

      {/* This is rendered only in CS since SSR doesn't have info about auth user yet*/}
      {isClientSide && !repository && !isAuth && (
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
