export type RepositoryQueryVars = {
  name: string;
  owner: string;
};

export type RepositoryResponse = {
  name: string;
  url: string;
  releases: ReleasesConnection;
};

export type ReleasesConnection = {
  edges: ReleaseEdge[];
};

export type ReleaseEdge = {
  node: Release;
};

export type Repository = Omit<RepositoryResponse, 'releases'> & {
  releases: Release[];
};

export type Release = {
  id: string;
  description: string;
  tagName: string;
  isDraft: boolean;
  isPrerelease: boolean;
};

export type VersionRange = [string, string];

// FIXME: generate proper types for processed release
export type ProcessedReleasesCollection = any;

export type ProcessedRelease = any;
