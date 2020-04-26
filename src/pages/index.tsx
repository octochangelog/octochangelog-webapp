import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import RepositoryReleasesComparator from 'components/RepositoryReleasesComparator';
import Login from 'components/Login';
import Layout from 'components/Layout';

function IndexPage() {
  const [client, setClient] = React.useState<ApolloClient<unknown> | null>(
    null
  );
  const [token] = React.useState<string>('');

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

  const isLoading = false;
  const shouldLogin = false;
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

export default IndexPage;
