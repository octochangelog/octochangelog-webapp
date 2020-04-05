import React from 'react';
import { Box, Link, Flex, Heading } from '@chakra-ui/core';
import { DiGithubBadge } from 'react-icons/di';

const Header = () => {
  return (
    <Box as="header" px={20} py={5} bg="gray.700" color="white">
      <Flex justify="space-between">
        <Heading>
          <span role="img" aria-label="Wool">
            🧶
          </span>{' '}
          GitHub Compare Releases
        </Heading>
        <Link
          href="https://github.com/Belco90/github-compare-releases"
          title="GitHub repo link"
        >
          <Box as={DiGithubBadge} size="12" />
        </Link>
      </Flex>
    </Box>
  );
};

export default Header;
