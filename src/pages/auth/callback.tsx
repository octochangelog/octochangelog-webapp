import { Alert, AlertIcon } from '@chakra-ui/core';
import { GITHUB_COOKIE_KEY } from 'global';
import fetch from 'isomorphic-unfetch';
import { GetServerSideProps } from 'next';
import { setCookie, destroyCookie } from 'nookies';
import React from 'react';

import Layout from '~/components/Layout';

interface Props {
  errorMessage?: string;
}

// TODO: button to go back homepage
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
      destroyCookie(context, GITHUB_COOKIE_KEY);

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
            code,
          }),
        }
      );

      if (response.ok) {
        const responseJson = await response.json();
        // save token and redirect to app
        setCookie(context, GITHUB_COOKIE_KEY, responseJson.access_token, {
          maxAge: 31536000, // 1 year
          path: '/',
        });
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

  return { props: { errorMessage } };
};

export default AuthCallbackPage;
