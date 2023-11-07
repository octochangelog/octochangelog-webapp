import { Box, Container, Divider, Flex } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

import AuthMessageSection from './AuthMessageSection'
import RepositoriesComparatorFilters from './RepositoriesComparatorFilters'
import RepositoryReleasesChangelogHeading from './RepositoryReleasesChangelogHeading'
import { useComparatorState } from './comparator-context'

const RepositoryReleasesChangelog = dynamic(
	() => import('./RepositoryReleasesChangelog'),
)

const RepositoryReleasesComparator = () => {
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
							<RepositoryReleasesChangelog
								repository={repository}
								fromVersion={fromVersion ?? undefined}
								toVersion={toVersion ?? undefined}
							/>
						</Container>
					</>
				)}

				<AuthMessageSection />
			</Box>
		</Flex>
	)
}

export default RepositoryReleasesComparator
