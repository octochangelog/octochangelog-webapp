import {
	Box,
	CircularProgress,
	FormControl,
	FormLabel,
	HStack,
	Icon,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	List,
	ListItem,
	Text,
} from '@chakra-ui/react'
import { useCombobox } from 'downshift'
import { debounce } from 'lodash-es'
import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { HiArrowDown, HiArrowUp } from 'react-icons/hi'

import type { Repository } from '~/models'
import { useSearchRepositoriesQuery } from '~/queries/repository'

interface Props {
	onSelect: (repo?: Repository | undefined) => void
	initialInputValue?: string
}

const RepositorySearchCombobox = ({
	onSelect,
	initialInputValue = '',
}: Props) => {
	const [inputValue, setInputValue] = useState('')
	const [isTyping, setIsTyping] = useState(false)

	const {
		data,
		refetch,
		isFetching: isQueryLoading,
	} = useSearchRepositoriesQuery({ q: inputValue }, { enabled: false })

	const {
		isOpen,
		getInputProps,
		getItemProps,
		getLabelProps,
		getMenuProps,
		getToggleButtonProps,
		highlightedIndex,
	} = useCombobox({
		items: data?.items ?? [],
		itemToString: (repo) => repo?.full_name ?? 'unknown',
		initialInputValue,
		onInputValueChange: ({
			inputValue: newInputValue,
			isOpen: isOpenOnChange,
		}) => {
			setIsTyping(Boolean(isOpenOnChange) && Boolean(newInputValue))

			// Avoid set input value when is not open as that means the user already
			// picked an option so we don't want to refetch again.
			// Also, we keep original value entered by user in case they want to select
			// other option from last results.
			if (isOpenOnChange) {
				setInputValue(newInputValue ?? '')
			}
		},
		onSelectedItemChange: ({ selectedItem }) => {
			setIsTyping(false)
			onSelect(selectedItem as unknown as Repository)
		},
	})

	const throttleRefetch = useMemo(
		() =>
			debounce(() => {
				setIsTyping(false)
				void refetch()
			}, 500),
		[refetch],
	)

	useEffect(() => {
		if (inputValue.trim()) {
			throttleRefetch()
		}
	}, [inputValue, throttleRefetch])

	const isLoading = isTyping || isQueryLoading

	return (
		<FormControl isRequired width="full" position="relative">
			<FormLabel {...getLabelProps()}>Enter repository name</FormLabel>
			<HStack>
				<InputGroup>
					<Input {...getInputProps()} />
					<InputRightElement>
						{isLoading && (
							<CircularProgress
								isIndeterminate
								size="6"
								trackColor="primary.50"
								color="primary.500"
							/>
						)}
					</InputRightElement>
				</InputGroup>
				<Box>
					<IconButton
						{...getToggleButtonProps()}
						colorScheme="gray"
						aria-label="toggle repositories results menu"
						icon={<Icon as={isOpen ? HiArrowUp : HiArrowDown} />}
					/>
				</Box>
			</HStack>
			<List
				{...getMenuProps()}
				position="absolute"
				width="full"
				mt={1}
				shadow="md"
				backgroundColor="white"
				borderColor="gray.200"
				borderWidth={1}
				borderRadius={3}
				zIndex="dropdown"
				py={2}
				maxHeight="300px"
				overflowY="scroll"
				opacity={isOpen && !isLoading ? 1 : 0}
			>
				{isOpen && (
					<>
						{!isLoading && (
							<ListItem mb={1}>
								<Text as="em" color="gray.500" px={2}>
									{data?.total_count ?? 0} results
								</Text>
							</ListItem>
						)}
						{data?.items.map((repo, index) => (
							<ListItem
								key={repo.id}
								py={1}
								backgroundColor={
									highlightedIndex === index ? 'primary.400' : undefined
								}
								color={highlightedIndex === index ? 'gray.50' : 'gray.700'}
								cursor="pointer"
								{...getItemProps({ item: repo, index })}
							>
								<Text px={2}>{repo.full_name}</Text>
							</ListItem>
						))}
					</>
				)}
			</List>
		</FormControl>
	)
}

export default RepositorySearchCombobox
