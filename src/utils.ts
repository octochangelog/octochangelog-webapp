import { GitHubRepositoryData } from 'types';

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
