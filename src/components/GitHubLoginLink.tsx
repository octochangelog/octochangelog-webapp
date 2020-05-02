import { Box, Button } from '@chakra-ui/core/dist';
import qs from 'qs';
import { DiGithubBadge } from 'react-icons/di';

const AUTH_PARAMS = {
  client_id: process.env.GITHUB_APP_CLIENT_ID,
  scope: '',
};
const AUTH_URL = 'https://github.com/login/oauth/authorize';

const GitHubLoginLink = ({ children = 'Login with GitHub' }) => (
  // Button type doesn't allow me to pass href though it works
  // @ts-ignore
  <Button as="a" href={`${AUTH_URL}?${qs.stringify(AUTH_PARAMS)}`}>
    {children} <Box as={DiGithubBadge} size="8" ml={2} />
  </Button>
);

export default GitHubLoginLink;
