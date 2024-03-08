'use client'
import { Container, Flex, Text } from '@chakra-ui/react'

import GitHubLoginButton from '@/components/GitHubLoginButton'
import { getIsAuth } from '@/github-auth'

const AuthMessageSection = () => {
	const isAuth = getIsAuth()

	if (isAuth) {
		return undefined
	}

	return (
		<Container variant="fluid" pb={2}>
			<Flex alignItems="center" flexDirection="column">
				<Text mb={4}>
					You can increase the max number of allowed requests to GitHub by
					authorizing the app.
				</Text>
				<GitHubLoginButton />
			</Flex>
		</Container>
	)
}

export default AuthMessageSection
