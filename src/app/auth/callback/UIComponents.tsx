'use client'

import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Button,
	Center,
	Container,
	Heading,
	Spinner,
	Text,
	VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { type FC, type ReactNode, useEffect } from 'react'

import { AUTH_REDIRECT_STORAGE_KEY } from '@/common'
import { setGithubAccessToken } from '@/github-auth'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<Container
			maxWidth="container.lg"
			pt={{ base: 4, md: 8 }}
			height="full"
			width="full"
		>
			<VStack width="full" gap={{ base: 4, md: 16 }}>
				<Heading alignSelf="start">Authorizing on GitHub</Heading>
				{children}
			</VStack>
		</Container>
	)
}

export const AutCallbackLoading: FC = () => {
	return (
		<Layout>
			<Center>
				<VStack>
					<Spinner
						thickness="4px"
						speed="0.65s"
						emptyColor="gray.200"
						color="primary.500"
						size="xl"
					/>
					<Text>Authorizing...</Text>
				</VStack>
			</Center>
		</Layout>
	)
}

export const AuthCallbackSuccess: FC<{ accessToken: string }> = ({
	accessToken,
}) => {
	const router = useRouter()

	useEffect(() => {
		setGithubAccessToken(accessToken)
	}, [accessToken])

	const handleClick = () => {
		const redirectSearchParams = sessionStorage.getItem(
			AUTH_REDIRECT_STORAGE_KEY,
		)
		const redirectUrl = redirectSearchParams
			? `/compare?${redirectSearchParams}`
			: '/compare'

		router.replace(redirectUrl)
	}

	return (
		<Layout>
			<Alert status="success">
				<AlertIcon />
				<AlertTitle>Authorized successfully!</AlertTitle>
			</Alert>

			<Button variant="cta" onClick={handleClick}>
				Back to compare
			</Button>
		</Layout>
	)
}

export const AuthCallbackError: FC<{ errorMessage: string }> = ({
	errorMessage,
}) => {
	return (
		<Layout>
			<Alert status="error">
				<AlertIcon />
				<AlertTitle>Something went wrong!</AlertTitle>
				<AlertDescription>{errorMessage}. Please try again.</AlertDescription>
			</Alert>
		</Layout>
	)
}
