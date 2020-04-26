import semver from 'semver';
import { RepositoryQueryVars, Release } from 'models';
import title from 'title';
import { createHash, randomBytes } from 'crypto';

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

const customTitleSpecials: string[] = ['DOM'];

export function getRepositoryNameDisplay(repoName: string): string {
  return title(repoName.replace(/[_-]/g, ' '), {
    special: customTitleSpecials,
  });
}

/**
 * Helper for auth0 code verifier.
 */
function base64UrlEncode(buffer: Buffer): string {
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Helper for auth0 code challenge
 */
function sha256(str: string): Buffer {
  return createHash('sha256').update(str).digest();
}

export const codeVerifier = base64UrlEncode(randomBytes(32));
export const codeChallenge = base64UrlEncode(sha256(codeVerifier));
