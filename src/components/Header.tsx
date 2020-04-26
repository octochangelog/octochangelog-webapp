import React from 'react';
import { Box, BoxProps, Link, Flex, Heading } from '@chakra-ui/core';
import { DiGithubBadge } from 'react-icons/di';
import Container from 'components/Container';
import { REPO_URL } from 'global';

const Header = (props: BoxProps) => {
  // TODO: implement logout if necessary
  return (
    /* FIXME: set zIndex to "banner" when chakra-ui fixes types here */
    <Box as="header" bg="gray.700" color="white" zIndex={1200} {...props}>
      <Container py={5}>
        <Flex justify="space-between" alignItems="center">
          <Heading fontSize={{ xs: 'md', md: '4xl' }}>
            <span role="img" aria-label="Crystal ball">
              🔮
            </span>{' '}
            Octoclairvoyant
          </Heading>
          <Link href={REPO_URL} title="GitHub repo link">
            <Box as={DiGithubBadge} size={{ xs: '6', md: '12' }} />
          </Link>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
