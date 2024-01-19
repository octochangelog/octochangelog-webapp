'use client'

import { type IconButtonProps } from '@chakra-ui/react'
import { Icon, IconButton, useColorMode } from '@chakra-ui/react'
import * as React from 'react'
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi'

const ToggleColorModeButton = (props: Partial<IconButtonProps>) => {
	const { colorMode, toggleColorMode } = useColorMode()
	const isLightMode = colorMode === 'light'
	const iconMode = isLightMode ? HiOutlineSun : HiOutlineMoon

	return (
		<IconButton
			colorScheme="gray"
			aria-label="Dark theme"
			aria-pressed={isLightMode}
			icon={<Icon as={iconMode} boxSize={{ base: '16px', md: '18px' }} />}
			isRound
			{...props}
			onClick={toggleColorMode}
		/>
	)
}

export default ToggleColorModeButton
