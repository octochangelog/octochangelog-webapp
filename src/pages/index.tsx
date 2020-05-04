import { Box, Heading, Stack } from '@chakra-ui/core';
import React from 'react';

import Container from '~/components/Container';
import GitHubLoginLink from '~/components/GitHubLoginLink';
import Layout from '~/components/Layout';
import { APP_MOTTO } from '~/global';

const IndexPage = () => (
  <Layout isHeaderFixed>
    <Box
      position="relative"
      mt={-8}
      py={16}
      bg="gray.700"
      height="50vh"
      borderBottomLeftRadius="50% 20%"
      borderBottomRightRadius="50% 20%"
    >
      <Container>
        <Stack alignItems="center" px={32} py={16} spacing={8}>
          <Heading as="h1" color="white" fontSize="4xl">
            Octoclairvoyant
          </Heading>
          <Heading as="h3" color="primary.500" fontSize="xl">
            {APP_MOTTO}
          </Heading>
          <GitHubLoginLink />
        </Stack>
      </Container>
    </Box>
  </Layout>
);

export default IndexPage;
