import { Alert, AlertIcon, CircularProgress, Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import ComparatorChangelogResults from '~/components/ComparatorChangelogResults'
import type { Release, ReleaseVersion, Repository } from '~/models'
import { useReleasesQuery } from '~/queries/release'
import { compareReleasesByVersion, filterReleasesByVersionRange } from '~/utils'

interface RepositoryReleasesChangelogProps {
	repository: Repository
	fromVersion?: ReleaseVersion
	toVersion?: ReleaseVersion
}

const RepositoryReleasesChangelog = ({
	repository,
	fromVersion,
	toVersion,
}: RepositoryReleasesChangelogProps) => {
	const [filteredReleases, setFilteredReleases] =
		useState<Array<Release> | null>(null)

	const { data: releases, isFetching } = useReleasesQuery({
		repository,
		fromVersion,
		toVersion,
	})

	useEffect(() => {
		if (releases && fromVersion && toVersion) {
			const newFilteredReleases = filterReleasesByVersionRange({
				releases,
				from: fromVersion,
				to: toVersion,
			}).sort((a, b) => compareReleasesByVersion(a, b, 'asc'))
			setFilteredReleases(newFilteredReleases)
		} else {
			setFilteredReleases(null)
		}
	}, [fromVersion, releases, toVersion])

	return (
		<>
			{isFetching && (
				<Flex align="center" justify="center" height="100%">
					<CircularProgress
						isIndeterminate
						size="8"
						color="primary.400"
						aria-label="Loading releases"
					/>
				</Flex>
			)}

			{!isFetching && filteredReleases && (
				<ComparatorChangelogResults
					releases={filteredReleases}
					repository={repository}
				/>
			)}

			{fromVersion && toVersion && !filteredReleases && !isFetching && (
				<Alert status="error">
					<AlertIcon />
					No processed releases to show
				</Alert>
			)}

			<style global jsx>{`
				.hljs-comment,
				.hljs-quote {
					color: #998;
					font-style: italic;
				}
				.hljs-keyword,
				.hljs-selector-tag,
				.hljs-subst {
					color: #333;
					font-weight: bold;
				}
				.hljs-number,
				.hljs-literal,
				.hljs-variable,
				.hljs-template-variable,
				.hljs-tag .hljs-attr {
					color: #008080;
				}
				.hljs-string,
				.hljs-doctag {
					color: #d14;
				}
				.hljs-title,
				.hljs-section,
				.hljs-selector-id {
					color: #900;
					font-weight: bold;
				}
				.hljs-subst {
					font-weight: normal;
				}
				.hljs-type,
				.hljs-class .hljs-title {
					color: #458;
					font-weight: bold;
				}
				.hljs-tag,
				.hljs-name,
				.hljs-attribute {
					color: #000080;
					font-weight: normal;
				}
				.hljs-regexp,
				.hljs-link {
					color: #009926;
				}
				.hljs-symbol,
				.hljs-bullet {
					color: #990073;
				}
				.hljs-built_in,
				.hljs-builtin-name {
					color: #0086b3;
				}
				.hljs-meta {
					color: #999;
					font-weight: bold;
				}
				.hljs-deletion {
					background: #fdd;
				}
				.hljs-addition {
					background: #dfd;
				}
				.hljs-emphasis {
					font-style: italic;
				}
				.hljs-strong {
					font-weight: bold;
				}
			`}</style>
		</>
	)
}

export default RepositoryReleasesChangelog
