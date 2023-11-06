'use client'

import {
	Box,
	Container,
	Heading,
	VStack,
	Text,
	Spinner,
	Center,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from '@chakra-ui/react'
import { redirect } from 'next/navigation'
import React, { type FC, type ReactNode } from 'react'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<Container
			maxWidth="container.lg"
			pt={{ base: 4, md: 8 }}
			height="full"
			width="full"
		>
			<VStack gap={{ base: 4, md: 16 }} alignItems="start">
				<Heading>Authorizing on GitHub</Heading>
				<Box width="full">{children}</Box>
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

export const AuthCallbackSuccess: FC<{ accessToken: string }> = () => {
	// TODO: set token

	// Redirect after 3 seconds, so the user can read the success confirmation.
	setTimeout(() => {
		redirect('/comparator')
	}, 3000)

	return (
		<Layout>
			<Alert status="success">
				<AlertIcon />
				<AlertTitle>Authorized successfully!</AlertTitle>
				<AlertDescription>
					You will be redirected in a few moments.
				</AlertDescription>
			</Alert>
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
