import {
  Box,
  Center,
  Container,
  HStack,
  Link,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import Image from 'next/image'

import poweredByVercelLogo from '@app-public/powered-by-vercel.svg'
import { REPO_URL } from '~/common'

const Footer = () => {
  const boxBgColor = useColorModeValue('gray.50', 'gray.900')

  return (
    <Box as="footer" bg={boxBgColor} flexShrink={0}>
      <Container py={5} variant="fluid">
        <Stack
          justify="space-between"
          direction={['column', 'row']}
          spacing={4}
        >
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
                aria-label="Powered by Vercel"
              >
                <Image alt="" src={poweredByVercelLogo} />
              </Link>
            </Center>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer
