import { getRepositoryDataFromUrl } from 'utils';

describe('getRepositoryDataFromUrl function', () => {
  it.each`
    url                                                         | expectedOwner        | expectedName
    ${'https://github.com/some_repo-owner/some-repo_name'}      | ${'some_repo-owner'} | ${'some-repo_name'}
    ${'Https://github.com/Some_repo-owner/some-Repo_name'}      | ${'Some_repo-owner'} | ${'some-Repo_name'}
    ${'http://github.com/some_repo-owner/some-repo_name'}       | ${'some_repo-owner'} | ${'some-repo_name'}
    ${'http://www.github.com/some_repo-owner/some-repo_name'}   | ${'some_repo-owner'} | ${'some-repo_name'}
    ${'https://github.com/some_repo-owner/some-repo_name.git'}  | ${'some_repo-owner'} | ${'some-repo_name'}
    ${'http://github.com/some_repo-owner/some-repo_name.git'}   | ${'some_repo-owner'} | ${'some-repo_name'}
    ${'git@github.com:some_repo-owner/some-repo_name.git'}      | ${'some_repo-owner'} | ${'some-repo_name'}
    ${'https://github.com/Belco90/github-compare-releases'}     | ${'Belco90'}         | ${'github-compare-releases'}
    ${'http://github.com/Belco90/github-compare-releases'}      | ${'Belco90'}         | ${'github-compare-releases'}
    ${'http://www.github.com/Belco90/github-compare-releases'}  | ${'Belco90'}         | ${'github-compare-releases'}
    ${'https://github.com/Belco90/github-compare-releases.git'} | ${'Belco90'}         | ${'github-compare-releases'}
    ${'http://github.com/Belco90/github-compare-releases.git'}  | ${'Belco90'}         | ${'github-compare-releases'}
    ${'git@github.com:Belco90/github-compare-releases.git'}     | ${'Belco90'}         | ${'github-compare-releases'}
    ${'https://github.com/zeit/next.js'}                        | ${'zeit'}            | ${'next.js'}
    ${'https://github.com/zeit/next.js'}                        | ${'zeit'}            | ${'next.js'}
    ${'https://github.com/zeit/next.js.git'}                    | ${'zeit'}            | ${'next.js'}
    ${'git@github.com:zeit/next.js.git'}                        | ${'zeit'}            | ${'next.js'}
  `(
    'should return data from valid url "$url"',
    ({ url, expectedName, expectedOwner }) => {
      const result = getRepositoryDataFromUrl(url);

      expect(result).toEqual({
        name: expectedName,
        owner: expectedOwner,
      });
    }
  );

  it.each([
    'https://mario.dev',
    'https://mario.dev/some_repo-owner/some-repo_name',
    'github.com/some_repo-owner/some-repo_name',
    'www.github.com/some_repo-owner/some-repo_name',
    'asd',
    '11982',
  ])('should return null from invalid url "%s"', (url) => {
    const result = getRepositoryDataFromUrl(url);
    expect(result).toBeNull();
  });
});
