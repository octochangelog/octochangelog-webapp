import { Box, Heading, Image, SimpleGrid, Stack } from '@chakra-ui/core';
import React from 'react';

import Container from '~/components/Container';
import GitHubLoginLink from '~/components/GitHubLoginLink';
import Layout from '~/components/Layout';
import customTheme from '~/customTheme';
import { APP_MOTTO } from '~/global';

const IndexPage = () => (
  <Layout isHeaderFixed>
    <Box
      position="relative"
      mt={-8}
      pt={{ base: 8, md: 16 }}
      height={'100vh'}
      bgImage={`linear-gradient(180deg, ${customTheme.colors.primary[700]} 0%, ${customTheme.colors.gray[50]} 100%)`}
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
              fontFamily="heading"
              fontSize="3xl"
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
  </Layout>
);

export default IndexPage;
