import React from 'react';
import { Box, Flex, Link } from '@chakra-ui/core';

const Footer = () => {
  return (
    <Box as="footer" px={20} py={5} bg="gray.50" flexShrink={0}>
      <Flex justify="space-between">
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
        <span>
          <Link
            href="https://github.com/Belco90/github-compare-releases"
            color="orange.500"
            isExternal
          >
            GitHub
          </Link>
        </span>
      </Flex>
    </Box>
  );
};

export default Footer;
