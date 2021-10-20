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
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      borderRadius="2xl"
      bg="fuchsia.200"
      color="fuchsia.900"
      _hover={{ bg: 'fuchsia.100' }}
      _active={{ bg: 'fuchsia.50', border: '2px' }}
    >
      {children}
    </Button>
  )
}
