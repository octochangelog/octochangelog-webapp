import { Box, Container, Link, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'

import poweredByVercelLogo from '@/public/powered-by-vercel.svg'

const Footer = () => {
	return (
		<Box
			as="footer"
			bgColor="background2"
			pb={{ base: 8, lg: 12 }}
			borderTop="solid 1px"
			borderTopColor="monochromeInverted3"
		>
			<Container
				centerContent
				maxWidth="full"
				py={{ base: 1, lg: 4 }}
				px={{ base: 4, lg: 5 }}
			>
				<VStack spacing={5}>
					<Text
						color="primaryText"
						fontSize={{ base: 'lg', md: '2xl' }}
						fontWeight="black"
						textAlign="center"
					>
						Created with love <br /> by{' '}
						<Link isExternal href="https://mario.dev/" title="Mario's website">
							Mario
						</Link>{' '}
						&{' '}
						<Link
							isExternal
							href="https://github.com/HonkingGoose"
							title="HonkingGoose's GitHub profile"
						>
							HonkingGoose
						</Link>
					</Text>
					<Box>
						<Link
							href="https://vercel.com/?utm_source=octoclairvoyant-team&utm_campaign=oss"
							aria-label="Powered by Vercel"
							isExternal
						>
							<Image alt="" src={poweredByVercelLogo as string} />
						</Link>
					</Box>
				</VStack>
			</Container>
		</Box>
	)
}

export default Footer
