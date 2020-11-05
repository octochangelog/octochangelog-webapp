import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
} from '@chakra-ui/core';
import styled from '@emotion/styled';
import Image from 'next/image';
import NextLink from 'next/link';
import React from 'react';

import Container from '~/components/Container';
import Layout from '~/components/Layout';
import Link from '~/components/Link';
import customTheme from '~/customTheme';
import { APP_MOTTO } from '~/global';
import useWindowWidth from '~/hooks/useWindowWidth';

const DESKTOP_BREAKPOINT = 992;

const FeaturesHeading = styled(Heading)`
  scroll-margin-top: 6rem;
`;

const MainSection = () => {
  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth >= DESKTOP_BREAKPOINT;

  return (
    <Flex alignItems="center" direction={isDesktop ? 'row' : 'column-reverse'}>
      <Stack
        alignItems={{ base: 'center', lg: 'start' }}
        spacing={{ base: 4, lg: 8 }}
        flexGrow={1}
        flexBasis={0}
        shouldWrapChildren
      >
        <Heading
          as="h1"
          color={isDesktop ? 'gray.50' : 'gray.700'}
          fontSize="4xl"
          textAlign={{ base: 'center', lg: 'left' }}
        >
          {APP_MOTTO}
        </Heading>
        <Flex justify="center" align="center">
          <NextLink href="/">
            <Button bg="gray.700" color="white" _hover={{ bg: 'gray.900' }}>
              Check it out!
            </Button>
          </NextLink>
          <Link href="#features" ml={4} color="gray.700">
            Read more
          </Link>
        </Flex>
      </Stack>
      <Image
        src="/mascot-logo.png"
        alt="Octoclairvoyant reading a crystal ball"
        width={600}
        height={600}
      />
    </Flex>
  );
};

const IndexPage = () => {
  const [shouldShowMainSection, setShouldShowMainSection] = React.useState(
    false
  );

  React.useEffect(function renderMainSectionOnClientSideHydrationEffect() {
    // As this element depends on device since to render different variants,
    // we only render HeaderLinks when on Client Side
    // https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
    setShouldShowMainSection(true);
  }, []);

  return (
    <Layout isHeaderFixed>
      <Box
        mt={-8}
        py={{ base: 8, lg: 16 }}
        minHeight="100vh"
        bgImage={`linear-gradient(180deg, ${customTheme.colors.primary[700]} 0%, ${customTheme.colors.white} 100%)`}
      >
        <Container>{shouldShowMainSection && <MainSection />}</Container>
      </Box>

      <Box>
        <Container
          transition="opacity 500ms linear"
          opacity={shouldShowMainSection ? 1 : 0}
        >
          <Stack
            spacing={8}
            alignItems="center"
            py={{ base: 8, lg: 16 }}
            direction="column"
          >
            <Box>
              <FeaturesHeading
                as="h2"
                fontSize="3xl"
                mb={{ base: 4, lg: 8 }}
                color="primary.500"
                id="features"
              >
                Main Features
              </FeaturesHeading>
              <List spacing={{ base: 4, lg: 8 }}>
                <ListItem>
                  <ListIcon icon="check-circle" color="secondary.500" />
                  Filter by range of versions
                </ListItem>
                <ListItem>
                  <ListIcon icon="check-circle" color="secondary.500" />
                  Group changes by normalized categories (e.g. put "bug fixes"
                  and "minor" under the same group)
                </ListItem>
                <ListItem>
                  <ListIcon icon="check-circle" color="secondary.500" />
                  Sort and prioritize by different level of changes for{' '}
                  <Link href="https://semver.org/">Semantic Versioning</Link>
                </ListItem>
                <ListItem>
                  <ListIcon icon="check-circle" color="secondary.500" />
                  Highlight code blocks syntax and GitHub references
                </ListItem>
                <ListItem>
                  <ListIcon icon="check-circle" color="secondary.500" />
                  Spot original version where specific changes were introduced
                </ListItem>
              </List>
            </Box>
            <Box px={{ base: 0, lg: 16 }}>
              <Box shadow="lg">
                <video autoPlay loop muted playsInline>
                  <source
                    src="/octoclairvoyant-preview.webm"
                    type="video/webm"
                  />
                  <source
                    src="https://i.imgur.com/kVBlLCL.mp4"
                    type="video/mp4"
                  />
                </video>
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Layout>
  );
};

export default IndexPage;
