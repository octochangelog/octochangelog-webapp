import {
  FormControl,
  FormLabel,
  List,
  ListItem,
  Box,
  Input,
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
  const { data, refetch } = useQuery<QueryResults>(
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
    getMenuProps,
    highlightedIndex,
  } = useCombobox({
    items: data?.items || [],
    itemToString: (repo) => repo?.full_name ?? 'unknown',
    onInputValueChange: ({ inputValue: newInputValue }) => {
      setInputValue(newInputValue ?? '')
    },
    onSelectedItemChange: ({ selectedItem }) => {
      onSelect((selectedItem as unknown) as Repository)
    },
  })

  const throttleRefetch = useMemo(() => {
    return debounce(refetch, 500)
  }, [refetch])

  useEffect(() => {
    if (inputValue.trim()) {
      throttleRefetch()
    }
  }, [inputValue, throttleRefetch])

  return (
    <FormControl
      isRequired
      width="full"
      isDisabled={false}
      isInvalid={false}
      {...rest}
    >
      <FormLabel htmlFor="repo">Repository</FormLabel>
      <Box {...getComboboxProps()}>
        <Input {...getInputProps()} autoFocus />
        <List {...getMenuProps()}>
          {isOpen &&
            data?.items.map((repo, index) => (
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
          {/*    TODO: show no results message*/}
        </List>
      </Box>
    </FormControl>
  )
}

export default RepositorySearchCombobox
