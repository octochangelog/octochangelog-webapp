'use client'

import {
	Box,
	Button,
	Center,
	Container,
	Flex,
	Heading,
	Icon,
	List,
	SimpleGrid,
	Stack,
	useColorModeValue,
} from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'
import type { ReactNode } from 'react'
import * as React from 'react'
import type { IconType } from 'react-icons'
import {
	HiOutlineFilter,
	HiOutlineFire,
	HiOutlineShare,
	HiOutlineSwitchHorizontal,
	HiOutlineTag,
} from 'react-icons/hi'

import { BRIEF_DESCRIPTION } from '~/common'

import mascotLogo from '@app-public/mascot-logo.png'

const MainSection = () => (
	<Stack
		alignItems="center"
		justifyContent="center"
		direction={{ base: 'column-reverse', lg: 'row' }}
		spacing={{ base: 10, lg: 1 }}
	>
		<Stack alignItems={{ base: 'center', lg: 'start' }} spacing="24">
			<Heading
				as="h2"
				color="primaryText"
				fontSize={{ base: '3xl', md: '5xl' }}
				fontWeight="black"
				textAlign={{ base: 'center', lg: 'left' }}
				letterSpacing="tight"
				px={{ base: 12, lg: 0 }}
			>
				{BRIEF_DESCRIPTION}.
			</Heading>
			<Flex justify="center" align="center">
				<NextLink href="/comparator" passHref legacyBehavior>
					<Button as="a" variant="cta">
						Try me now!
					</Button>
				</NextLink>
			</Flex>
		</Stack>
		<Center width="full">
			<Image src={mascotLogo} alt="" quality={100} priority />
		</Center>
	</Stack>
)

interface FeatureItemProps {
	icon: IconType
	title: string
	children: ReactNode
}

const FEATURES_DESCRIPTIONS: Array<FeatureItemProps> = [
	{
		icon: HiOutlineSwitchHorizontal,
		title: 'Compare releases easily',
		children: (
			<Box>
				Sifting through changelogs on GitHub taking too much time?
				<br />
				Let Octoclairvoyant put the list of changes in a single view!
			</Box>
		),
	},
	{
		icon: HiOutlineShare,
		title: 'Share changelogs',
		children: (
			<Box>
				Want to let your team review the changes in a dependency?
				<br />
				Give them a link!
			</Box>
		),
	},
	{
		icon: HiOutlineFire,
		title: "Don't miss breaking changes",
		children: (
			<Box>
				Octoclairvoyant finds all breaking changes, and lists them at the top.
				<br />
				You can’t miss those pesky gotcha’s now!
			</Box>
		),
	},
	{
		icon: HiOutlineFilter,
		title: 'No manual sorting',
		children: (
			<Box>
				Want a list of major, minor and patch level changes?
				<br />
				Octoclairvoyant groups changes into categories for you!
			</Box>
		),
	},
	{
		icon: HiOutlineTag,
		title: 'Changes per version',
		children: (
			<Box>
				Want to know which version introduced a certain change?
				<br />
				Octoclairvoyant labels each change with the version number.
			</Box>
		),
	},
]

const FeatureItem = ({ icon, title, children }: FeatureItemProps) => {
	const iconColor = useColorModeValue('secondary.700', 'secondary.200')
	const iconBgColor = useColorModeValue('secondary.200', 'secondary.800')
	return (
		<Box>
			<Flex
				boxSize={10}
				bgColor={iconBgColor}
				borderRadius="full"
				alignItems="center"
				justifyContent="center"
			>
				<Icon as={icon} boxSize="18px" color={iconColor} />
			</Flex>
			<Heading as="h3" color="primaryText" fontSize="2xl" mt={2}>
				{title}
			</Heading>
			<Box
				fontSize="md"
				width={{ base: 'full', lg: '70%' }}
				color="secondaryText"
			>
				{children}
			</Box>
		</Box>
	)
}

const HomePage = () => {
	return (
		<Box py={{ base: 8, lg: 16 }} mb={10}>
			<Container maxWidth="container.lg">
				<MainSection />

				<Box mt={40} />

				<List fontSize="" color="secondaryText">
					<SimpleGrid
						columns={{ base: 1, md: 2 }}
						spacing={{ base: 10, md: 32 }}
					>
						{FEATURES_DESCRIPTIONS.map(({ title, icon, children }) => (
							<FeatureItem key={title} icon={icon} title={title}>
								{children}
							</FeatureItem>
						))}
					</SimpleGrid>
				</List>
			</Container>
		</Box>
	)
}

export default HomePage
