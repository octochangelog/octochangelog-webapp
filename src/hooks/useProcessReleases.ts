import { useState, useEffect } from 'react'
import gfm from 'remark-gfm'
import parse from 'remark-parse'
import { unified } from 'unified'

import {
	type ProcessedRelease,
	type ProcessedReleasesCollection,
	type Release,
} from '@/models'
import { getMdastContentNodeTitle, getMdastContentReleaseGroup } from '@/utils'

function insertReleaseInGroup(
	newProcessedRelease: ProcessedRelease,
	groupedReleases: ProcessedReleasesCollection,
): void {
	const { title } = newProcessedRelease
	if (Array.isArray(groupedReleases[title])) {
		// Group already exists, then append new changes of same type
		groupedReleases[title].push(newProcessedRelease)
	} else {
		// Group doesn't exist yet, then create it and init with new changes
		groupedReleases[title] = [newProcessedRelease]
	}
}

function processedReleaseIsEmpty(processedRelease: ProcessedRelease): boolean {
	return processedRelease.descriptionMdast.children.length === 0
}

const processor = unified().use(parse).use(gfm)

function processReleases(
	releases: Array<Release>,
): ProcessedReleasesCollection {
	const processedReleasesCollection: ProcessedReleasesCollection = {}

	for (const rel of releases) {
		const { body, ...remainingRel } = rel

		if (!body) {
			continue
		}

		const mdastDescription = processor.parse(body)

		let newProcessedRelease: ProcessedRelease | undefined
		for (const mdastNode of mdastDescription.children) {
			const originalTitle = getMdastContentNodeTitle(mdastNode)

			if (mdastNode.type === 'heading' && [1, 2, 3].includes(mdastNode.depth)) {
				// Check if prev release available, and save it if so...
				if (
					newProcessedRelease &&
					!processedReleaseIsEmpty(newProcessedRelease)
				) {
					insertReleaseInGroup(newProcessedRelease, processedReleasesCollection)
				}

				// ... and create new release if proper header found
				const title = getMdastContentReleaseGroup(mdastNode)
				if (title) {
					newProcessedRelease = {
						title,
						originalTitle,
						descriptionMdast: {
							type: 'root',
							children: [],
						},
						...remainingRel,
					}
				}
			} else if (newProcessedRelease) {
				// Append content to current release
				newProcessedRelease.descriptionMdast.children.push(mdastNode)
			} else {
				// Standalone or non-groupable release found
				newProcessedRelease = {
					title: 'others',
					originalTitle,
					descriptionMdast: {
						type: 'root',
						children: [mdastNode],
					},
					...remainingRel,
				}
			}
		}
		// Insert final release in group
		if (newProcessedRelease && !processedReleaseIsEmpty(newProcessedRelease)) {
			insertReleaseInGroup(newProcessedRelease, processedReleasesCollection)
		}
	}
	return processedReleasesCollection
}

interface UseProcessReleasesReturn {
	processedReleases: ProcessedReleasesCollection | null
	isProcessing: boolean
}

function useProcessReleases(
	releases: Array<Release> | null,
): UseProcessReleasesReturn {
	const [processedReleases, setProcessedReleases] =
		useState<ProcessedReleasesCollection | null>(null)
	const [isProcessing, setIsProcessing] = useState(true)

	useEffect(() => {
		setIsProcessing(true)

		const timeoutId = setTimeout(() => {
			if (!releases || releases.length === 0) {
				setProcessedReleases(null)
			} else {
				setIsProcessing(true)
				const result = processReleases(releases)
				setProcessedReleases(result)
			}
			setIsProcessing(false)
		}, 0)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [releases])

	return { processedReleases, isProcessing }
}

export default useProcessReleases
