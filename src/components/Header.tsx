import {
  Box,
  BoxProps,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Stack,
  useDisclosure,
} from '@chakra-ui/core';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { FaBars } from 'react-icons/fa';

import Container from '~/components/Container';
import RouteLink from '~/components/RouteLink';
import useWindowWidth from '~/hooks/useWindowWidth';

const LOGO_SIZES = { base: '25px', md: '30px', lg: '50px' };
const INLINE_BREAKPOINT = 768; // desktop

const MenuLink = ({
  href,
  isDesktop,
  children,
  ...rest
}: {
  children: React.ReactNode;
  href: string;
  isDesktop: boolean;
}) => {
  const router = useRouter();
  const isActive = router?.pathname === href;

  return (
    <RouteLink
      href={href}
      color="white"
      borderBottomWidth={isActive ? '4px' : 'none'}
      borderColor={isActive ? 'primary.500' : 'none'}
      fontSize={{ base: '2xl', md: 'lg' }}
      _hover={{
        textDecoration: 'none',
        color: isActive ? 'none' : 'primary.300',
      }}
      width={isDesktop ? 'auto' : 'min-content'}
      {...rest}
    >
      {children}
    </RouteLink>
  );
};

const LinksStack = ({ isDesktop }: { isDesktop: boolean }) => (
  <Stack
    isInline={isDesktop}
    spacing={{ base: 12, md: 8 }}
    align={isDesktop ? undefined : 'center'}
  >
    <MenuLink href="/" isDesktop={isDesktop}>
      Home
    </MenuLink>
    <MenuLink href="/about" isDesktop={isDesktop}>
      About
    </MenuLink>
    {/* TODO: implement logout if necessary */}
  </Stack>
);

const HeaderLinks = () => {
  // TODO: extract into useResponsiveBreakpoint
  const windowWidth = useWindowWidth();
  const { isOpen, onToggle, onClose } = useDisclosure();

  const isDesktop = windowWidth > INLINE_BREAKPOINT;
  const linksInner = <LinksStack isDesktop={isDesktop} />;

  return isDesktop ? (
    linksInner
  ) : (
    <>
      <Button
        aria-label="Toggle menu"
        variant="link"
        variantColor="gray.50"
        size="sm"
        onClick={onToggle}
      >
        <Box as={FaBars} />
      </Button>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="full">
        <DrawerOverlay />
        <DrawerContent py={8} backgroundColor="gray.700">
          <DrawerCloseButton color="gray.50" />
          <DrawerBody>
            <Flex justify="center" direction="column" h="full">
              {linksInner}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const Header = (props: BoxProps) => {
  const [shouldShowLinks, setShouldShowLinks] = React.useState(false);

  React.useEffect(function renderLinksOnClientSideHydrationEffect() {
    // As header links depend on device since to render different variants,
    // we only render HeaderLinks when on Client Side
    // https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
    setShouldShowLinks(true);
  }, []);

  return (
    /* FIXME: set zIndex to "banner" when chakra-ui fixes types here */
    <Box as="header" bg="gray.700" color="white" zIndex={1200} {...props}>
      <Container py={5}>
        <Flex justify="space-between" alignItems="center">
          <Flex alignItems="center">
            <Box h={LOGO_SIZES} w={LOGO_SIZES} mr={2}>
              <Image
                src="/mascot-icon.png"
                alt="Octoclairvoyant reading a crystal ball"
                width={50}
                height={50}
              />
            </Box>
            <Heading fontSize={{ xs: 'md', md: 'xl', lg: '4xl' }}>
              Octoclairvoyant
            </Heading>
          </Flex>
          {shouldShowLinks && <HeaderLinks />}
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
