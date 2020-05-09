import { MiscGroupTitles, SemVerGroupTitles } from '~/models';

export const globalStyles = {
  html: { height: '100%' },
  body: { height: '100%' },
  '#__next': { height: '100%' },
};

export const REPO_URL = 'https://github.com/Belco90/octoclairvoyant';

export const GITHUB_COOKIE_KEY = 'gh-access-token';

export const APP_MOTTO =
  'Filter and group GitHub repositories releases to compare changes with ease';

export const HIGH_PRIORITY_GROUP_TITLES: string[] = [
  SemVerGroupTitles.breakingChanges,
  SemVerGroupTitles.features,
  SemVerGroupTitles.bugFixes,
];

export const LOW_PRIORITY_GROUP_TITLES: string[] = [
  MiscGroupTitles.unknown,
  MiscGroupTitles.credits,
  MiscGroupTitles.thanks,
  MiscGroupTitles.artifacts,
];
