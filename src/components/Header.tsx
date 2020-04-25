import React from 'react';
import { Box, BoxProps, Button, Link, Flex, Heading } from '@chakra-ui/core';
import { DiGithubBadge } from 'react-icons/di';
import Container from 'components/Container';
import { REPO_URL } from 'global';
import { useAuth0 } from 'auth';

const Header = (props: BoxProps) => {
  const { isAuthenticated, logout }: any = useAuth0();

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
          <Flex alignItems="center">
            {isAuthenticated && (
              <Button
                variantColor="brand"
                onClick={logout}
                size="xs"
                variant="link"
              >
                Logout
              </Button>
            )}
            <Link href={REPO_URL} title="GitHub repo link">
              <Box as={DiGithubBadge} size={{ xs: '6', md: '12' }} />
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
