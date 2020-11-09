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
} from '@chakra-ui/core'
import Image from 'next/image'
import { useRouter } from 'next/router'
import * as React from 'react'
import { FaBars } from 'react-icons/fa'

import Container from '~/components/Container'
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
  const isActive = router?.pathname === href
  const linkWidth = useBreakpointValue(['min-content', 'auto'])

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
      width={linkWidth}
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
    align={['center', 'initial']}
  >
    <MenuLink href="/">Home</MenuLink>
    <MenuLink href="/about">About</MenuLink>
    {/* TODO: implement logout if necessary */}
  </Stack>
)

const HeaderLinks = () => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  const isDesktop = useBreakpointValue([false, true])

  const linksInner = <LinksStack />

  return isDesktop ? (
    linksInner
  ) : (
    <>
      <IconButton
        aria-label="Toggle menu"
        icon={<Icon as={FaBars} />}
        variant="unstyled"
        colorScheme="gray.50"
        size="sm"
        onClick={onToggle}
      />
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
  )
}

const Header = (props: BoxProps) => {
  const isClientSide = useIsClientSide()

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
          {isClientSide && <HeaderLinks />}
        </Flex>
      </Container>
    </Box>
  )
}

export default Header
