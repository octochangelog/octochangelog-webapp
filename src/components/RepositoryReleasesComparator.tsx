import React from 'react';
import { Divider, Skeleton } from '@chakra-ui/core';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import RepositoryReleasesPicker from 'components/RepositoryReleasesPicker';
import { Repository, VersionRange } from 'models';
const RepositoryReleasesChangelog = React.lazy(() =>
  import('components/RepositoryReleasesChangelog')
);

const fallbackSkeleton: React.ReactNode = (
  <div>
    <Skeleton height="50px" mb={4} width="50%" />
    <Skeleton height="25px" width="25%" />
  </div>
);

interface Props {
  githubOauthToken: string;
}

const RepositoryReleasesComparator = ({ githubOauthToken }: Props) => {
  const { current: client } = React.useRef(
    new ApolloClient({
      uri: 'https://api.github.com/graphql',
      headers: {
        authorization: `Bearer ${githubOauthToken}`,
      },
    })
  );

  const [
    repositorySelected,
    setRepositorySelected,
  ] = React.useState<Repository | null>(null);

  const [versionRage, setVersionRange] = React.useState<VersionRange>(['', '']);

  const handleRepositoryChange = React.useCallback(
    (repository) => {
      setRepositorySelected(repository);
    },
    [setRepositorySelected]
  );

  const handleVersionRangeChange = React.useCallback(
    (newVersionRange) => {
      setVersionRange(newVersionRange);
    },
    [setVersionRange]
  );

  return (
    <ApolloProvider client={client}>
      <RepositoryReleasesPicker
        onRepositoryChange={handleRepositoryChange}
        onVersionRangeChange={handleVersionRangeChange}
      />
      <Divider my={4} />
      {repositorySelected && (
        <React.Suspense fallback={fallbackSkeleton}>
          <RepositoryReleasesChangelog
            repository={repositorySelected}
            fromVersion={versionRage[0]}
            toVersion={versionRage[1]}
          />
        </React.Suspense>
      )}
    </ApolloProvider>
  );
};

export default RepositoryReleasesComparator;
