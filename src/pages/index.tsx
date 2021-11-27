import {
  Box,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  VStack,
  Text,
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
import { CTAButton } from '~/components/CTAButton'
import FluidContainer from '~/components/FluidContainer'
import Layout from '~/components/Layout'
import Link from '~/components/Link'

const MainSection = () => (
  <Stack
    px="10"
    align="center"
    direction={{ base: 'column-reverse', lg: 'row' }}
  >
    <Stack
      shouldWrapChildren
      alignItems={{ base: 'center', lg: 'start' }}
      spacing="8"
      flexGrow={1}
      flexBasis={0}
    >
      <Heading
        as="h2"
        color={{ base: 'gray.900' }}
        fontSize="4xl"
        fontWeight="black"
        textAlign={{ base: 'center', lg: 'left' }}
        letterSpacing="tight"
      >
        {BRIEF_DESCRIPTION}
      </Heading>
      <Flex py="6" justify="center" align="center">
        <NextLink href="/comparator">
          <CTAButton>Try me now!</CTAButton>
        </NextLink>
      </Flex>
    </Stack>
    <Image
      priority
      src={mascotLogo}
      alt="A purple octopus reading a crystal ball"
      quality={100}
      placeholder="blur"
    />
  </Stack>
)

const HomePage = () => (
  <Layout>
    <NextSeo />
    <Box mt={-8} py={{ base: 8, lg: 16 }} bg="gray.50">
      <FluidContainer>
        <MainSection />
      </FluidContainer>
    </Box>

    <Box bg="gray.50">
      <FluidContainer>
        <VStack spacing={8} alignItems="left" py="20" px="10">
          <Box>
            <Heading
              as="h3"
              fontSize="3xl"
              mb="4"
              color="primaryTextLightmode"
              fontWeight="black"
              id="features"
            >
              Features
            </Heading>
            <List fontSize="" color="secondaryTextLightmode" spacing="4">
              <ListItem d="flex">
                <ListIcon
                  as={HiOutlineSwitchHorizontal}
                  color="sky.700"
                  boxSize={6}
                />
                Search repositories and pick a version range
              </ListItem>
              <ListItem d="flex">
                <ListIcon as={HiOutlineFilter} color="sky.700" boxSize={6} />
                <Box>
                  Sort and group releases changelogs following{' '}
                  <Link href="https://semver.org/">Semantic Versioning</Link>
                </Box>
              </ListItem>
              <ListItem d="flex">
                <ListIcon as={HiOutlineShare} color="sky.700" boxSize={6} />
                Share changelogs comparison with others by giving them a link
              </ListItem>
              <ListItem d="flex">
                <ListIcon as={HiOutlineTag} color="sky.700" boxSize={6} />
                <Box>
                  Normalize changes categories (e.g. put{' '}
                  <Text as="em">bug fixes</Text> and{' '}
                  <Text as="em">minor changes</Text> in the same category)
                </Box>
              </ListItem>
              <ListItem d="flex">
                <ListIcon
                  as={HiOutlineDocumentSearch}
                  color="sky.700"
                  boxSize={6}
                />
                Highlight code blocks syntax and GitHub references
              </ListItem>
              <ListItem d="flex">
                <ListIcon as={HiOutlineFire} color="sky.700" boxSize={6} />
                Makes it easy to spot which version introduced specific changes
              </ListItem>
            </List>
          </Box>
        </VStack>
      </FluidContainer>
    </Box>
  </Layout>
)

export default HomePage
