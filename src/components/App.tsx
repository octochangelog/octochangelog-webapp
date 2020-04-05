import React from 'react';
import { Box, Flex, CSSReset, ThemeProvider } from '@chakra-ui/core';
import Header from './Header';
import Footer from './Footer';
import { Global } from '@emotion/core';
import { globalStyles } from '../global';

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <Global styles={globalStyles} />
      <Flex height="100%" direction="column">
        <Header />
        <Box px={20} my={4} flex="1 0 auto">
          content here
        </Box>
        <Footer />
      </Flex>
    </ThemeProvider>
  );
}

export default App;
