import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import RepositoryReleasesComparator from 'components/RepositoryReleasesComparator';
import Login from 'components/Login';
import { useAuth0 } from 'auth';
import Layout from 'components/Layout';

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
          console.log('authToken', authToken);
        } else {
          console.log('authToken', 'delete');
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
    <Layout>
      {isLoading && 'LOADING...'}
      {shouldLogin && <Login />}

      {isReady && (
        <ApolloProvider client={client!}>
          {/* lazy load this one */}
          <RepositoryReleasesComparator />
        </ApolloProvider>
      )}
    </Layout>
  );
}

export default App;
