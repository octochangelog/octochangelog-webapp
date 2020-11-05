import { Badge, Box, Heading, Text } from '@chakra-ui/core'
import { useRef } from 'react'
import { getRepositoryNameDisplay } from 'utils'

import Container from '~/components/Container'
import Link from '~/components/Link'
import useIsStick from '~/hooks/useIsStick'
import { Repository } from '~/models'

interface Props {
  repository: Repository
  fromVersion: string
  toVersion: string
}

const RepositoryReleasesChangelogHeading = ({
  repository,
  fromVersion,
  toVersion,
}: Props) => {
  const stickyEl = useRef({ offsetTop: 0 })
  const isHeadingStick = useIsStick(stickyEl)

  return (
    <Box
      position="sticky"
      top="-1px"
      width="full"
      bg="white"
      py={1}
      ref={stickyEl}
      isStick={isHeadingStick}
      mb={isHeadingStick ? 0 : { base: 4, md: 8 }}
      shadow={isHeadingStick ? 'md' : 'none'}
      transition="height 50ms linear, font-size 500ms linear"
      // @ts-ignore (chakra doesn't expose proper types for this)
      zIndex="banner"
    >
      <Container>
        <Heading as="h1" size={isHeadingStick ? 'lg' : '2xl'} mb={2}>
          <Link href={repository.html_url} isExternal color="primary.500">
            {getRepositoryNameDisplay(repository.name)}
          </Link>
        </Heading>

        {fromVersion && toVersion ? (
          <Heading
            fontSize={isHeadingStick ? 'xs' : 'md'}
            mb={2}
            color="secondary.500"
          >
            Comparing changes from{' '}
            <Badge
              variant="solid"
              variantColor="secondary"
              fontSize={isHeadingStick ? 11 : 13}
            >
              {fromVersion}
            </Badge>{' '}
            to{' '}
            <Badge
              variant="solid"
              variantColor="secondary"
              fontSize={isHeadingStick ? 11 : 13}
            >
              {toVersion}
            </Badge>
          </Heading>
        ) : (
          <Text as="i" color="gray.500">
            No releases selected to compare
          </Text>
        )}
      </Container>
    </Box>
  )
}

export default RepositoryReleasesChangelogHeading
