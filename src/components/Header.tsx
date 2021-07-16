import { Box, BoxProps, Flex, Heading } from '@chakra-ui/react'
import Image from 'next/image'
import * as React from 'react'

import mascotIcon from '@app-public/mascot-icon.png'
import FluidContainer from '~/components/FluidContainer'
import RouteLink from '~/components/RouteLink'
import ToggleColorModeButton from '~/components/ToggleColorModeButton'

const LOGO_SIZES = { base: '25px', md: '30px', lg: '50px' }

const Header = (props: BoxProps) => {
  return (
    <Box
      as="header"
      zIndex="banner"
      {...props}
      borderTopWidth={{ base: '4px', sm: '8px' }}
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
              fontSize={{ base: '16px', sm: '36px' }}
            >
              <RouteLink href="/">Octoclairvoyant</RouteLink>
            </Heading>
          </Flex>
          {!!process.env.NEXT_PUBLIC_FEATURE_FLAG_COLOR_MODE && (
            <ToggleColorModeButton />
          )}
        </Flex>
      </FluidContainer>
    </Box>
  )
}

export default Header
