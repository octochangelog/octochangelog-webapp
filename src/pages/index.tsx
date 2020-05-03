import { Box } from '@chakra-ui/core';
import React from 'react';

import Container from '~/components/Container';
import GitHubLoginLink from '~/components/GitHubLoginLink';
import Layout from '~/components/Layout';

const IndexPage = () => (
  <Layout isHeaderFixed>
    <Box
      position="relative"
      mt={-8}
      py={16}
      bg="primary.500"
      height="50vh"
      borderBottomLeftRadius="50% 20%"
      borderBottomRightRadius="50% 20%"
    >
      <Container>
        <GitHubLoginLink />
      </Container>
    </Box>
  </Layout>
);

export default IndexPage;
