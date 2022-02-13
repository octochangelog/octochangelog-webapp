import type { BoxProps } from '@chakra-ui/react'
import { Box, Flex, Container, Heading, HStack } from '@chakra-ui/react'
import Image from 'next/image'
import * as React from 'react'

import mascotIcon from '@app-public/mascot-icon.png'
import RouteLink from '~/components/RouteLink'
import ToggleColorModeButton from '~/components/ToggleColorModeButton'

const LOGO_SIZES = { base: 8, md: 16 }

const Header = (props: BoxProps) => {
  return (
    <Box
      as="header"
      zIndex="banner"
      {...props}
      borderTopWidth={{ base: '4px', md: '8px' }}
      borderColor="primary.700"
      bgColor="primaryBg"
    >
      <Container
        maxWidth="full"
        py={{ base: 1, lg: 4 }}
        px={{ base: 4, lg: 5 }}
      >
        <Flex justify="space-between" alignItems="center">
          <Flex alignItems="center">
            <RouteLink
              href="/"
              textDecorationLine="underline"
              textDecorationThickness="4px"
              textUnderlineOffset="2px"
              textDecorationColor="transparent"
              _hover={{
                textDecorationColor: 'primary.700',
              }}
              _focus={{
                boxShadow: 'outline',
                textDecorationColor: 'primary.700',
              }}
              _active={{
                textDecorationColor: 'primary.900',
              }}
            >
              <HStack spacing={{ base: 1, lg: 2 }}>
                <Box h={LOGO_SIZES} w={LOGO_SIZES}>
                  <Image
                    src={mascotIcon}
                    alt=""
                    height={70}
                    width={70}
                    aria-hidden
                  />
                </Box>
                <Heading
                  as="h1"
                  color="primaryText"
                  letterSpacing="tight"
                  fontWeight="black"
                  fontSize={{ base: '16px', md: '36px' }}
                >
                  Octoclairvoyant
                </Heading>
              </HStack>
            </RouteLink>
          </Flex>
          <HStack>
            {!!process.env.NEXT_PUBLIC_FEATURE_FLAG_COLOR_MODE && (
              <ToggleColorModeButton
                boxSize={LOGO_SIZES}
                minWidth={LOGO_SIZES}
              />
            )}
            <span>GitHub</span>
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}

export default Header
