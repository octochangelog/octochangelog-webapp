import React from 'react';
import { Code, Heading, Link, Stack, Tag } from '@chakra-ui/core';
import { RepositoryReleases } from 'types';

type PropTypes = {
  repository: RepositoryReleases | null;
};

const RepositoryReleasesChangelog: React.FC<PropTypes> = ({ repository }) => {
  if (!repository) {
    return null;
  }

  const { nodes } = repository.releases;

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
          {nodes[0].name}
        </Tag>{' '}
        to{' '}
        <Tag size="sm" variantColor="orange">
          {nodes[nodes.length - 1].name}
        </Tag>
      </Heading>

      <Stack spacing={4}>
        {nodes.map((release) => (
          <Code key={release.id}>{release.description}</Code>
        ))}
      </Stack>
    </>
  );
};

export default RepositoryReleasesChangelog;
