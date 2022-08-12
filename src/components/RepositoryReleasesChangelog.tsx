import {
	Alert,
	AlertIcon,
	Box,
	Heading,
	Skeleton,
	Stack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import ProcessedReleaseChangeDescription from '~/components/ProcessedReleaseChangeDescription'
import TextSkeleton from '~/components/TextSkeleton'
import useProcessReleases from '~/hooks/useProcessReleases'
import type {
	ProcessedRelease,
	Release,
	ReleaseGroup,
	ReleaseVersion,
	Repository,
} from '~/models'
import { useReleasesQuery } from '~/queries/release'
import {
	compareReleaseGroupsByPriority,
	filterReleasesByVersionRange,
	compareReleasesByVersion,
} from '~/utils'

interface RepositoryReleasesChangelogProps {
	repository: Repository
	fromVersion?: ReleaseVersion
	toVersion?: ReleaseVersion
}

const ReleaseChangelogGroup = ({
	title,
	releaseGroup,
	repository,
	shouldShowTitle,
}: {
	title: ReleaseGroup
	releaseGroup: Array<ProcessedRelease>
	repository: Repository
	shouldShowTitle: boolean
}) => {
	const textTransform =
		title === 'breaking changes' ? 'uppercase' : 'capitalize'

	return (
		<Box key={title}>
			{shouldShowTitle && (
				<Heading
					as="h2"
					size="xl"
					bgColor="background3"
					mb={4}
					py={4}
					textTransform={textTransform}
					position="sticky"
					top={0}
				>
					{title}
				</Heading>
			)}
			<Box mb={4}>
				{releaseGroup.map((processedReleaseChange: ProcessedRelease) => (
					<ProcessedReleaseChangeDescription
						key={`${title}-${processedReleaseChange.id}`}
						repository={repository}
						processedReleaseChange={processedReleaseChange}
						mb={8}
					/>
				))}
			</Box>
		</Box>
	)
}

const RepositoryReleasesChangelog = ({
	repository,
	fromVersion,
	toVersion,
}: RepositoryReleasesChangelogProps) => {
	const [filteredReleases, setFilteredReleases] =
		useState<Array<Release> | null>(null)

	const { processedReleases, isProcessing } =
		useProcessReleases(filteredReleases)

	const {
		data: releases,
		isLoading,
		isFetched,
	} = useReleasesQuery({
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

	const shouldShowProcessedReleaseTitle = (() => {
		if (!processedReleases) {
			return false
		}

		const groupsTitles = Object.keys(processedReleases)

		return groupsTitles.length > 1 || !groupsTitles.includes('others')
	})()

	const sortedGroupTitles: Array<string> | null = processedReleases
		? Object.keys(processedReleases).sort(compareReleaseGroupsByPriority)
		: []

	// TODO: simplify conditional renders with state machine
	return (
		<>
			{isProcessing && (
				<>
					<Skeleton width="20%" height={8} mb={4} />
					<TextSkeleton />
				</>
			)}

			{!isProcessing && !isLoading && processedReleases && (
				<Stack spacing={6}>
					{sortedGroupTitles.map((title) => (
						<ReleaseChangelogGroup
							key={title}
							title={title}
							releaseGroup={processedReleases[title]}
							repository={repository}
							shouldShowTitle={shouldShowProcessedReleaseTitle}
						/>
					))}
				</Stack>
			)}

			{fromVersion &&
				toVersion &&
				!processedReleases &&
				!isProcessing &&
				isFetched && (
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
