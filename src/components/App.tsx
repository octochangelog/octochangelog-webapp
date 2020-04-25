import React from 'react';
import { Button, Flex } from '@chakra-ui/core';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Header from 'components/Header';
import Container from 'components/Container';
import Footer from 'components/Footer';
import RepositoryReleasesComparator from 'components/RepositoryReleasesComparator';

function App() {
  const [client, setClient] = React.useState<ApolloClient<unknown> | null>(
    null
  );
  const [token, setToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    console.log('new client');
    let newClient = null;
    if (token) {
      newClient = new ApolloClient({
        uri: 'https://api.github.com/graphql',
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    }

    setClient(newClient);
  }, [token]);

  return (
    <Flex height="100%" direction="column">
      <Header position="fixed" top="0" left="0" right="0" />
      <Container mb={4} mt={{ base: 20, md: 32 }} flex="1 0 auto">
        <Button onClick={() => setToken('123')}>Set token</Button>
        {client && (
          <ApolloProvider client={client}>
            <RepositoryReleasesComparator />
          </ApolloProvider>
        )}
      </Container>
      <Footer />
    </Flex>
  );
}

export default App;
