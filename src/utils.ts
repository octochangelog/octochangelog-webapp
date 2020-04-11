import semver from 'semver';
import { GitHubRepositoryData, Release } from 'types';

const gitHubRepoRegExp = /((git@|http(s)?:\/\/)(www\.)?(github\.com)([/:]))([\w,\-_]+)\/([\w,\-_]+)(.git)?((\/)?)/;

export function getRepositoryDataFromUrl(
  url: string
): GitHubRepositoryData | null {
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
  nodes: Array<Release>;
  from: string;
  to: string;
};

export function filterReleasesNodes(args: FilterReleasesNodes): Array<Release> {
  const { nodes, from, to } = args;

  return nodes.filter(
    (node) => semver.gte(node.name, from) && semver.lte(node.name, to)
  );
}
