import {
  GITHUB_RATE_LIMIT_EXCEEDED_ERROR,
  GITHUB_UNKNOWN_ERROR,
} from '~/global';
import {
  GitHubRateLimit,
  Release,
  Repository,
  RepositoryQueryPayload,
} from '~/models';

function parseHeadersRateLimit(headers: Headers): GitHubRateLimit {
  const limit = parseInt(headers.get('x-ratelimit-limit') || '0', 10);
  const remaining = parseInt(headers.get('x-ratelimit-remaining') || '0', 10);
  const reset = parseInt(headers.get('x-ratelimit-reset') || '0', 10) * 1000;

  return {
    limit,
    remaining,
    reset,
  };
}

export class Api {
  _accessToken?: string;
  _rateLimit?: GitHubRateLimit;

  get rateLimitRemaining(): number {
    return this._rateLimit?.remaining ?? -1;
  }

  get rateLimitWaitingMinutes(): number | undefined {
    const reset = this._rateLimit?.reset;

    if (!reset) {
      return undefined;
    }

    const waitingMs = reset - new Date().getTime();

    if (waitingMs < 0) {
      return 0;
    }

    const waitingSec = waitingMs / 1000;
    return Math.round(waitingSec / 60);
  }

  get isAuth(): boolean {
    return !!this._accessToken;
  }

  async request(uri: string, init?: RequestInit): Promise<any> {
    const finalInit = Object.assign(
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'User-Agent':
            process.env.NODE_ENV === 'production'
              ? 'Octoclairvoyant'
              : 'Test Octoclairvoyant',
          // Authentication: 'token ${token}'
        },
      },
      init
    );

    let response;
    try {
      response = await fetch(`https://api.github.com/${uri}`, finalInit);
    } catch (e) {
      // This is the best way I found to check if rate limit wasn't exceeded
      if (this._rateLimit && this._rateLimit.remaining > 1) {
        throw e;
      }
      throw new Error(GITHUB_RATE_LIMIT_EXCEEDED_ERROR);
    }

    this._rateLimit = parseHeadersRateLimit(response.headers);

    if (response.status >= 200 && response.status < 300) {
      return await response.json();
    }

    throw new Error(response.statusText || GITHUB_UNKNOWN_ERROR);
  }

  readRepo({ owner, name }: RepositoryQueryPayload): Promise<Repository> {
    return this.request(`repos/${owner}/${name}`, { method: 'GET' });
  }

  readRepoReleases({
    owner,
    name,
  }: RepositoryQueryPayload): Promise<Release[]> {
    return this.request(`repos/${owner}/${name}/releases?page=1&per_page=100`, {
      method: 'GET',
    });
  }
}
