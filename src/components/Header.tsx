import {
  Box,
  BoxProps,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Icon,
  IconButton,
  Stack,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import * as React from 'react'
import { FaBars } from 'react-icons/fa'

import mascotIcon from '@app-public/mascot-icon.png'
import FluidContainer from '~/components/FluidContainer'
import RouteLink from '~/components/RouteLink'
import useIsClientSide from '~/hooks/useIsClientSide'

const LOGO_SIZES = { base: '25px', md: '30px', lg: '50px' }

const MenuLink = ({
  href,
  children,
  ...rest
}: {
  children: React.ReactNode
  href: string
}) => {
  const router = useRouter()
  const isActive = router.pathname === href
  const linkWidth = useBreakpointValue({ base: 'min-content', md: 'auto' })

  return (
    <RouteLink
      href={href}
      color="primaryTextLightmode"
      borderBottomWidth="4px"
      // TODO: If link is not the active element, borderColor should equal header/drawer background
      borderColor={isActive ? 'fuchsia.300' : 'none'}
      fontWeight="black"
      fontSize={{ base: '2xl', md: 'lg' }}
      _hover={{
        textDecoration: 'none',
        borderBottomColor: 'fuchsia.500',
        color: isActive ? 'none' : 'primaryTextLightmode',
      }}
      width={linkWidth}
      aria-current={isActive ? 'page' : undefined}
      {...rest}
    >
      {children}
    </RouteLink>
  )
}

const LinksStack = () => (
  <Stack
    direction={{ base: 'column', md: 'row' }}
    spacing={{ base: 12, md: 8 }}
    align={{ base: 'center', md: 'initial' }}
  >
    <MenuLink href="/">Comparator</MenuLink>
    <MenuLink href="/about">About</MenuLink>
    {/* TODO: implement logout if necessary */}
  </Stack>
)

const HeaderLinks = () => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  const isDesktop = useBreakpointValue({ base: false, md: true })

  const linksInner = <LinksStack />

  return isDesktop ? (
    linksInner
  ) : (
    <>
      <IconButton
        aria-label="Toggle menu"
        icon={<Icon as={FaBars} />}
        variant="unstyled"
        colorScheme="coolGray.900"
        size="lg"
        onClick={onToggle}
      />
      <Drawer placement="right" isOpen={isOpen} size="full" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent py={8} backgroundColor="coolGray.100">
          <DrawerCloseButton color="coolGray.900" size="lg" />
          <DrawerBody>
            <Flex justify="center" direction="column" h="full">
              {linksInner}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

const Header = (props: BoxProps) => {
  const isClientSide = useIsClientSide()
  return (
    <Box
      as="header"
      zIndex="banner"
      {...props}
      // TODO: borderTop should be 4px when on iPhones
      borderTop="8px"
      borderColor="fuchsia.700"
    >
      <FluidContainer py={5}>
        <Flex justify="space-between" alignItems="center">
          <Flex alignItems="center">
            <Box h={LOGO_SIZES} w={LOGO_SIZES} mr={2}>
              <Image
                priority
                src={mascotIcon}
                alt="Octoclairvoyant reading a crystal ball"
                placeholder="blur"
              />
            </Box>
            <Heading
              color="primaryTextLightmode"
              letterSpacing="tight"
              fontWeight="black"
              // TODO: fontSize should be 16 px on iPhones
              fontSize="36px"
            >
              Octoclairvoyant
            </Heading>
          </Flex>
          {isClientSide && <HeaderLinks />}
        </Flex>
      </FluidContainer>
    </Box>
  )
}

export default Header
