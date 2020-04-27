import React from 'react';
import { GetServerSideProps } from 'next';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-unfetch';
import RepositoryReleasesComparator from 'components/RepositoryReleasesComparator';
import GitHubLoginLink from 'components/GitHubLoginLink';
import Layout from 'components/Layout';

interface Props {
  accessToken?: string;
}

function IndexPage({ accessToken = '' }: Props) {
  const [client, setClient] = React.useState<ApolloClient<unknown> | null>(
    null
  );

  React.useEffect(
    function initApolloClientEffect() {
      let newClient = null;
      if (accessToken) {
        newClient = new ApolloClient({
          uri: 'https://api.github.com/graphql',
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });
      }

      setClient(newClient);
    },
    [accessToken]
  );

  const shouldLogin = !accessToken;
  const isReady = !shouldLogin && client;

  return (
    <Layout>
      {shouldLogin && <GitHubLoginLink />}

      {isReady && (
        <ApolloProvider client={client!}>
          {/* lazy load this one */}
          <RepositoryReleasesComparator />
        </ApolloProvider>
      )}
    </Layout>
  );
}

// TODO get access to cookies

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let accessToken = null;
  let error = null;

  try {
    if (query.code) {
      const response = await fetch(
        'https://github.com/login/oauth/access_token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            client_id: process.env.GITHUB_APP_CLIENT_ID,
            client_secret: process.env.GITHUB_APP_CLIENT_SECRET,
            code: query.code,
          }),
        }
      );

      delete query.code;

      if (response.ok) {
        const responseJson = await response.json();
        accessToken = responseJson.access_token;
      } else {
        // TODO: handle error
        error = new Error('Failure response');
      }
    }
  } catch (e) {
    error = e;
  }

  return { props: { error, accessToken } };
};

export default IndexPage;
