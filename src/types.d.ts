export type GitHubRepositoryData = {
  name: string;
  owner: string;
};

export type Release = {
  id: string;
  name: string;
  description: string;
};

type ReleasesNodes = {
  nodes: Array<Release>;
};

export type RepositoryReleases = {
  name: string;
  url: string;
  releases?: ReleasesNodes;
};
