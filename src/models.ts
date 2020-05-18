import React from 'react';
import { Parent } from 'unist';

declare global {
  interface Window {
    gtag: Function;
  }
}

export type HookReturnValue<T> = [T, React.Dispatch<T>];

export interface Repository {
  name: string;
  url: string;
}

export type RepositoryQueryPayload = {
  name: string;
  owner: string;
};

export type ReleaseEdge = {
  node: Release;
};

export interface Release {
  id: string;
  body: string;
  tag_name: string;
  draft: boolean;
  prerelease: boolean;
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

export enum SemVerGroupTitles {
  breakingChanges = 'breaking changes',
  features = 'features',
  bugFixes = 'bug fixes',
}

export enum MiscGroupTitles {
  unknown = 'others',
  artifacts = 'artifacts',
  thanks = 'thanks',
  credits = 'credits',
}

export interface GitHubRateLimit {
  limit: number;
  remaining: number;
  reset: number;
}
