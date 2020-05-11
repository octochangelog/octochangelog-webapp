import {
  Box,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
} from '@chakra-ui/core';
import React from 'react';

import Container from '~/components/Container';
import GitHubLoginButton from '~/components/GitHubLoginButton';
import Layout from '~/components/Layout';
import Link from '~/components/Link';
import MainLogo from '~/components/MainLogo';
import customTheme from '~/customTheme';
import { APP_MOTTO } from '~/global';
import useWindowWidth from '~/hooks/useWindowWidth';

const DESKTOP_BREAKPOINT = 992;

const MainSection: React.FC = () => {
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
        <GitHubLoginButton />
      </Stack>
      <Box flexGrow={1} flexBasis={0} maxWidth={600} maxHeight="auto">
        <MainLogo />
      </Box>
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
              <Heading
                as="h2"
                fontSize="3xl"
                mb={{ base: 4, lg: 8 }}
                color="primary.500"
              >
                Main Features
              </Heading>
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
