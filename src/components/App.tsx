import React from 'react';
import { Flex } from '@chakra-ui/core';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Header from 'components/Header';
import Container from 'components/Container';
import Footer from 'components/Footer';
import RepositoryReleasesComparator from 'components/RepositoryReleasesComparator';
import Login from 'components/Login';
import { useAuth0 } from 'react-auth0-spa';

function App() {
  const [client, setClient] = React.useState<ApolloClient<unknown> | null>(
    null
  );
  const [token, setToken] = React.useState<string>('');
  const { isAuthenticated, isLoading, getTokenSilently }: any = useAuth0();

  React.useEffect(
    function getAccessToken() {
      const getTokenSilentlyHandler = async () => {
        if (isAuthenticated && getTokenSilently) {
          const authToken = await getTokenSilently();
          setToken(authToken);
        } else {
          setToken('');
        }
      };

      getTokenSilentlyHandler();
    },
    [getTokenSilently, isAuthenticated]
  );

  React.useEffect(
    function initApolloClientEffect() {
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
    },
    [token]
  );

  const shouldLogin = !isLoading && !isAuthenticated;
  const isReady = !shouldLogin && client;

  return (
    <Flex height="100%" direction="column">
      <Header position="fixed" top="0" left="0" right="0" />
      <Container mb={4} mt={{ base: 20, md: 32 }} flex="1 0 auto">
        {isLoading && 'LOADING...'}
        {shouldLogin && <Login />}

        {isReady && (
          <ApolloProvider client={client!}>
            {/* lazy load this one */}
            <RepositoryReleasesComparator />
          </ApolloProvider>
        )}
      </Container>
      <Footer />
    </Flex>
  );
}

export default App;
