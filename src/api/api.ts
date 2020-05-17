import { Release, Repository, RepositoryQueryPayload } from '~/models';

export class Api {
  accessToken = null;

  doFetch(uri: string, init?: RequestInit): Promise<any> {
    const finalInit = Object.assign(
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          // Authentication: 'Bearer ${token}'
        },
      },
      init
    );
    return fetch(`https://api.github.com/${uri}`, finalInit).then((resp) =>
      resp.json()
    );
  }

  readRepo({ owner, name }: RepositoryQueryPayload): Promise<Repository> {
    return this.doFetch(`repos/${owner}/${name}`);
  }

  readRepoReleases({
    owner,
    name,
  }: RepositoryQueryPayload): Promise<Release[]> {
    return this.doFetch(`repos/${owner}/${name}/releases?page=1&per_page=100`);
  }
}
