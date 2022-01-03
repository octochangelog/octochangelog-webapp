import type { LinkProps } from '@chakra-ui/react'
import { Link as ChakraLink } from '@chakra-ui/react'
import { forwardRef } from 'react'

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <ChakraLink color="primary.500" {...props} ref={ref} />
))

Link.displayName = 'Link'

export default Link
