import React from 'react';
import { Flex, CSSReset, ThemeProvider } from '@chakra-ui/core';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Global } from '@emotion/core';
import { globalStyles } from 'global';
import Header from 'components/Header';
import Container from 'components/Container';
import Footer from 'components/Footer';
import MainContent from 'components/MainContent';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_GITHUB_OAUTH_TOKEN}`,
  },
});

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <Global styles={globalStyles} />
      <Flex height="100%" direction="column">
        <Header position="fixed" top="0" left="0" right="0" />
        <Container mb={4} mt={{ base: 20, md: 32 }} flex="1 0 auto">
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
