import { Box, Heading, Stack, VStack, Text } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import NextLink from 'next/link'

import mascotLogo from '@app-public/mascot-logo.png'
import { CTAButton } from '~/components/CTAButton'
import FluidContainer from '~/components/FluidContainer'
import Layout from '~/components/Layout'
import RouteLink from '~/components/RouteLink'

const Custom404 = () => (
  <Layout>
    <NextSeo title="404 - Not Found" />
    <Box pb={{ base: 8, lg: 16 }} align="center">
      <FluidContainer>
        <VStack px="10">
          <Image
            src={mascotLogo}
            alt="Octoclairvoyant reading a crystal ball"
            placeholder="blur"
            priority
            width={250}
            height={250}
          />
          <Stack
            shouldWrapChildren
            alignItems="center"
            spacing="2"
            flexGrow={1}
            flexBasis={0}
          >
            <Heading
              as="h2"
              color="gray.900"
              fontSize="4xl"
              fontWeight="black"
              letterSpacing="tight"
            >
              This page could not be found.
            </Heading>
            <Text as="p" color="coolGray.700" fontSize="2xl" fontWeight="black">
              Octoclairvoyant cannot divine the page you wanted.
            </Text>
          </Stack>
        </VStack>
        <VStack mt={12} spacing={5}>
          <NextLink href="/comparator">
            <CTAButton>Go to comparator</CTAButton>
          </NextLink>

          <RouteLink href="/" color="primary.500" fontWeight="black">
            Or go to homepage
          </RouteLink>
        </VStack>
      </FluidContainer>
    </Box>
  </Layout>
)

export default Custom404
