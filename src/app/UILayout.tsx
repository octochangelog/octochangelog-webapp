import { Flex, Box } from '@chakra-ui/react'
import { type FC, type ReactNode } from 'react'

import Footer from '~/components/Footer'
import Header from '~/components/Header'

interface Props {
	children: ReactNode
	pageBgColor?: 'background2' | 'background3'
}

const UILayout: FC<Props> = ({
	children,
	pageBgColor = 'background2',
}: Props) => (
	<Flex height="100%" direction="column">
		<Header />
		<Box as="main" flex="1 0 auto" bgColor={pageBgColor}>
			{children}
		</Box>
		<Footer bgColor={pageBgColor} />
	</Flex>
)

export default UILayout
