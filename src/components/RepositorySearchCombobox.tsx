import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Spinner,
  Text,
} from '@chakra-ui/core'
import { RestEndpointMethodTypes } from '@octokit/rest'
import { useCombobox } from 'downshift'
import { debounce } from 'lodash'
import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import { octokit } from '~/github-client'
import { Repository } from '~/models'

type Props = {
  onSelect: (repo?: Repository | null) => void
}

type QueryResults = RestEndpointMethodTypes['search']['repos']['response']['data']
type QueryParams = RestEndpointMethodTypes['search']['repos']['parameters']

const RepositorySearchCombobox = ({ onSelect, ...rest }: Props) => {
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const { data, refetch, isLoading: isQueryLoading } = useQuery<QueryResults>(
    ['repos', { q: inputValue }],
    async (_, params: QueryParams) => {
      const resp = await octokit.search.repos(params)

      return resp.data
    },
    { enabled: false }
  )

  const {
    isOpen,
    getComboboxProps,
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
  } = useCombobox({
    items: data?.items || [],
    itemToString: (repo) => repo?.full_name ?? 'unknown',
    onInputValueChange: ({
      inputValue: newInputValue,
      isOpen: isOpenOnChange,
    }) => {
      setIsTyping(!!isOpenOnChange)

      // Avoid set input value when is not open as that means the user already
      // picked an option so we don't want to refetch again.
      if (isOpenOnChange) {
        setInputValue(newInputValue ?? '')
      }
    },
    onSelectedItemChange: ({ selectedItem }) => {
      setIsTyping(false)
      onSelect((selectedItem as unknown) as Repository)
    },
  })

  const throttleRefetch = useMemo(() => {
    return debounce(() => {
      setIsTyping(false)
      refetch()
    }, 500)
  }, [refetch])

  useEffect(() => {
    if (inputValue.trim()) {
      throttleRefetch()
    }
  }, [inputValue, throttleRefetch])

  const isLoading = isTyping || isQueryLoading

  return (
    <FormControl
      isRequired
      width="full"
      position="relative"
      {...getComboboxProps()}
      {...rest}
    >
      <FormLabel {...getLabelProps()}>Repository</FormLabel>
      <InputGroup>
        <Input {...getInputProps()} autoFocus />
        {isLoading && (
          <InputRightElement>
            <Spinner color="primary.400" />
          </InputRightElement>
        )}
      </InputGroup>
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
        zIndex="popover"
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
                py={1}
                key={repo.id}
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
