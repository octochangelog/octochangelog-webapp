import { Badge, Box, Heading, Text } from '@chakra-ui/react'

import FluidContainer from '~/components/FluidContainer'
import Link from '~/components/Link'
import { Repository } from '~/models'
import { getRepositoryNameDisplay } from '~/utils'

interface Props {
  repository: Repository
  fromVersion?: string
  toVersion?: string
}

const RepositoryReleasesChangelogHeading = ({
  repository,
  fromVersion,
  toVersion,
}: Props) => {
  return (
    <Box width="full" py={1} mb={{ base: 4, md: 8 }}>
      <FluidContainer>
        <Heading as="h1" size="lg" mb={2}>
          <Link href={repository.html_url} isExternal color="primary.500">
            {getRepositoryNameDisplay(repository.name)}
          </Link>
        </Heading>

        {fromVersion && toVersion ? (
          <Heading fontSize="md" mb={2} color="secondary.500">
            Comparing changes from{' '}
            <Badge
              variant="solid"
              colorScheme="secondary"
              fontSize={13}
              lineHeight={1.5}
            >
              {fromVersion}
            </Badge>{' '}
            to{' '}
            <Badge
              variant="solid"
              colorScheme="secondary"
              fontSize={13}
              lineHeight={1.5}
            >
              {toVersion}
            </Badge>
          </Heading>
        ) : (
          <Text as="i" color="gray.500">
            No releases selected to compare
          </Text>
        )}
      </FluidContainer>
    </Box>
  )
}

export default RepositoryReleasesChangelogHeading
