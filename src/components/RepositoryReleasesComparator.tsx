import { Container, Divider, Flex, Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import * as React from 'react'

import GitHubLoginButton from '~/components/GitHubLoginButton'
import RepositoriesComparatorFilters from '~/components/RepositoriesComparatorFilters'
import RepositoryReleasesChangelogHeading from '~/components/RepositoryReleasesChangelogHeading'
import { useComparatorState } from '~/contexts/comparator-context'
import { useGithubAuth } from '~/contexts/github-auth-provider'
import useIsClientSide from '~/hooks/useIsClientSide'

const RepositoryReleasesChangelog = dynamic(
  async () => import('~/components/RepositoryReleasesChangelog')
)

const RepositoryReleasesComparator = () => {
  const isClientSide = useIsClientSide()
  const { isAuth } = useGithubAuth()
  const { repository, fromVersion, toVersion } = useComparatorState()

  return (
    <>
      <Container variant="fluid">
        <RepositoriesComparatorFilters />
      </Container>
      <Divider my={4} />
      {repository && (
        <>
          <RepositoryReleasesChangelogHeading
            repository={repository}
            fromVersion={fromVersion ?? undefined}
            toVersion={toVersion ?? undefined}
          />
          <Container variant="fluid">
            <RepositoryReleasesChangelog
              repository={repository}
              fromVersion={fromVersion ?? undefined}
              toVersion={toVersion ?? undefined}
            />
          </Container>
        </>
      )}

      {/* This is rendered only in CS since SSR doesn't have info about auth user yet */}
      {isClientSide && !repository && !isAuth && (
        <Container variant="fluid">
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
