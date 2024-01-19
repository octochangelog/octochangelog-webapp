import { Box, Heading, Skeleton, Stack } from '@chakra-ui/react'

import ProcessedReleaseChangeDescription from '@/app/comparator/ProcessedReleaseChangeDescription'
import TextSkeleton from '@/components/TextSkeleton'
import useProcessReleases from '@/hooks/useProcessReleases'
import {
	type ProcessedRelease,
	type Release,
	type ReleaseGroup,
	type Repository,
} from '@/models'
import { compareReleaseGroupsByPriority } from '@/utils'

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
					as="h3"
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

interface ComparatorChangelogResultsProps {
	releases: Array<Release>
	repository: Repository
}

const ComparatorChangelogResults = ({
	releases,
	repository,
}: ComparatorChangelogResultsProps) => {
	const { processedReleases, isProcessing } = useProcessReleases(releases)

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

	if (isProcessing) {
		return (
			<>
				<Skeleton width="20%" height={8} mb={4} />
				<TextSkeleton />
			</>
		)
	}

	if (!processedReleases || Object.keys(processedReleases).length === 0) {
		return null
	}

	return (
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
	)
}

export default ComparatorChangelogResults
