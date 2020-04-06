import React from 'react';
import { Box, Link } from '@chakra-ui/core';
import Container from './Container';

const Footer = () => {
  return (
    <Box as="footer" bg="gray.50" flexShrink={0}>
      <Container py={5}>
        <span>
          Built with{' '}
          <span role="img" aria-label="Love">
            🧡
          </span>{' '}
          by{' '}
          <Link href="https://mario.dev/" color="orange.500" isExternal>
            Mario
          </Link>
        </span>
      </Container>
    </Box>
  );
};

export default Footer;
