import React from 'react';
import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  useToast,
} from '@chakra-ui/core';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Release, Repository } from 'types';

const RELEASES_QUERY = gql`
  {
    repository(
      name: "eslint-plugin-testing-library"
      owner: "testing-library"
    ) {
      name
      url
      releases(orderBy: { field: CREATED_AT, direction: ASC }, first: 100) {
        pageInfo {
          hasNextPage
        }
        nodes {
          description
          id
          name
        }
      }
    }
  }
`;

type PropTypes = {
  onChange(repository?: Repository, releases?: Release[]): void;
};

const ReleasesPicker = ({ onChange }: PropTypes) => {
  const { loading, error, data } = useQuery(RELEASES_QUERY);
  const toast = useToast();

  React.useEffect(() => {
    if (data) {
      const { releases, ...repository } = data.repository;
      onChange(repository, releases.nodes);
    } else {
      onChange(undefined, undefined);
    }
  });

  React.useEffect(() => {
    if (error) {
      toast({
        title: 'An error occurred.',
        description: 'Unable to retrieve repository releases',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  return (
    <FormControl isRequired>
      <FormLabel htmlFor="repo-url">Repository url</FormLabel>
      <Input type="text" id="repo-url" placeholder="Start typing here..." />
      <IconButton
        aria-label="Search database"
        icon="search"
        isLoading={loading}
      />
    </FormControl>
  );
};

export default ReleasesPicker;
