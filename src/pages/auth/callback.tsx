import { Alert, AlertIcon } from '@chakra-ui/core';
import { GetServerSideProps } from 'next';

import api from '~/api';
import Layout from '~/components/Layout';

interface Props {
  errorMessage?: string;
}

const AuthCallbackPage = ({ errorMessage = 'Something went wrong' }: Props) => (
  <Layout>
    <Alert status="error">
      <AlertIcon />
      {errorMessage}
    </Alert>
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  let errorMessage = null;

  try {
    const { code } = context.query;

    if (code) {
      const response = await fetch(
        'https://github.com/login/oauth/access_token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            client_id: process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID,
            client_secret: process.env.GITHUB_APP_CLIENT_SECRET,
            code,
          }),
        }
      );

      if (response.ok) {
        // TODO: move saving accessToken and redirecting to component itself
        //  so all this is done in Client-Side in order to avoid:
        //  Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        const responseJson = await response.json();
        // save token and redirect to app
        api.saveAccessToken(responseJson.access_token, context);
        context.res.writeHead(302, { Location: '/' });
        context.res.end();
      } else {
        errorMessage = 'Something went wrong obtaining access token';
      }
    } else {
      errorMessage = 'Empty temporary code received back from GitHub';
    }
  } catch (e) {
    errorMessage = e.toString();
  }

  // if this code is executed, something went wrong in the auth process,
  // so we need to delete the access token
  api.saveAccessToken(undefined, context);
  return { props: { errorMessage } };
};

export default AuthCallbackPage;
