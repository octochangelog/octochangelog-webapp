import React from 'react';
import { Flex, useToast } from '@chakra-ui/core';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { GitHubRepositoryData, RepositoryReleases } from 'types';
import RepositoryUrlInput from 'components/RepositoryUrlInput';

export const RELEASES_QUERY = gql`
  query Repository($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
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
  onChange(repository: RepositoryReleases | null): void;
};

const RepositoryReleasesPicker: React.FC<PropTypes> = ({ onChange }) => {
  const [
    repositoryData,
    setRepositoryData,
  ] = React.useState<GitHubRepositoryData | null>(null);

  const { loading, error, data } = useQuery<
    { repository: RepositoryReleases },
    GitHubRepositoryData | null
  >(RELEASES_QUERY, { variables: repositoryData, skip: !repositoryData });

  const toast = useToast();

  React.useEffect(() => {
    if (data) {
      const { releases, ...repository } = data.repository;
      onChange(repository);
    } else {
      onChange(null);
    }
  }, [data, onChange]);

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

  const handleRepositoryChange = (newRepoData: GitHubRepositoryData | null) => {
    setRepositoryData(newRepoData);
  };

  return (
    <Flex>
      <RepositoryUrlInput
        isLoading={loading}
        onRepositorySelect={handleRepositoryChange}
      />
    </Flex>
  );
};

export default RepositoryReleasesPicker;
