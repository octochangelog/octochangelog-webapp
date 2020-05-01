import { Flex } from '@chakra-ui/core';
import Container from 'components/Container';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Head from 'next/head';
import React from 'react';

type Props = {
  extraTitle?: string;
};

const Layout: React.FC<Props> = ({ children, extraTitle = '' }) => (
  <>
    <Head>
      <title>Octoclairvoyant{extraTitle && ` - ${extraTitle}`}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔮</text></svg>"
      />
      <link
        rel="apple-touch-icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔮</text></svg>"
      />
      <meta name="theme-color" content="#805ad5" />
      <meta
        name="description"
        content="Group and compare releases changelog with ease for GitHub repositories"
      />
      <meta name="keywords" content="GitHub Release Repository Changelog" />
      <meta property="og:title" content="🔮 Octoclairvoyant" />
      <meta
        property="og:description"
        content="Group and compare releases changelog with ease for GitHub repositories"
      />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@belcoDev" />
      <meta name="twitter:title" content="🔮 Octoclairvoyant" />
      <meta
        name="twitter:description"
        content="Group and compare releases changelog with ease for GitHub repositories"
      />
    </Head>
    <Flex height="100%" direction="column">
      <Header position="fixed" top="0" left="0" right="0" />
      <Container mb={4} mt={{ base: 20, md: 32 }} flex="1 0 auto">
        {children}
      </Container>
      <Footer />
    </Flex>
  </>
);

export default Layout;
