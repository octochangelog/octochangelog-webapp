import { Text, BoxProps } from '@chakra-ui/core'

const BlockQuote = (props: BoxProps) => {
  return (
    <Text
      as="blockquote"
      px={4}
      borderLeftWidth={4}
      borderLeftColor="gray.300"
      color="gray.500"
      {...props}
    />
  )
}

export default BlockQuote
