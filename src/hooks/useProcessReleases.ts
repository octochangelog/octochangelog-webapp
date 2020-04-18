import React from 'react';
import unified from 'unified';
import markdown from 'remark-parse';
import { lowerCase } from 'lodash';
import { ProcessedReleasesCollection, Release } from 'models';

function insertReleaseInGroup(newProcessedRelease: any, groupedReleases: any) {
  const { changeType } = newProcessedRelease;
  if (groupedReleases[changeType]) {
    // group already exists, then append new changes of same type
    groupedReleases[changeType].push(newProcessedRelease);
  } else {
    // group doesn't exist yet, then create it and init with new changes
    groupedReleases[changeType] = [newProcessedRelease];
  }
}

function useProcessReleases(
  releases: Release[] | null
): ProcessedReleasesCollection {
  const [processedReleases, setProcessedReleases] = React.useState<any>(null);

  React.useEffect(
    function processReleases() {
      if (!releases) {
        setProcessedReleases(null);
      } else {
        const processedReleasesCollection = {};

        releases.forEach((rel) => {
          const { description, ...remainingRel } = rel;

          const mdastDescription: any = unified()
            .use(markdown)
            .parse(description);

          let newProcessedRelease: any;
          mdastDescription.children.forEach((mdastNode: any) => {
            if (mdastNode.type === 'heading') {
              // check if prev release available, and save it if so...
              if (newProcessedRelease) {
                insertReleaseInGroup(
                  newProcessedRelease,
                  processedReleasesCollection
                );
              }

              // ... and create new release if proper header found
              const groupType = lowerCase(mdastNode.children[0].value);
              if (groupType) {
                newProcessedRelease = {
                  changeType: groupType,
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
