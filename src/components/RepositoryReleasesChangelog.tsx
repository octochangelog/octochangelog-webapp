import React from 'react';
import { Code, Heading, Link, Stack, Tag, Text } from '@chakra-ui/core';
import Converter from 'md-to-bemjson';
import { Release, Repository } from 'models';
import { filterReleasesByVersionRange } from 'utils';

const md2Bemjson = new Converter();

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
      <Heading mb={4}>
        <Link href={repository.url} color="orange.500" isExternal>
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
        <Stack spacing={4}>
          {filteredReleases.map((release) => (
            <Code key={release.tagName}>
              {JSON.stringify(
                md2Bemjson.convertSync(release.description),
                null,
                2
              )}
            </Code>
          ))}
        </Stack>
      )}
    </>
  );
};

export default RepositoryReleasesChangelog;
