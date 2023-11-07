import type { StackProps } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'

import type { Release } from '~/models'
import { useReleasesQuery } from '~/queries/release'
import { getReleaseVersion, compareReleasesByVersion } from '~/utils'

import ReleaseVersionFormControl from './ReleaseVersionFormControl'
import { useComparatorState, useComparatorUpdater } from './comparator-context'

function mapReleasesRange(
	releases?: Array<Release>,
): [Array<Release>, Array<Release>] {
	if (!releases?.length) {
		return [[], []]
	}

	const sortedReleases = releases.sort(compareReleasesByVersion)

	// Remove very last version to leave a gap of 1 version between penultimate from version and last to version
	const fromReleases =
		sortedReleases.length === 1 ? sortedReleases : sortedReleases.slice(1)

	// Prepend "latest" option based on last release object
	const toReleases = [
		{
			...sortedReleases[0],
			name: `Latest (${getReleaseVersion(sortedReleases[0])})`,
			tag_name: 'latest',
			id: -1,
		},
		...sortedReleases,
	]

	return [fromReleases, toReleases]
}

const ReleaseVersionsRangeFormControl = (props: StackProps) => {
	const { repository, fromVersion, toVersion } = useComparatorState()
	const { setFromVersion, setToVersion } = useComparatorUpdater()

	const { data: releases, isFetching } = useReleasesQuery({
		repository,
		fromVersion,
		toVersion,
	})

	const [fromReleases, toReleases] = mapReleasesRange(releases)

	const selectPlaceholder =
		Array.isArray(releases) && releases.length === 0
			? 'Releases not found'
			: 'Choose a release'

	return (
		<Stack {...props}>
			<ReleaseVersionFormControl
				label="Select from release"
				id="from-version"
				isDisabled={!releases || isFetching}
				isLoading={isFetching}
				placeholder={selectPlaceholder}
				options={fromReleases}
				value={fromVersion ?? undefined}
				onChange={setFromVersion}
			/>
			<ReleaseVersionFormControl
				label="Select to release"
				id="to-version"
				isDisabled={!releases || isFetching}
				isLoading={isFetching}
				placeholder={selectPlaceholder}
				options={toReleases}
				value={toVersion ?? undefined}
				onChange={setToVersion}
			/>
		</Stack>
	)
}

export default ReleaseVersionsRangeFormControl
