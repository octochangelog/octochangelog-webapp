import React from 'react';
import { Flex, CSSReset, ThemeProvider } from '@chakra-ui/core';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Header from './Header';
import Footer from './Footer';
import { Global } from '@emotion/core';
import { globalStyles } from '../global';
import Container from './Container';
import MainContent from './MainContent';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
});

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <Global styles={globalStyles} />
      <Flex height="100%" direction="column">
        <Header />
        <Container my={4} flex="1 0 auto">
          <ApolloProvider client={client}>
            <MainContent />
          </ApolloProvider>
        </Container>
        <Footer />
      </Flex>
    </ThemeProvider>
  );
}

export default App;
