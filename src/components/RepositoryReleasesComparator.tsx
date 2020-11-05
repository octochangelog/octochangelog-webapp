import { Divider } from '@chakra-ui/core'
import {
  Release,
  Repository,
  RepositoryQueryPayload,
  VersionRange,
} from 'models'
import dynamic from 'next/dynamic'
import * as React from 'react'

import Container from '~/components/Container'
import RepositoryReleasesChangelogHeading from '~/components/RepositoryReleasesChangelogHeading'
import RepositoryReleasesPicker from '~/components/RepositoryReleasesPicker'
import useIsClientSide from '~/hooks/useIsClientSide'

const RepositoryReleasesChangelog = dynamic(() =>
  import('~/components/RepositoryReleasesChangelog')
)

interface Props {
  repository?: Repository
  releases?: Release[]
  versionRange: VersionRange
  isFetching?: boolean
  onRepositoryChange(repository: RepositoryQueryPayload | null): void
  onVersionRangeChange(range: VersionRange): void
}

const RepositoryReleasesComparator = ({
  repository,
  releases,
  versionRange,
  isFetching = false,
  onRepositoryChange,
  onVersionRangeChange,
}: Props) => {
  const isClientSide = useIsClientSide()

  return (
    <>
      <Container>
        {isClientSide && (
          <RepositoryReleasesPicker
            releases={releases}
            versionRange={versionRange}
            isFetching={isFetching}
            onRepositoryChange={onRepositoryChange}
            onVersionRangeChange={onVersionRangeChange}
          />
        )}
      </Container>
      <Divider my={4} />
      {repository && (
        <>
          <RepositoryReleasesChangelogHeading
            repository={repository}
            fromVersion={versionRange[0]}
            toVersion={versionRange[1]}
          />
          <Container>
            <RepositoryReleasesChangelog
              repository={repository}
              releases={releases}
              fromVersion={versionRange[0]}
              toVersion={versionRange[1]}
            />
          </Container>
        </>
      )}
    </>
  )
}

export default RepositoryReleasesComparator
