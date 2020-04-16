import React from 'react';
import {
  Box,
  BoxProps,
  Code,
  Heading,
  HeadingProps,
  List,
  ListItem,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/core';
import unified from 'unified';
import parse from 'remark-parse';
import remark2react from 'remark-react';
import { Release, Repository } from 'models';
import { filterReleasesByVersionRange } from 'utils';
import Link from 'components/Link';

const remarkReactComponents = {
  a: Link,
  ul: (props: any) => <List styleType="disc" mb="4" {...props} />,
  li: ListItem,
  h1: (props: HeadingProps) => <Heading as="h1" size="2xl" mb="4" {...props} />,
  h2: (props: HeadingProps) => <Heading as="h2" size="xl" mb="4" {...props} />,
  h3: (props: HeadingProps) => <Heading as="h3" size="lg" mb="4" {...props} />,
  h4: (props: HeadingProps) => <Heading as="h4" size="md" mb="4" {...props} />,
  h5: (props: HeadingProps) => <Heading as="h5" size="sm" mb="4" {...props} />,
  h6: (props: HeadingProps) => <Heading as="h6" size="xs" mb="4" {...props} />,
  code: (props: BoxProps) => <Code px="2" {...props} />,
  p: (props: BoxProps) => <Text mb="4" {...props} />,
};

interface RepositoryReleasesChangelogProps {
  repository: Repository | null;
  fromVersion: string;
  toVersion: string;
}

const RepositoryReleasesChangelog = ({
  repository,
  fromVersion,
  toVersion,
}: RepositoryReleasesChangelogProps) => {
  const [filteredReleases, setFilteredReleases] = React.useState<
    Release[] | null
  >(null);

  const releases = repository?.releases;

  React.useEffect(
    function () {
      if (releases && fromVersion && toVersion) {
        setFilteredReleases(
          filterReleasesByVersionRange({
            releases,
            from: fromVersion,
            to: toVersion,
          })
        );
      } else {
        setFilteredReleases(null);
      }
    },
    [fromVersion, releases, toVersion]
  );

  if (!repository) {
    return null;
  }

  return (
    <>
      <Heading as="h1" size="2xl" mb={4}>
        <Link href={repository.url} isExternal>
          {repository.name}
        </Link>
      </Heading>

      {fromVersion && toVersion ? (
        <Heading fontSize="sm" mb={4}>
          Comparing releases from{' '}
          <Tag size="sm" variantColor="orange">
            {fromVersion}
          </Tag>{' '}
          to{' '}
          <Tag size="sm" variantColor="orange">
            {toVersion}
          </Tag>
        </Heading>
      ) : (
        <Text as="i" color="gray.500">
          No releases selected to compare
        </Text>
      )}

      {filteredReleases && (
        <Stack spacing={6}>
          {filteredReleases.map((release) => (
            <Box key={release.tagName}>
              {
                unified()
                  .use(parse)
                  .use(remark2react, { remarkReactComponents })
                  // @ts-ignore
                  .processSync(release.description).result
              }
            </Box>
          ))}
        </Stack>
      )}
    </>
  );
};

export default RepositoryReleasesChangelog;
