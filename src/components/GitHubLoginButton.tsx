import { Box, Button } from '@chakra-ui/core'
import { DiGithubBadge } from 'react-icons/di'

import { githubAuthUrl } from '~/github-client'

const GitHubLoginButton = ({ children = 'Login with GitHub' }) => {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault()
    window.location.href = githubAuthUrl.toString()
  }

  return (
    <Button
      onClick={handleClick}
      bg="gray.700"
      color="white"
      _hover={{ bg: 'gray.900' }}
    >
      {children} <Box as={DiGithubBadge} h={8} w={8} ml={2} />
    </Button>
  )
}

export default GitHubLoginButton
