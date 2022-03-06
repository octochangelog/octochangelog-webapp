import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  List,
  ListIcon,
  ListItem,
  Stack,
  VStack,
  Text,
  Container,
  Center,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import NextLink from 'next/link'
import {
  HiOutlineFilter,
  HiOutlineSwitchHorizontal,
  HiOutlineShare,
  HiOutlineFire,
  HiOutlineDocumentSearch,
  HiOutlineTag,
} from 'react-icons/hi'

import mascotLogo from '@app-public/mascot-logo.png'
import { BRIEF_DESCRIPTION } from '~/common'
import Layout from '~/components/Layout'

const MainSection = () => (
  <Stack
    alignItems="center"
    justifyContent="center"
    direction={{ base: 'column-reverse', lg: 'row' }}
    spacing={{ base: 10, lg: 1 }}
  >
    <Stack alignItems={{ base: 'center', lg: 'start' }} spacing="24">
      <Heading
        as="h2"
        color="primaryText"
        fontSize={{ base: '3xl', md: '5xl' }}
        fontWeight="black"
        textAlign={{ base: 'center', lg: 'left' }}
        letterSpacing="tight"
        px={{ base: 12, lg: 0 }}
      >
        {BRIEF_DESCRIPTION}
      </Heading>
      <Flex justify="center" align="center">
        <NextLink href="/comparator" passHref>
          <Button as="a" variant="cta">
            Try me now!
          </Button>
        </NextLink>
      </Flex>
    </Stack>
    <Center width="full">
      <Image src={mascotLogo} alt="" quality={100} />
    </Center>
  </Stack>
)

const HomePage = () => {
  return (
    <Layout>
      <NextSeo />
      <Box mt={-8} py={{ base: 8, lg: 16 }}>
        <Container maxWidth="container.lg">
          <MainSection />
        </Container>
      </Box>

      <Box>
        <Container maxWidth="container.lg">
          <VStack spacing={8} alignItems="left" py="20">
            <Box>
              <Heading
                as="h3"
                fontSize="3xl"
                mb="4"
                color="primaryText"
                fontWeight="black"
                id="features"
              >
                Features
              </Heading>
              <List fontSize="" color="secondaryText" spacing="4">
                <ListItem d="flex">
                  <ListIcon
                    as={HiOutlineSwitchHorizontal}
                    color="secondary.700"
                    boxSize={6}
                  />
                  Search repositories and pick a version range
                </ListItem>
                <ListItem d="flex">
                  <ListIcon
                    as={HiOutlineFilter}
                    color="secondary.700"
                    boxSize={6}
                  />
                  <Box>
                    Sort and group releases changelogs following{' '}
                    <Link href="https://semver.org/">Semantic Versioning</Link>
                  </Box>
                </ListItem>
                <ListItem d="flex">
                  <ListIcon
                    as={HiOutlineShare}
                    color="secondary.700"
                    boxSize={6}
                  />
                  Share changelogs comparison with others by giving them a link
                </ListItem>
                <ListItem d="flex">
                  <ListIcon
                    as={HiOutlineTag}
                    color="secondary.700"
                    boxSize={6}
                  />
                  <Box>
                    Normalize changes categories (e.g. put{' '}
                    <Text as="em">bug fixes</Text> and{' '}
                    <Text as="em">minor changes</Text> in the same category)
                  </Box>
                </ListItem>
                <ListItem d="flex">
                  <ListIcon
                    as={HiOutlineDocumentSearch}
                    color="secondary.700"
                    boxSize={6}
                  />
                  Highlight code blocks syntax and GitHub references
                </ListItem>
                <ListItem d="flex">
                  <ListIcon
                    as={HiOutlineFire}
                    color="secondary.700"
                    boxSize={6}
                  />
                  Makes it easy to spot which version introduced specific
                  changes
                </ListItem>
              </List>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Layout>
  )
}

export default HomePage
