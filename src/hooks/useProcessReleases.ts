import React from 'react';
import unified from 'unified';
import parse from 'remark-parse';
import { lowerCase } from 'lodash';
import { ProcessedReleasesCollection, Release } from 'models';

function insertReleaseInGroup(newProcessedRelease: any, groupedReleases: any) {
  const { title } = newProcessedRelease;
  if (groupedReleases[title]) {
    // group already exists, then append new changes of same type
    groupedReleases[title].push(newProcessedRelease);
  } else {
    // group doesn't exist yet, then create it and init with new changes
    groupedReleases[title] = [newProcessedRelease];
  }
}

const processor = unified().use(parse);

function useProcessReleases(
  releases: Release[] | null
): ProcessedReleasesCollection {
  const [processedReleases, setProcessedReleases] = React.useState<any>(null);

  React.useEffect(
    function processReleases() {
      if (!releases || releases.length === 0) {
        setProcessedReleases(null);
      } else {
        const processedReleasesCollection = {};

        releases.forEach((rel) => {
          const { description, ...remainingRel } = rel;

          const mdastDescription: any = processor.parse(description);

          let newProcessedRelease: any;
          mdastDescription.children.forEach((mdastNode: any) => {
            if (
              mdastNode.type === 'heading' &&
              [1, 2, 3].includes(mdastNode.depth)
            ) {
              // check if prev release available, and save it if so...
              if (newProcessedRelease) {
                insertReleaseInGroup(
                  newProcessedRelease,
                  processedReleasesCollection
                );
              }

              // ... and create new release if proper header found
              const title = lowerCase(mdastNode.children[0].value);
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
            } else {
              // append content to current release
              newProcessedRelease.descriptionMdast.children.push(mdastNode);
            }
          });
          // insert final release in group
          if (newProcessedRelease) {
            insertReleaseInGroup(
              newProcessedRelease,
              processedReleasesCollection
            );
          }
          setProcessedReleases(processedReleasesCollection as any);
        });
      }
    },
    [releases]
  );

  return processedReleases;
}

export default useProcessReleases;
