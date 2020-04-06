import React from 'react';
import { Box, Link, Flex, Heading } from '@chakra-ui/core';
import { DiGithubBadge } from 'react-icons/di';
import Container from './Container';

const Header = () => {
  return (
    <Box as="header" bg="gray.700" color="white">
      <Container py={5}>
        <Flex justify="space-between">
          <Heading fontSize={{ xs: 'md', md: '4xl' }}>
            <span role="img" aria-label="Wool">
              🧶
            </span>{' '}
            GitHub Compare Releases
          </Heading>
          <Link
            href="https://github.com/Belco90/github-compare-releases"
            title="GitHub repo link"
          >
            <Box as={DiGithubBadge} size={{ xs: '6', md: '12' }} />
          </Link>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
