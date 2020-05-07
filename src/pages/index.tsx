import {
  Box,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Stack,
} from '@chakra-ui/core';
import React from 'react';

import Container from '~/components/Container';
import GitHubLoginLink from '~/components/GitHubLoginLink';
import Layout from '~/components/Layout';
import Link from '~/components/Link';
import customTheme from '~/customTheme';
import { APP_MOTTO } from '~/global';

const IndexPage = () => (
  <Layout isHeaderFixed>
    <Box
      position="relative"
      mt={-8}
      pt={{ base: 8, md: 16 }}
      height={'100vh'}
      bgImage={`linear-gradient(180deg, ${customTheme.colors.primary[700]} 0%, ${customTheme.colors.white} 100%)`}
    >
      <Container>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 8, md: 4 }}
          alignItems="center"
        >
          <Stack
            alignItems={{ base: 'center', md: 'start' }}
            spacing={{ base: 4, md: 8 }}
          >
            <Heading
              as="h1"
              color="gray.50"
              fontSize="4xl"
              textAlign={{ base: 'center', md: 'left' }}
            >
              {APP_MOTTO}
            </Heading>
            <GitHubLoginLink />
          </Stack>
          <Box>
            <Image
              src="/logo.png"
              alt="Octoclairvoyant reading a crystal ball"
            />
          </Box>
        </SimpleGrid>
      </Container>
    </Box>

    <Box my={24}>
      <Container>
        <Heading as="h2" fontSize="3xl" mb={8}>
          Main Features
        </Heading>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 4, md: 8 }}
          alignItems="start"
        >
          <List spacing={{ base: 4, md: 8 }}>
            <ListItem>
              <ListIcon icon="check-circle" color="primary.500" />
              Filter and group several releases by same type of changes for
              comparing them at once with ease
            </ListItem>
            <ListItem>
              <ListIcon icon="check-circle" color="primary.500" />
              Highlight syntax for code blocks
            </ListItem>
            <ListItem>
              <ListIcon icon="check-circle" color="primary.500" />
              Sort by different level of changes for{' '}
              <Link href="https://semver.org/">Semantic Versioning</Link>,
              specially those using{' '}
              <Link href="https://semantic-release.gitbook.io/semantic-release/">
                semantic-release
              </Link>
            </ListItem>
            <ListItem>
              <ListIcon icon="check-circle" color="primary.500" />
              Spot original version where specific changes were introduced
            </ListItem>
          </List>

          <Image
            src="https://via.placeholder.com/840x526.png"
            alt="App comparator screenshot"
            rounded={10}
          />
        </SimpleGrid>
      </Container>
    </Box>
  </Layout>
);

export default IndexPage;
