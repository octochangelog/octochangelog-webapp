import { Parent } from 'unist';
import React from 'react';

export type HookReturnValue<T> = [T, React.Dispatch<T>];

export interface RepositoryInfo {
  name: string;
  url: string;
}

export type RepositoryQueryVars = {
  name: string;
  owner: string;
};

export interface RepositoryResponse extends RepositoryInfo {
  releases: ReleasesConnection;
}

export type ReleasesConnection = {
  edges: ReleaseEdge[];
};

export type ReleaseEdge = {
  node: Release;
};

export interface Repository extends RepositoryInfo {
  releases: Release[];
}

export interface Release {
  id: string;
  description: string;
  tagName: string;
  isDraft: boolean;
  isPrerelease: boolean;
}

export type VersionRange = [string, string];

// FIXME: generate proper types for processed release
export type ProcessedReleasesCollection = any;

export interface ProcessedReleaseChange extends Omit<Release, 'description'> {
  title: string;
  originalTitle: string;
  // level: enumerate with error, warning, info or unknown
  descriptionMdast: Parent;
}
