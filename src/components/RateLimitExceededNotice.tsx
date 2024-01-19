import { Flex, Heading, Link } from '@chakra-ui/react'

import GitHubLoginButton from '@/components/GitHubLoginButton'

interface Props {
	waitingMinutes?: number
	isAuth?: boolean
}

const RateLimitExceededNotice = ({ waitingMinutes, isAuth = false }: Props) => (
	<Flex justify="center">
		<Flex
			p={5}
			shadow={{ base: 'none', md: 'md' }}
			borderWidth={{ base: 'none', md: '1px' }}
			width={{ base: 'full', md: 600 }}
			direction="column"
			justify="center"
		>
			<Heading fontSize="md" textAlign="center" mb={4}>
				Octoclairvoyant has exceed the{' '}
				<Link isExternal href="https://developer.github.com/v3/#rate-limiting">
					GitHub API hourly limit
				</Link>{' '}
				for {isAuth ? 'authenticated' : 'unauthenticated'} requests. You need to
				wait {waitingMinutes ?? 'some'} minutes or{' '}
				{isAuth
					? 'renew your existing token'
					: 'create a token for extending this limit'}
				.
			</Heading>
			<Flex justify="center">
				<GitHubLoginButton>Auth with GitHub</GitHubLoginButton>
			</Flex>
		</Flex>
	</Flex>
)

export default RateLimitExceededNotice
