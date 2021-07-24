import {
  Box,
  Button,
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
import { FaCheck } from 'react-icons/fa'

import mascotLogo from '@app-public/mascot-logo.png'
import { BRIEF_DESCRIPTION } from '~/common'
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
          <Button
            fontWeight="black"
            fontSize="2xl"
            letterSpacing="tight"
            p="6"
            size="lg"
            shadow="lg"
            bg="primary.100"
            color="primary.900"
            _hover={{ bg: 'primary.200' }}
            _active={{ bg: 'primary.300' }}
          >
            Try me now!
          </Button>
        </NextLink>
      </Flex>
    </Stack>
    <Image
      priority
      src={mascotLogo}
      alt="Octoclairvoyant reading a crystal ball"
      quality={100}
      placeholder="blur"
    />
  </Stack>
)

const HomePage = () => (
  <Layout>
    <NextSeo title="Homepage" />
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
              <ListItem mt="-2">
                <ListIcon as={FaCheck} color="sky.400" />
                Search repositories and pick a version range
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheck} color="sky.400" />
                Sort and group releases changelogs following{' '}
                <Link href="https://semver.org/">Semantic Versioning</Link>
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheck} color="sky.400" />
                Share changelogs comparison with others by giving them a link
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheck} color="sky.400" />
                Normalize changes categories (e.g. put{' '}
                <Text as="em">bug fixes</Text> and{' '}
                <Text as="em">minor changes</Text> in the same category)
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheck} color="sky.400" />
                Highlight code blocks syntax and GitHub references
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheck} color="sky.400" />
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
