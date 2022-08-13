import { Button, Icon } from '@chakra-ui/react'
import type { ReactNode, MouseEvent } from 'react'
import { DiGithubBadge } from 'react-icons/di'

import { githubAuthUrl } from '~/github-client'

interface GitHubLoginButtonProps {
	children?: ReactNode
}

const GitHubLoginButton = ({
	children = 'Login with GitHub',
}: GitHubLoginButtonProps) => {
	const handleClick = (event: MouseEvent) => {
		event.preventDefault()
		window.location.href = githubAuthUrl.toString()
	}

	return (
		<Button
			bg="gray.700"
			color="white"
			_hover={{ bg: 'gray.900' }}
			onClick={handleClick}
		>
			{children} <Icon as={DiGithubBadge} ml={2} boxSize={6} />
		</Button>
	)
}

export default GitHubLoginButton
