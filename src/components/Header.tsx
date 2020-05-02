import { Box, BoxProps, Link, Flex, Heading, Image } from '@chakra-ui/core';
import { REPO_URL } from 'global';
import { DiGithubBadge } from 'react-icons/di';

import Container from '~/components/Container';
import RouteLink from '~/components/RouteLink';

const LOGO_SIZES = { base: '25px', md: '30px', lg: '50px' };

const Header = (props: BoxProps) => {
  // TODO: implement logout if necessary
  return (
    /* FIXME: set zIndex to "banner" when chakra-ui fixes types here */
    <Box as="header" bg="gray.700" color="white" zIndex={1200} {...props}>
      <Container py={5}>
        <Flex justify="space-between" alignItems="center">
          <Flex alignItems="center">
            <Image as="picture" h={LOGO_SIZES} w={LOGO_SIZES} mr={2}>
              <source srcSet="/logo.webp" type="image/webp" />
              <img src="/logo.png" alt="Crystal ball" />
            </Image>
            <Heading fontSize={{ xs: 'md', md: 'xl', lg: '4xl' }}>
              <RouteLink href="/" color="white">
                Octoclairvoyant
              </RouteLink>
            </Heading>
          </Flex>
          <Link href={REPO_URL} title="GitHub repo link">
            <Box as={DiGithubBadge} size={{ xs: '6', md: '12' }} />
          </Link>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
