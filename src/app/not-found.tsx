import {
	Button,
	Container,
	Heading,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'
import { type FC } from 'react'

import { Link } from '~/components/ChakraNextLink'

import { openGraph } from './shared-metadata'

import mascotIcon from '@app-public/mascot-icon.png'

export const metadata = {
	title: 'Not Found',
	openGraph: { ...openGraph, title: 'Not Found' },
}

const NotFound: FC = () => {
	return (
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
						This page could not be found.
					</Heading>
					<Text as="p" color="secondaryText" fontSize="2xl" fontWeight="black">
						Octoclairvoyant cannot divine the page you wanted.
					</Text>
				</Stack>
			</VStack>
			<VStack mt={12} spacing={5}>
				<NextLink href="/comparator" passHref legacyBehavior>
					<Button as="a" variant="cta">
						Go to comparator
					</Button>
				</NextLink>

				<Link href="/" fontWeight="black">
					Or go to homepage
				</Link>
			</VStack>
		</Container>
	)
}

export default NotFound
