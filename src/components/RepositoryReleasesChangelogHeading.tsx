import { Badge, Box, Heading, Text } from '@chakra-ui/core';
import styled from '@emotion/styled';
import React from 'react';
import { getRepositoryNameDisplay } from 'utils';

import Link from '~/components/Link';
import { containerSpace } from '~/customTheme';
import useIsStick from '~/hooks/useIsStick';
import { Repository } from '~/models';

const StickyBox = styled(Box)(({ isStick }: { isStick: boolean }) => ({
  boxShadow: isStick ? '0 0.0625rem 0.375rem 0 rgba(0, 0, 0, 0.3)' : 'none',
  marginLeft: isStick ? `-${containerSpace}` : 'none',
  marginRight: isStick ? `-${containerSpace}` : 'none',
  paddingLeft: isStick ? containerSpace : 'none',
  paddingRight: isStick ? containerSpace : 'none',
}));

interface Props {
  repository: Repository;
  fromVersion: string;
  toVersion: string;
}

const RepositoryReleasesChangelogHeading = ({
  repository,
  fromVersion,
  toVersion,
}: Props) => {
  const stickyEl = React.useRef({ offsetTop: 0 });
  const isHeadingStick = useIsStick(stickyEl);

  return (
    <StickyBox
      position="sticky"
      top="0"
      width="auto"
      bg="white"
      py={1}
      ref={stickyEl}
      isStick={isHeadingStick}
    >
      <Heading as="h1" size="2xl" mb={2} textTransform="capitalize">
        <Link href={repository.url} isExternal>
          {getRepositoryNameDisplay(repository.name)}
        </Link>
      </Heading>

      {fromVersion && toVersion ? (
        <Heading fontSize="md" mb={2}>
          Comparing changes from{' '}
          <Badge variant="outline" variantColor="brand">
            {fromVersion}
          </Badge>{' '}
          to{' '}
          <Badge variant="outline" variantColor="brand">
            {toVersion}
          </Badge>
        </Heading>
      ) : (
        <Text as="i" color="gray.500">
          No releases selected to compare
        </Text>
      )}
    </StickyBox>
  );
};

export default RepositoryReleasesChangelogHeading;
