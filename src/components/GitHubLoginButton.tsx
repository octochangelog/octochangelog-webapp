import { Box, Button } from '@chakra-ui/core/dist';
import qs from 'qs';
import { DiGithubBadge } from 'react-icons/di';

const AUTH_PARAMS = {
  client_id: process.env.GITHUB_APP_CLIENT_ID,
  scope: '',
};
const AUTH_CALLBACK = 'https://github.com/login/oauth/authorize';

const AUTH_FULL_URL = `${AUTH_CALLBACK}?${qs.stringify(AUTH_PARAMS)}`;

const GitHubLoginButton = ({ children = 'Login with GitHub' }) => {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    window.location.href = AUTH_FULL_URL;
  };

  return (
    <Button
      onClick={handleClick}
      bg="gray.700"
      color="white"
      _hover={{ bg: 'gray.900' }}
    >
      {children} <Box as={DiGithubBadge} size="8" ml={2} />
    </Button>
  );
};

export default GitHubLoginButton;
