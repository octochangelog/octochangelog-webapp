import { Box, Container, Divider, Flex, Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import ConditionallyRender from '~/components/ConditionallyRender'
import GitHubLoginButton from '~/components/GitHubLoginButton'
import RepositoriesComparatorFilters from '~/components/RepositoriesComparatorFilters'
import RepositoryReleasesChangelogHeading from '~/components/RepositoryReleasesChangelogHeading'
import { useComparatorState } from '~/contexts/comparator-context'
import { useGithubAuth } from '~/contexts/github-auth-provider'

const RepositoryReleasesChangelog = dynamic(
	() => import('~/components/RepositoryReleasesChangelog'),
	{ suspense: true }
)

const RepositoryReleasesComparator = () => {
	const { isAuth } = useGithubAuth()
	const { repository, fromVersion, toVersion } = useComparatorState()

	return (
		<Flex direction="column" height="full">
			<Box bgColor="background2" py={{ base: 4, md: 8 }}>
				<Container variant="fluid">
					<RepositoriesComparatorFilters />
				</Container>
			</Box>
			<Divider />
			<Box pt={2} flex="1 0 auto">
				{repository && (
					<>
						<RepositoryReleasesChangelogHeading
							repository={repository}
							fromVersion={fromVersion ?? undefined}
							toVersion={toVersion ?? undefined}
						/>
						<Container variant="fluid">
							<Suspense fallback={<div />}>
								<RepositoryReleasesChangelog
									repository={repository}
									fromVersion={fromVersion ?? undefined}
									toVersion={toVersion ?? undefined}
								/>
							</Suspense>
						</Container>
					</>
				)}

				{/* This is rendered only in CS since SSR doesn't have info about auth user yet */}
				<ConditionallyRender isOnlyClient>
					{!repository && !isAuth && (
						<Container variant="fluid">
							<Flex alignItems="center" flexDirection="column">
								<Text mb={4}>
									You can increase the max number of allowed requests to GitHub
									by authorizing the app.
								</Text>
								<GitHubLoginButton />
							</Flex>
						</Container>
					)}
				</ConditionallyRender>
			</Box>
		</Flex>
	)
}

export default RepositoryReleasesComparator
