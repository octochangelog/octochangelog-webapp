import { Flex, Box, BoxProps } from '@chakra-ui/core';
import Head from 'next/head';
import React from 'react';

import Footer from '~/components/Footer';
import Header from '~/components/Header';

const getHeaderProps = (isFixed: boolean): BoxProps => {
  if (isFixed) {
    return {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
    };
  }

  return {};
};

const getChildWrapper = (isHeaderFixed: boolean): BoxProps => {
  if (isHeaderFixed) {
    return {
      mt: { base: 20, md: 24 },
    };
  }

  return { mt: { base: 4, md: 12 } };
};

type Props = {
  extraTitle?: string;
  isHeaderFixed?: boolean;
};

const Layout: React.FC<Props> = ({
  children,
  extraTitle,
  isHeaderFixed = false,
}) => {
  const headerProps = getHeaderProps(isHeaderFixed);
  const childrenWrapperProps = getChildWrapper(isHeaderFixed);

  return (
    <>
      <Head>
        <title>Octoclairvoyant{extraTitle && ` - ${extraTitle}`}</title>
      </Head>
      <Flex height="100%" direction="column">
        <Header {...headerProps} />
        <Box {...childrenWrapperProps} flex="1 0 auto">
          {children}
        </Box>
        <Footer />
      </Flex>
    </>
  );
};

export default Layout;
