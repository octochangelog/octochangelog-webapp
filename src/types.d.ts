export type GitHubRepositoryData = {
  name: string;
  owner: string;
};

export type Release = {
  id: string;
  description: string;
  tagName: string;
  isDraft: boolean;
  isPrerelease: boolean;
};

type ReleasesNodes = {
  nodes: Array<Release>;
};

export type RepositoryReleases = {
  name: string;
  url: string;
  releases: ReleasesNodes;
};

export type VersionRange = [string, string];
