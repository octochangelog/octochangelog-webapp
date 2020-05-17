import { Flex, Heading } from '@chakra-ui/core';
import api from 'api';
import React from 'react';
import { useQuery } from 'react-query';
import semver from 'semver';

import GitHubLoginButton from '~/components/GitHubLoginButton';
import Layout from '~/components/Layout';
import RepositoryReleasesComparator from '~/components/RepositoryReleasesComparator';
import { EMPTY_VERSION_RANGE } from '~/global';
import { Release, RepositoryQueryPayload, VersionRange } from '~/models';

const ComparatorPage = () => {
  // TODO:
  //  - show auth prompt on rate limit error
  //  - deal with access token properly on Api class
  const [shouldShowAuth] = React.useState(false);
  const [versionRange, setVersionRange] = React.useState<VersionRange>(
    EMPTY_VERSION_RANGE
  );

  const [refinedReleases, setRefinedReleases] = React.useState<
    Release[] | undefined
  >(undefined);

  const [
    requestPayload,
    setRequestPayload,
  ] = React.useState<RepositoryQueryPayload | null>(null);

  const { data: repository } = useQuery(
    ['repository', requestPayload],
    (_, payload) => api.readRepo(payload!)
  );

  const { data: releases } = useQuery(
    repository && ['releases', requestPayload],
    (_, payload) => api.readRepoReleases(payload!)
  );

  React.useEffect(
    function refineReleasesEffect() {
      let newReleases;
      if (releases) {
        newReleases = releases.filter(
          // exclude pre-releases
          ({ tag_name }) =>
            semver.valid(tag_name) && !semver.prerelease(tag_name)
        );
      }

      setRefinedReleases(newReleases);
    },
    [releases]
  );

  const handleRepositoryPayloadChange = (payload: RepositoryQueryPayload) => {
    setRequestPayload(payload);
    setVersionRange(EMPTY_VERSION_RANGE); // clean versions
  };

  return (
    <Layout extraTitle="Comparator">
      {shouldShowAuth && (
        <Flex justify="center">
          <Flex
            p={5}
            shadow={{ base: 'none', md: 'md' }}
            borderWidth={{ base: 'none', md: '1px' }}
            width={{ base: 'full', md: 600 }}
            direction="column"
            justify="center"
          >
            <Heading fontSize="l" textAlign="center" mb={4}>
              You need to authorize GitHub before using the comparator
            </Heading>
            <Flex justify="center">
              <GitHubLoginButton />
            </Flex>
          </Flex>
        </Flex>
      )}

      <RepositoryReleasesComparator
        repository={repository}
        releases={refinedReleases}
        versionRange={versionRange}
        onRepositoryChange={handleRepositoryPayloadChange}
        onVersionRangeChange={setVersionRange}
      />
    </Layout>
  );
};

export default ComparatorPage;
