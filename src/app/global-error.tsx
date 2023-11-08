'use client'

import {
	Button,
	ColorModeScript,
	Container,
	Heading,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react'
import * as Sentry from '@sentry/nextjs'
import Image from 'next/image'
import { type FC, useEffect } from 'react'

import Providers from '~/app/Providers'
import UILayout from '~/app/UILayout'
import customTheme from '~/customTheme'
import { interFont, robotoMonoFont } from '~/fonts'

import mascotIcon from '@app-public/mascot-icon.png'

type GlobalErrorProps = {
	error: Error & { digest?: string }
	reset: () => void
}

const GlobalError: FC<GlobalErrorProps> = ({ error, reset }) => {
	useEffect(() => {
		Sentry.captureException(error)
	}, [error])

	return (
		<html
			lang="en"
			className={`${interFont.variable} ${robotoMonoFont.variable}`}
			suppressHydrationWarning
		>
			<body suppressHydrationWarning>
				<ColorModeScript
					initialColorMode={customTheme.config.initialColorMode}
				/>
				<Providers>
					<UILayout>
						<Container variant="fluid" pb={{ base: 8, lg: 16 }}>
							<VStack px="10">
								<Image src={mascotIcon} alt="" width={250} height={250} />
								<Stack
									shouldWrapChildren
									alignItems="center"
									spacing="2"
									flexGrow={1}
									flexBasis={0}
								>
									<Heading
										as="h2"
										color="primaryText"
										fontSize="4xl"
										fontWeight="black"
										letterSpacing="tight"
									>
										Something went wrong!
									</Heading>
									<Text
										as="p"
										color="secondaryText"
										fontSize="2xl"
										fontWeight="black"
									>
										Octoclairvoyant could not handle the workload properly.
									</Text>
								</Stack>
							</VStack>

							<VStack mt={12} spacing={5}>
								<Button onClick={() => reset()}>Try again</Button>
							</VStack>
						</Container>
					</UILayout>
				</Providers>
			</body>
		</html>
	)
}

export default GlobalError
