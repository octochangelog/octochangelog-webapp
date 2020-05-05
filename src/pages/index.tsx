import { Box, Heading, Image, SimpleGrid, Stack } from '@chakra-ui/core';
import styled from '@emotion/styled';
import React from 'react';

import Container from '~/components/Container';
import GitHubLoginLink from '~/components/GitHubLoginLink';
import Layout from '~/components/Layout';
import customTheme from '~/customTheme';
import { APP_MOTTO } from '~/global';

const RotatedImage = styled(Image)`
  rotate: 3deg;
`;

const IndexPage = () => (
  <Layout isHeaderFixed>
    <Box
      position="relative"
      mt={-8}
      py={{ base: 8, md: 16 }}
      height={{ base: '80vh', md: '60vh' }}
      bgImage={`linear-gradient(0deg, ${customTheme.colors.primary[200]} 0%, ${customTheme.colors.primary[600]} 100%)`}
      borderBottomLeftRadius="50% 20%"
      borderBottomRightRadius="50% 20%"
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
            <RotatedImage
              src="https://via.placeholder.com/840x526.png"
              alt="App comparator screenshot"
              rounded={10}
            />
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  </Layout>
);

export default IndexPage;
