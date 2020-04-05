import React from 'react';
import { Box, Link } from '@chakra-ui/core';

const Footer = () => {
  return (
    <Box as="footer" px={20} py={5} bg="gray.50" flexShrink={0}>
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
    </Box>
  );
};

export default Footer;
