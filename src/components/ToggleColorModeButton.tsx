import { Button, useColorMode } from '@chakra-ui/react'

const ToggleColorModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isLightMode = colorMode === 'light'

  return (
    <Button onClick={toggleColorMode}>
      Toggle {isLightMode ? 'Dark' : 'Light'}
    </Button>
  )
}

export default ToggleColorModeButton
