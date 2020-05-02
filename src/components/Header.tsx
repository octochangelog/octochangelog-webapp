import {
  Box,
  BoxProps,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  IconButton,
  Link,
  Flex,
  Heading,
  Image,
  Stack,
  useDisclosure,
} from '@chakra-ui/core';
import { REPO_URL } from 'global';
import React from 'react';
import { DiGithubBadge } from 'react-icons/di';

import Container from '~/components/Container';
import RouteLink from '~/components/RouteLink';
import useWindowWidth from '~/hooks/useWindowWidth';

const LOGO_SIZES = { base: '25px', md: '30px', lg: '50px' };
const INLINE_BREAKPOINT = 768; // desktop

const LinksStack = ({ isDesktop }: { isDesktop: boolean }) => (
  <Stack isInline={isDesktop} align="center" spacing={4}>
    <RouteLink href="/" color={isDesktop ? 'white' : 'gray.800'}>
      Home
    </RouteLink>
    <RouteLink href="/comparator" color={isDesktop ? 'white' : 'gray.800'}>
      Comparator
    </RouteLink>
    <Link href={REPO_URL} title="GitHub repo link">
      <Box as={DiGithubBadge} size={{ xs: '6', md: '12' }} />
    </Link>
    {/*  TODO: implement logout if necessary*/}
  </Stack>
);

const Header = (props: BoxProps) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  // TODO: extract into useDesktopSize
  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth > INLINE_BREAKPOINT;
  const linksInner = <LinksStack isDesktop={isDesktop} />;

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
          {isDesktop ? (
            linksInner
          ) : (
            <>
              <IconButton
                aria-label="Toggle menu"
                icon="copy"
                variant="ghost"
                size="sm"
                onClick={onToggle}
              />
              <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerBody>{linksInner}</DrawerBody>
                </DrawerContent>
              </Drawer>
            </>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
