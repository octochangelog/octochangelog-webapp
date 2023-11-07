import { Badge, Box, Container, Heading, Link, Text } from '@chakra-ui/react'

import type { Repository } from '~/models'

interface Props {
	repository: Repository
	fromVersion?: string
	toVersion?: string
}

const RepositoryReleasesChangelogHeading = ({
	repository,
	fromVersion,
	toVersion,
}: Props) => (
	<Box width="full" py={1} mb={{ base: 4, md: 8 }}>
		<Container variant="fluid">
			<Heading as="h2" size="lg" mb={2}>
				<Link isExternal href={repository.html_url}>
					{repository.name}
				</Link>
			</Heading>

			{fromVersion && toVersion ? (
				<Heading fontSize="md" mb={2} color="secondary.600">
					Changes from{' '}
					<Badge
						variant="subtle"
						colorScheme="secondary"
						fontSize={13}
						lineHeight={1.5}
						color="secondary.800"
					>
						{fromVersion}
					</Badge>{' '}
					to{' '}
					<Badge
						variant="subtle"
						colorScheme="secondary"
						fontSize={13}
						lineHeight={1.5}
						color="secondary.800"
					>
						{toVersion}
					</Badge>
				</Heading>
			) : (
				<Text as="i" color="gray.900">
					No releases selected to compare between.
				</Text>
			)}
		</Container>
	</Box>
)

export default RepositoryReleasesChangelogHeading
