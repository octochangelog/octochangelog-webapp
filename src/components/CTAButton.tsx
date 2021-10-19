import type { ButtonProps } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

export const CTAButton = ({ children, ...remainingProps }: ButtonProps) => {
  return (
    <Button
      {...remainingProps}
      fontWeight="black"
      fontSize="2xl"
      letterSpacing="tight"
      p="6"
      size="lg"
      shadow="lg"
      bg="fuchsia.200"
      color="primary.900"
      _hover={{ bg: 'primary.200' }}
      _active={{ bg: 'primary.300' }}
    >
      {children}
    </Button>
  )
}
