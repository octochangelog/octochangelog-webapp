import { Flex } from '@chakra-ui/core';
import Head from 'next/head';
import React from 'react';

import Container from '~/components/Container';
import Footer from '~/components/Footer';
import Header from '~/components/Header';

type Props = {
  extraTitle?: string;
};

const Layout: React.FC<Props> = ({ children, extraTitle = '' }) => (
  <>
    <Head>
      <title>Octoclairvoyant{extraTitle && ` - ${extraTitle}`}</title>
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
