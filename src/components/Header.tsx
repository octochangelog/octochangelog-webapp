'use client'

import type { BoxProps } from '@chakra-ui/react'
import {
	Box,
	Flex,
	Container,
	Heading,
	HStack,
	Icon,
	Link,
} from '@chakra-ui/react'
import Image from 'next/image'
import * as React from 'react'
import { DiGithubBadge } from 'react-icons/di'

import { REPO_URL } from '~/common'
import { Link as RouteLink } from '~/components/ChakraNextLink'
import ToggleColorModeButton from '~/components/ToggleColorModeButton'

import mascotIcon from '@app-public/mascot-icon.png'

const LOGO_SIZES = { base: 8, md: 16 }

const Header = (props: BoxProps) => {
	return (
		<Box
			as="header"
			zIndex="banner"
			{...props}
			borderTopWidth={{ base: '4px', md: '8px' }}
			borderColor="primary.700"
			bgColor="background2"
		>
			<Container
				maxWidth="full"
				py={{ base: 1, lg: 4 }}
				px={{ base: 4, lg: 5 }}
			>
				<Flex justify="space-between" alignItems="center">
					<Flex alignItems="center">
						<RouteLink
							href="/"
							textDecorationLine="underline"
							textDecorationThickness="4px"
							textUnderlineOffset="2px"
							textDecorationColor="transparent"
							_hover={{
								textDecorationColor: 'primary.700',
							}}
							_focus={{
								boxShadow: 'outline',
								textDecorationColor: 'primary.700',
							}}
							_active={{
								textDecorationColor: 'primary.900',
							}}
						>
							<HStack spacing={{ base: 1, lg: 2 }}>
								<Box h={LOGO_SIZES} w={LOGO_SIZES}>
									<Image src={mascotIcon} alt="" height={70} width={70} />
								</Box>
								<Heading
									as="h1"
									color="primaryText"
									letterSpacing="tight"
									fontWeight="black"
									fontSize={{ base: '16px', md: '36px' }}
								>
									Octoclairvoyant
								</Heading>
							</HStack>
						</RouteLink>
					</Flex>
					<HStack spacing={{ base: 4, md: 10 }}>
						{!!process.env.NEXT_PUBLIC_FEATURE_FLAG_COLOR_MODE && (
							<ToggleColorModeButton
								boxSize={LOGO_SIZES}
								minWidth={LOGO_SIZES}
							/>
						)}
						<Link
							href={REPO_URL}
							aria-label="Octoclairvoyant repository on GitHub"
							isExternal
							rounded="full"
							boxSize={LOGO_SIZES}
							_hover={{ bgColor: 'monochromeInverted4' }}
							_active={{ bgColor: 'monochromeInverted5' }}
						>
							<Icon
								as={DiGithubBadge}
								boxSize={LOGO_SIZES}
								color="monochrome1"
							/>
						</Link>
					</HStack>
				</Flex>
			</Container>
		</Box>
	)
}

export default Header
