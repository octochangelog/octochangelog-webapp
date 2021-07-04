import { Box, Center, HStack, Stack } from '@chakra-ui/react'
import Image from 'next/image'

import poweredByVercelLogo from '@app-public/powered-by-vercel.svg'
import { REPO_URL } from '~/common'
import FluidContainer from '~/components/FluidContainer'
import Link from '~/components/Link'

const Footer = () => (
  <Box as="footer" bg="gray.50" flexShrink={0}>
    <FluidContainer py={5}>
      <Stack justify="space-between" direction={['column', 'row']} spacing={4}>
        <HStack
          shouldWrapChildren
          justify="space-between"
          alignItems="center"
          justifyContent="center"
          fontSize={{ base: 'md', md: 'lg' }}
        >
          <Box>
            Created with{' '}
            <span role="img" aria-label="Love">
              💜
            </span>{' '}
            by{' '}
            <Link isExternal href="https://mario.dev/">
              Mario
            </Link>
          </Box>
          <Box as="span">-</Box>
          <Link
            isExternal
            href={REPO_URL}
            title="Octoclairvoyant repository on GitHub"
          >
            GitHub
          </Link>
        </HStack>
        <Box>
          <Center>
            <Link
              isExternal
              href="https://vercel.com/?utm_source=octoclairvoyant-team&utm_campaign=oss"
            >
              <Image src={poweredByVercelLogo} />
            </Link>
          </Center>
        </Box>
      </Stack>
    </FluidContainer>
  </Box>
)

export default Footer
