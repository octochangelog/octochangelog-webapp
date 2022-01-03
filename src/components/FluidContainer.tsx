import type { BoxProps } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'

const FluidContainer = (props: BoxProps) => (
  <Box
    width="full"
    maxWidth="1280px"
    mx="auto"
    px={{ base: 2, md: 6 }}
    {...props}
  />
)

export default FluidContainer
