import { Badge, Box, Heading, Icon, Text } from '@chakra-ui/core';
import styled from '@emotion/styled';
import React from 'react';
import { getRepositoryNameDisplay } from 'utils';

import Container from '~/components/Container';
import Link from '~/components/Link';
import customTheme from '~/customTheme';
import useIsStick from '~/hooks/useIsStick';
import { Repository } from '~/models';

const StickyBox = styled(Box)(({ isStick }: { isStick: boolean }) => ({
  boxShadow: isStick ? '0 0.0625rem 0.375rem 0 rgba(0, 0, 0, 0.3)' : 'none',
  transition: 'all 50ms linear',
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

  const bgColor = isHeadingStick ? customTheme.colors.gray[700] : 'white';
  const color = isHeadingStick
    ? customTheme.colors.secondary[200]
    : customTheme.colors.gray[800];
  const badgeColor = isHeadingStick ? 'secondary' : 'primary';

  return (
    <StickyBox
      position="sticky"
      top="-2px"
      width="full"
      color={color}
      bg={bgColor}
      py={1}
      ref={stickyEl}
      isStick={isHeadingStick}
    >
      <Container>
        <Heading
          as="h1"
          size={isHeadingStick ? 'lg' : '2xl'}
          mb={2}
          textTransform="capitalize"
        >
          <Link
            href={repository.url}
            isExternal
            color={isHeadingStick ? 'gray.50' : 'primary.500'}
          >
            {getRepositoryNameDisplay(repository.name)}{' '}
            <Icon name="external-link" />
          </Link>
        </Heading>

        {fromVersion && toVersion ? (
          <Heading fontSize={isHeadingStick ? 'xs' : 'md'} mb={2}>
            Comparing changes from{' '}
            <Badge variant="solid" variantColor={badgeColor}>
              {fromVersion}
            </Badge>{' '}
            to{' '}
            <Badge variant="solid" variantColor={badgeColor}>
              {toVersion}
            </Badge>
          </Heading>
        ) : (
          <Text as="i" color="gray.500">
            No releases selected to compare
          </Text>
        )}
      </Container>
    </StickyBox>
  );
};

export default RepositoryReleasesChangelogHeading;
