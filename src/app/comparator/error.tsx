'use client'

import { Box, Text, Container, Heading, Button, VStack } from '@chakra-ui/react'
import * as Sentry from '@sentry/nextjs'
import { type FC, useEffect } from 'react'

import { type NextErrorPageProps } from '@/models'

const ComparatorErrorPage: FC<NextErrorPageProps> = ({ error, reset }) => {
	useEffect(() => {
		Sentry.captureException(error)
	}, [error])

	return (
		<Box height="full" width="full" bgColor="background3">
			<Container variant="fluid" height="full">
				<VStack
					px="10"
					alignItems="center"
					spacing={4}
					justifyContent="center"
					height="full"
				>
					<Heading>Something went wrong!</Heading>
					<Text as="p">
						Octoclairvoyant could not process the releases changelogs to be
						compared.
					</Text>
					<Button onClick={() => reset()}>Try again</Button>
				</VStack>
			</Container>
		</Box>
	)
}

export default ComparatorErrorPage
