import { Box, Container, Divider, Flex, Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import ConditionallyRender from '~/components/ConditionallyRender'
import GitHubLoginButton from '~/components/GitHubLoginButton'
import { getIsAuth } from '~/github-auth'

import RepositoriesComparatorFilters from './RepositoriesComparatorFilters'
import RepositoryReleasesChangelogHeading from './RepositoryReleasesChangelogHeading'
import { useComparatorState } from './comparator-context'

const RepositoryReleasesChangelog = dynamic(
	() => import('./RepositoryReleasesChangelog'),
	{ suspense: true },
)

const RepositoryReleasesComparator = () => {
	const { repository, fromVersion, toVersion } = useComparatorState()
	const isAuth = getIsAuth()

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
					{!isAuth && (
						<Container variant="fluid" pb={2}>
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
