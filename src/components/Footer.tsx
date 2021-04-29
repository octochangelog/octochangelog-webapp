import { Box, Center, HStack, Stack } from '@chakra-ui/react'
import Image from 'next/image'

import { REPO_URL } from '~/common'
import FluidContainer from '~/components/FluidContainer'
import Link from '~/components/Link'

const Footer = () => {
  return (
    <Box as="footer" bg="gray.50" flexShrink={0}>
      <FluidContainer py={5}>
        <Stack
          justify="space-between"
          direction={['column', 'row']}
          spacing={4}
        >
          <HStack
            justify="space-between"
            alignItems="center"
            justifyContent="center"
            fontSize={{ base: 'md', md: 'lg' }}
            shouldWrapChildren
          >
            <Box>
              Created with{' '}
              <span role="img" aria-label="Love">
                💜
              </span>{' '}
              by{' '}
              <Link href="https://mario.dev/" isExternal>
                Mario
              </Link>
            </Box>
            <Box as="span">-</Box>
            <Link href={REPO_URL} title="GitHub repo link">
              GitHub
            </Link>
          </HStack>
          <Box>
            <Center>
              <Link
                href="https://vercel.com/?utm_source=octoclairvoyant&utm_campaign=oss"
                isExternal
              >
                <Image src="/powered-by-vercel.svg" width={212} height={44} />
              </Link>
            </Center>
          </Box>
        </Stack>
      </FluidContainer>
    </Box>
  )
}

export default Footer
