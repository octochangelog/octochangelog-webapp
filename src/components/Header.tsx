import React from 'react';
import { Box, BoxProps, Link, Flex, Heading } from '@chakra-ui/core';
import { DiGithubBadge } from 'react-icons/di';
import Container from './Container';

const Header = (props: BoxProps) => {
  return (
    /* FIXME: set zIndex to "banner" when chakra-ui fixes types here */
    <Box as="header" bg="gray.700" color="white" zIndex={1200} {...props}>
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
