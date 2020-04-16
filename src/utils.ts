import semver from 'semver';
import { RepositoryQueryVars, Release } from 'models';

const gitHubRepoRegExp = /((git@|http(s)?:\/\/)(www\.)?(github\.com)([/:]))([\w,\-_.]+)\/([\w,\-_.]+)(.git)?((\/)?)/i;

export function getRepositoryDataFromUrl(
  url: string
): RepositoryQueryVars | null {
  let repoObj = null;

  try {
    const matchGroups = url.match(gitHubRepoRegExp);
    const owner = matchGroups?.[7];
    const name = matchGroups?.[8]?.replace('.git', ''); // remove .git suffix for repo names like next.js

    if (owner && name) {
      repoObj = {
        name,
        owner,
      };
    }
  } catch (e) {
    // do nothing
  }

  return repoObj;
}

type FilterReleasesNodes = {
  releases: Release[];
  from: string;
  to: string;
};

export function filterReleasesByVersionRange(
  args: FilterReleasesNodes
): Release[] {
  const { releases, from, to } = args;

  // filter version range as (from, to]
  return releases.filter(
    ({ tagName }) => semver.gt(tagName, from) && semver.lte(tagName, to)
  );
}
