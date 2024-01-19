'use client'

import { Button, Icon } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import { type ReactNode, type MouseEvent } from 'react'
import { DiGithubBadge } from 'react-icons/di'

import { AUTH_REDIRECT_STORAGE_KEY } from '@/common'
import { getGitHubAuthUrl } from '@/github-auth'

interface GitHubLoginButtonProps {
	children?: ReactNode
}

const GitHubLoginButton = ({
	children = 'Login with GitHub',
}: GitHubLoginButtonProps) => {
	const searchParams = useSearchParams()

	const handleClick = (event: MouseEvent) => {
		event.preventDefault()

		sessionStorage.setItem(
			AUTH_REDIRECT_STORAGE_KEY,
			searchParams?.toString() ?? '',
		)

		const githubAuthUrl = getGitHubAuthUrl({
			redirectUrl: window.location.origin,
		}).toString()
		window.location.href = githubAuthUrl
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
