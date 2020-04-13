import semver from 'semver';
import { RepositoryQueryVars, Release } from 'models';

const gitHubRepoRegExp = /((git@|http(s)?:\/\/)(www\.)?(github\.com)([/:]))([\w,\-_]+)\/([\w,\-_]+)(.git)?((\/)?)/;

export function getRepositoryDataFromUrl(
  url: string
): RepositoryQueryVars | null {
  const matchGroups = url.match(gitHubRepoRegExp);
  const owner = matchGroups?.[7];
  const name = matchGroups?.[8];

  if (owner && name) {
    return {
      name,
      owner,
    };
  }
  return null;
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
    ({ tagName }) =>
      semver.valid(tagName) &&
      semver.gt(tagName, from) &&
      semver.lte(tagName, to)
  );
}
