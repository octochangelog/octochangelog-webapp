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
import Image from 'next/image'
import NextLink from 'next/link'
import { FaCheckCircle } from 'react-icons/fa'

import Container from '~/components/Container'
import Layout from '~/components/Layout'
import Link from '~/components/Link'
import customTheme from '~/customTheme'
import { APP_MOTTO } from '~/global'

const MainSection = () => {
  return (
    <Stack align="center" direction={{ base: 'column-reverse', lg: 'row' }}>
      <Stack
        alignItems={{ base: 'center', lg: 'start' }}
        spacing={{ base: 4, lg: 8 }}
        flexGrow={1}
        flexBasis={0}
        shouldWrapChildren
      >
        <Heading
          as="h1"
          color={{ base: 'gray.700', lg: 'gray.50' }}
          fontSize="4xl"
          textAlign={{ base: 'center', lg: 'left' }}
        >
          {APP_MOTTO}
        </Heading>
        <Flex justify="center" align="center">
          <NextLink href="/">
            <Button bg="gray.700" color="white" _hover={{ bg: 'gray.900' }}>
              Check it out!
            </Button>
          </NextLink>
          <Link href="#features" ml={4} color="gray.700">
            Read more
          </Link>
        </Flex>
      </Stack>
      <Image
        src="/mascot-logo.png"
        alt="Octoclairvoyant reading a crystal ball"
        width={600}
        height={600}
        quality={100}
        priority
      />
    </Stack>
  )
}

const AboutPage = () => {
  return (
    <Layout isHeaderFixed extraTitle="About">
      <Box
        mt={-8}
        py={{ base: 8, lg: 16 }}
        minHeight="100vh"
        bgImage={`linear-gradient(180deg, ${customTheme.colors.primary[700]} 0%, ${customTheme.colors.white} 100%)`}
      >
        <Container>
          <MainSection />
        </Container>
      </Box>

      <Box mb={4}>
        <Container>
          <VStack spacing={8} alignItems="center" py={{ base: 8, lg: 16 }}>
            <Box>
              <Heading
                as="h2"
                fontSize="3xl"
                mb={{ base: 4, lg: 8 }}
                color="primary.500"
                id="features"
              >
                Main Features
              </Heading>
              <List spacing={{ base: 4, lg: 8 }}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="secondary.500" />
                  Search repositories and pick releases version range
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="secondary.500" />
                  Sort and group releases changelogs following{' '}
                  <Link href="https://semver.org/">Semantic Versioning</Link>
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="secondary.500" />
                  Share changelogs comparison through links
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="secondary.500" />
                  Normalize changes categories (e.g. put{' '}
                  <Text as="em">bug fixes</Text> and{' '}
                  <Text as="em">minor changes</Text> under the same category)
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="secondary.500" />
                  Highlight code blocks syntax and GitHub references
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="secondary.500" />
                  Make easy to spot which version introduced specific changes
                </ListItem>
              </List>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Layout>
  )
}

export default AboutPage
