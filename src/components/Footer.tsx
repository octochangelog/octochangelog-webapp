import { Box, Stack } from '@chakra-ui/core';
import React from 'react';

import Container from '~/components/Container';
import Link from '~/components/Link';
import { REPO_URL } from '~/global';

const Footer = () => {
  return (
    <Box as="footer" bg="gray.50" flexShrink={0}>
      <Container py={5}>
        <Stack
          isInline
          justify="space-between"
          alignItems="center"
          justifyContent="center"
          fontSize={{ base: 'md', md: 'lg' }}
        >
          <Box>
            Created with{' '}
            <span role="img" aria-label="Love">
              💜
            </span>{' '}
            by{' '}
            <Link href="https://mario.dev/" isExternal>
              Mario
            </Link>
          </Box>
          <Box>-</Box>
          <Box>
            <Link href={REPO_URL} title="GitHub repo link">
              GitHub
            </Link>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
