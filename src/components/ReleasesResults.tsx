import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import {
  Alert,
  AlertIcon,
  Code,
  Heading,
  Link,
  Spinner,
  Stack,
  Tag,
} from '@chakra-ui/core/dist';

const QUERY = gql`
  {
    repository(
      name: "eslint-plugin-testing-library"
      owner: "testing-library"
    ) {
      name
      url
      releases(orderBy: { field: CREATED_AT, direction: ASC }, last: 10) {
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

const ReleasesResults = () => {
  const { loading, error, data } = useQuery(QUERY);

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        There was an error processing your request
      </Alert>
    );
  }

  const { nodes } = data.repository.releases;

  return (
    <>
      <Heading mb={4}>
        <Link href={data.repository.url} color="orange.500" isExternal>
          {data.repository.name}
        </Link>
      </Heading>

      <Heading fontSize="sm" mb={4}>
        Comparing releases from{' '}
        <Tag size="sm" variantColor="orange">
          {nodes[0].name}
        </Tag>{' '}
        to{' '}
        <Tag size="sm" variantColor="orange">
          {nodes[nodes.length - 1].name}
        </Tag>
      </Heading>

      <Stack spacing={4}>
        {nodes.map((release: { description: string; id: string }) => (
          <Code key={release.id}>{release.description}</Code>
        ))}
      </Stack>
    </>
  );
};

export default ReleasesResults;
