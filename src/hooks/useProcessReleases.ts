import { MiscGroupTitles, ProcessedReleasesCollection, Release } from 'models';
import { useState, useEffect, useMemo } from 'react';
import parse from 'remark-parse';
import unified from 'unified';

import { getReleaseGroupTitle } from '~/utils';

function insertReleaseInGroup(
  newProcessedRelease: any,
  groupedReleases: any
): void {
  const { title } = newProcessedRelease;
  if (groupedReleases[title]) {
    // group already exists, then append new changes of same type
    groupedReleases[title].push(newProcessedRelease);
  } else {
    // group doesn't exist yet, then create it and init with new changes
    groupedReleases[title] = [newProcessedRelease];
  }
}

function processedReleaseIsEmpty(processedRelease: any): boolean {
  return processedRelease.descriptionMdast.children.length === 0;
}

const processor = unified().use(parse);

async function processReleasesAsync(releases: Release[]) {
  // TODO: reject on error
  return new Promise((resolve) => {
    setTimeout(() => {
      const processedReleasesCollection = {};

      releases.forEach((rel) => {
        const { body, ...remainingRel } = rel;

        const mdastDescription: any = processor.parse(body);

        let newProcessedRelease: any;
        mdastDescription.children.forEach((mdastNode: any) => {
          if (
            mdastNode.type === 'heading' &&
            [1, 2, 3].includes(mdastNode.depth)
          ) {
            // check if prev release available, and save it if so...
            if (
              newProcessedRelease &&
              !processedReleaseIsEmpty(newProcessedRelease)
            ) {
              insertReleaseInGroup(
                newProcessedRelease,
                processedReleasesCollection
              );
            }

            // ... and create new release if proper header found
            const title = getReleaseGroupTitle(mdastNode);
            if (title) {
              newProcessedRelease = {
                title,
                originalTitle: mdastNode.children[0].value,
                descriptionMdast: {
                  type: 'root',
                  children: [],
                },
                ...remainingRel,
              };
            }
          } else if (!newProcessedRelease) {
            // standalone or non-groupable release found
            newProcessedRelease = {
              title: MiscGroupTitles.unknown,
              originalTitle: mdastNode.children[0].value,
              descriptionMdast: {
                type: 'root',
                children: [mdastNode],
              },
              ...remainingRel,
            };
          } else {
            // append content to current release
            newProcessedRelease.descriptionMdast.children.push(mdastNode);
          }
        });
        // insert final release in group
        if (
          newProcessedRelease &&
          !processedReleaseIsEmpty(newProcessedRelease)
        ) {
          insertReleaseInGroup(
            newProcessedRelease,
            processedReleasesCollection
          );
        }
      });
      resolve(processedReleasesCollection as any);
    }, 0);
  });
}

interface UseProcessReleasesReturn {
  processedReleases: ProcessedReleasesCollection;
  isProcessing: boolean;
}

function useProcessReleases(
  releases: Release[] | null
): UseProcessReleasesReturn {
  const [processedReleases, setProcessedReleases] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(
    function processReleasesEffect() {
      setIsProcessing(true);

      const handleProcessReleases = async () => {
        if (!releases || releases.length === 0) {
          setProcessedReleases(null);
          setIsProcessing(false);
        } else {
          const result = await processReleasesAsync(releases);
          setProcessedReleases(result as any);
        }
        setIsProcessing(false);
      };

      handleProcessReleases();
    },
    [releases]
  );

  const data = useMemo(() => ({ processedReleases, isProcessing }), [
    isProcessing,
    processedReleases,
  ]);
  return data;
}

export default useProcessReleases;
