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
import MainLogo from '~/components/MainLogo';
import customTheme from '~/customTheme';
import { APP_MOTTO } from '~/global';

const IndexPage = () => (
  <Layout isHeaderFixed>
    <Box
      position="relative"
      mt={-8}
      pt={{ base: 8, md: 16 }}
      minHeight="100vh"
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
            <MainLogo />
          </Box>
        </SimpleGrid>
      </Container>
    </Box>

    <Box my={{ base: 12, md: 24 }}>
      <Container>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} alignItems="start">
          <Image
            src="https://via.placeholder.com/840x526.png"
            alt="App comparator screenshot"
            rounded={8}
          />
          <Box>
            <Heading
              as="h2"
              fontSize="3xl"
              mb={{ base: 4, md: 8 }}
              color="primary.500"
            >
              Main Features
            </Heading>
            <List spacing={{ base: 4, md: 8 }}>
              <ListItem>
                <ListIcon icon="check-circle" color="secondary.500" />
                Filter by range of versions
              </ListItem>
              <ListItem>
                <ListIcon icon="check-circle" color="secondary.500" />
                Group changes by normalized categories (e.g. put "bug fixes" and
                "minor" under the same group)
              </ListItem>
              <ListItem>
                <ListIcon icon="check-circle" color="secondary.500" />
                Sort and prioritize by different level of changes for{' '}
                <Link href="https://semver.org/">Semantic Versioning</Link>
              </ListItem>
              <ListItem>
                <ListIcon icon="check-circle" color="secondary.500" />
                Highlight code blocks syntax and GitHub references
              </ListItem>
              <ListItem>
                <ListIcon icon="check-circle" color="secondary.500" />
                Spot original version where specific changes were introduced
              </ListItem>
            </List>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  </Layout>
);

export default IndexPage;
