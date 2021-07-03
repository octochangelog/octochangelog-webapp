import { useState, useEffect } from 'react'
import gfm from 'remark-gfm'
import parse from 'remark-parse'
import unified from 'unified'

import { MiscGroupTitles, ProcessedReleasesCollection, Release } from '~/models'
import { getReleaseGroupTitle } from '~/utils'

function insertReleaseInGroup(
  newProcessedRelease: any,
  groupedReleases: any
): void {
  const { title } = newProcessedRelease
  if (groupedReleases[title]) {
    // Group already exists, then append new changes of same type
    groupedReleases[title].push(newProcessedRelease)
  } else {
    // Group doesn't exist yet, then create it and init with new changes
    groupedReleases[title] = [newProcessedRelease]
  }
}

function processedReleaseIsEmpty(processedRelease: any): boolean {
  return processedRelease.descriptionMdast.children.length === 0
}

const processor = unified().use(parse).use(gfm)

function processReleasesAsync(releases: Release[]) {
  // TODO: reject on error
  return new Promise((resolve) => {
    const processedReleasesCollection = {}

    releases.forEach((rel) => {
      const { body, ...remainingRel } = rel

      if (!body) {
        return
      }

      const mdastDescription: any = processor.parse(body)

      let newProcessedRelease: any
      mdastDescription.children.forEach((mdastNode: any) => {
        if (
          mdastNode.type === 'heading' &&
          [1, 2, 3].includes(mdastNode.depth)
        ) {
          // Check if prev release available, and save it if so...
          if (
            newProcessedRelease &&
            !processedReleaseIsEmpty(newProcessedRelease)
          ) {
            insertReleaseInGroup(
              newProcessedRelease,
              processedReleasesCollection
            )
          }

          // ... and create new release if proper header found
          const title = getReleaseGroupTitle(mdastNode)
          if (title) {
            newProcessedRelease = {
              title,
              originalTitle: mdastNode.children[0].value,
              descriptionMdast: {
                type: 'root',
                children: [],
              },
              ...remainingRel,
            }
          }
        } else if (!newProcessedRelease) {
          // Standalone or non-groupable release found
          newProcessedRelease = {
            title: MiscGroupTitles.unknown,
            originalTitle: mdastNode.children[0].value,
            descriptionMdast: {
              type: 'root',
              children: [mdastNode],
            },
            ...remainingRel,
          }
        } else {
          // Append content to current release
          newProcessedRelease.descriptionMdast.children.push(mdastNode)
        }
      })
      // Insert final release in group
      if (
        newProcessedRelease &&
        !processedReleaseIsEmpty(newProcessedRelease)
      ) {
        insertReleaseInGroup(newProcessedRelease, processedReleasesCollection)
      }
    })
    resolve(processedReleasesCollection as any)
  })
}

interface UseProcessReleasesReturn {
  processedReleases: ProcessedReleasesCollection
  isProcessing: boolean
}

function useProcessReleases(
  releases: Release[] | null
): UseProcessReleasesReturn {
  const [processedReleases, setProcessedReleases] =
    useState<ProcessedReleasesCollection | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(
    function processReleasesEffect() {
      const handleProcessReleases = async () => {
        if (!releases || releases.length === 0) {
          setProcessedReleases(null)
        } else {
          setIsProcessing(true)
          const result = await processReleasesAsync(releases)
          setProcessedReleases(result)
        }

        setIsProcessing(false)
      }

      handleProcessReleases()
    },
    [releases]
  )

  return { processedReleases, isProcessing }
}

export default useProcessReleases
