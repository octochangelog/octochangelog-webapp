import React from 'react';
import { Code, Heading, Link, Stack, Tag } from '@chakra-ui/core';
import { Release, Repository } from 'types';

type PropTypes = {
  repository?: Repository;
  releases?: Release[];
};

const ReleasesResults: React.FC<PropTypes> = ({ repository, releases }) => {
  if (!repository || !releases) {
    return null;
  }

  return (
    <>
      <Heading mb={4}>
        <Link href={repository.url} color="orange.500" isExternal>
          {repository.name}
        </Link>
      </Heading>

      <Heading fontSize="sm" mb={4}>
        Comparing releases from{' '}
        <Tag size="sm" variantColor="orange">
          {releases[0].name}
        </Tag>{' '}
        to{' '}
        <Tag size="sm" variantColor="orange">
          {releases[releases.length - 1].name}
        </Tag>
      </Heading>

      <Stack spacing={4}>
        {releases.map((release) => (
          <Code key={release.id}>{release.description}</Code>
        ))}
      </Stack>
    </>
  );
};

export default ReleasesResults;
