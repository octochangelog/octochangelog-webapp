import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Spinner,
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
    <FormControl isRequired width="full" {...getComboboxProps()} {...rest}>
      <FormLabel {...getLabelProps()}>Repository</FormLabel>
      <InputGroup>
        <Input {...getInputProps()} autoFocus />
        {isLoading && (
          <InputRightElement>
            <Spinner color="primary.400" />
          </InputRightElement>
        )}
      </InputGroup>
      <List {...getMenuProps()}>
        {isOpen && (
          <>
            {!isLoading && (
              <ListItem>{data?.total_count ?? 0} results</ListItem>
            )}
            {data?.items.map((repo, index) => (
              <ListItem
                key={repo.id}
                backgroundColor={
                  highlightedIndex === index ? 'primary' : undefined
                }
                {...getItemProps({ item: repo, index })}
              >
                {repo.full_name}
              </ListItem>
            ))}
          </>
        )}
      </List>
    </FormControl>
  )
}

export default RepositorySearchCombobox
