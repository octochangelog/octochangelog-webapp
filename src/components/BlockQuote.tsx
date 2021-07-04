import { Text, BoxProps } from '@chakra-ui/react'

const BlockQuote = (props: BoxProps) => (
  <Text
    as="blockquote"
    px={4}
    borderLeftWidth={4}
    borderLeftColor="gray.300"
    color="gray.500"
    {...props}
  />
)

export default BlockQuote
