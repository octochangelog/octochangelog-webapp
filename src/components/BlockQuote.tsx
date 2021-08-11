import { Text, BoxProps } from '@chakra-ui/react'

const BlockQuote = (props: BoxProps) => (
  <Text
    as="blockquote"
    px={4}
    borderLeftWidth={4}
    borderLeftColor="coolGray.200"
    color="tertiaryTextLightmode"
    {...props}
  />
)

export default BlockQuote
