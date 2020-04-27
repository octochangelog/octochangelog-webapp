import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { parseCookies } from 'nookies';
import RepositoryReleasesComparator from 'components/RepositoryReleasesComparator';
import GitHubLoginLink from 'components/GitHubLoginLink';
import Layout from 'components/Layout';
import { GITHUB_COOKIE_KEY } from 'global';

const IndexPage = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const apolloClient = React.useRef<ApolloClient<unknown> | null>(null);

  // TODO: move this to hook
  React.useEffect(function initApolloClientEffect() {
    const cookies = parseCookies(null, { path: '/' });
    const token = cookies[GITHUB_COOKIE_KEY];

    if (token) {
      apolloClient.current = new ApolloClient({
        uri: 'https://api.github.com/graphql',
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    }

    setIsLoading(false);
  }, []);

  const shouldLogin = !isLoading && !apolloClient.current;
  const isReady = !shouldLogin && apolloClient.current;

  return (
    <Layout>
      {isLoading && 'LOADING...'}
      {shouldLogin && <GitHubLoginLink />}

      {isReady && (
        <ApolloProvider client={apolloClient.current!}>
          {/* lazy load this one */}
          <RepositoryReleasesComparator />
        </ApolloProvider>
      )}
    </Layout>
  );
};

export default IndexPage;
