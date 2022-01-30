import type { BoxProps } from '@chakra-ui/react'
import { Box, Flex, Container, Heading, HStack } from '@chakra-ui/react'
import Image from 'next/image'
import * as React from 'react'

import mascotIcon from '@app-public/mascot-icon.png'
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
      borderColor="primary.700"
    >
      <Container variant="fluid" py={5}>
        <Flex justify="space-between" alignItems="center">
          <Flex alignItems="center">
            <RouteLink
              href="/"
              borderBottomWidth={4}
              borderBottomColor="transparent"
              _hover={{
                borderBottomColor: 'primary.700',
              }}
              _focus={{
                boxShadow: 'outline',
                borderBottomColor: 'primary.700',
              }}
              _active={{
                borderBottomColor: 'primary.900',
              }}
            >
              <HStack spacing={2}>
                <Box h={LOGO_SIZES} w={LOGO_SIZES}>
                  <Image
                    src={mascotIcon}
                    alt=""
                    placeholder="blur"
                    height={150}
                    width={150}
                  />
                </Box>
                <Heading
                  as="h1"
                  color="primaryTextLightmode"
                  letterSpacing="tight"
                  fontWeight="black"
                  fontSize={{ base: '16px', sm: '36px' }}
                >
                  Octoclairvoyant
                </Heading>
              </HStack>
            </RouteLink>
          </Flex>
          {!!process.env.NEXT_PUBLIC_FEATURE_FLAG_COLOR_MODE && (
            <ToggleColorModeButton />
          )}
        </Flex>
      </Container>
    </Box>
  )
}

export default Header
