import { type BoxProps } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'

const BlockQuote = (props: BoxProps) => (
	<Text
		as="blockquote"
		px={4}
		borderLeftWidth={4}
		borderLeftColor="coolGray.200"
		color="tertiaryText"
		{...props}
	/>
)

export default BlockQuote
