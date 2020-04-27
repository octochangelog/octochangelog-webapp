import React from 'react';
import qs from 'qs';
import Link from 'components/Link';

const AUTH_PARAMS = {
  client_id: process.env.GITHUB_APP_CLIENT_ID,
  scope: '',
};
const AUTH_URL = 'https://github.com/login/oauth/authorize';

const GitHubLoginLink = () => (
  <Link href={`${AUTH_URL}?${qs.stringify(AUTH_PARAMS)}`}>
    Log in with GitHub
  </Link>
);

export default GitHubLoginLink;
