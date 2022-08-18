import {
	Alert,
	AlertIcon,
	Box,
	CircularProgress,
	Flex,
	Skeleton,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import TextSkeleton from './TextSkeleton'

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
	const [isFilteringReleases, setIsFilteringReleases] = useState<boolean>(true)

	const { data: releases, isFetching } = useReleasesQuery({
		repository,
		fromVersion,
		toVersion,
	})

	useEffect(() => {
		setIsFilteringReleases(true)
		const timeoutId = setTimeout(() => {
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

			setIsFilteringReleases(false)
		}, 0)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [fromVersion, releases, toVersion])

	const hasFilteredReleases =
		Array.isArray(filteredReleases) && filteredReleases.length > 0

	const isLoading = isFetching || isFilteringReleases
	const hasRequiredDataToFilter = !!fromVersion && !!toVersion

	return (
		<>
			{/* Changelog skeleton: fetching and processing releases from preloaded URL */}
			{hasRequiredDataToFilter && isLoading && (
				<Box aria-busy="true" aria-label="Calculating changelog">
					<Skeleton width="20%" height={8} mb={4} />
					<TextSkeleton />
				</Box>
			)}

			{/* Changelog spinner: only fetching releases from repository input manually filled */}
			{!hasRequiredDataToFilter && isLoading && (
				<Flex align="center" justify="center" height="100%">
					<CircularProgress
						isIndeterminate
						size="8"
						color="primary.400"
						aria-label="Loading releases"
					/>
				</Flex>
			)}

			{!!fromVersion && !!toVersion && !isLoading && !hasFilteredReleases && (
				<Alert status="error">
					<AlertIcon />
					No processed releases to show
				</Alert>
			)}

			{!isLoading && hasFilteredReleases && (
				<ComparatorChangelogResults
					releases={filteredReleases}
					repository={repository}
				/>
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
