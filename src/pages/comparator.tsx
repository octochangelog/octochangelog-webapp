import { ApolloProvider } from '@apollo/react-hooks';
import { Flex, Heading } from '@chakra-ui/core';
import ApolloClient from 'apollo-boost';
import { GITHUB_COOKIE_KEY } from 'global';
import { parseCookies } from 'nookies';
import React from 'react';

import GitHubLoginButton from '~/components/GitHubLoginButton';
import Layout from '~/components/Layout';
import RepositoryReleasesComparator from '~/components/RepositoryReleasesComparator';

const ComparatorPage = () => {
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

  // TODO: show spinner while isLoading
  return (
    <Layout extraTitle="Comparator">
      {shouldLogin && (
        <Flex justify="center">
          <Flex
            p={5}
            shadow={{ base: 'none', md: 'md' }}
            borderWidth={{ base: 'none', md: '1px' }}
            width={{ base: 'full', md: 600 }}
            direction="column"
            justify="center"
          >
            <Heading fontSize="l" textAlign="center" mb={4}>
              You need to authorize GitHub before using the comparator
            </Heading>
            <Flex justify="center">
              <GitHubLoginButton />
            </Flex>
          </Flex>
        </Flex>
      )}

      {isReady && (
        <ApolloProvider client={apolloClient.current!}>
          {/* lazy load this one */}
          <RepositoryReleasesComparator />
        </ApolloProvider>
      )}
    </Layout>
  );
};

export default ComparatorPage;
