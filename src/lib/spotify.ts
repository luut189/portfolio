import { SpotifyOAuthError, refreshSpotifyAccessToken } from '@/lib/spotify-oauth';
import {
  isSpotifyGrantWriteConflict,
  readSpotifyGrant,
  writeSpotifyGrant,
} from '@/lib/spotify-token-store';

import type { SpotifyGrant, StoredSpotifyGrant } from '@/lib/spotify-token-store';

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{
    name: string;
  }>;
  albumArtUrl: string | null;
  externalUrl: string;
}

const SPOTIFY_TOP_TRACKS_REVALIDATE_SECONDS = 300;
const SPOTIFY_RESULT_LIMIT = 5;
const ACCESS_TOKEN_EXPIRY_BUFFER_MS = 60_000;
const MAX_TOKEN_ROTATION_RETRIES = 2;

let cachedAccessToken: { token: string; expiresAt: number } | null = null;
let tokenRefreshPromise: Promise<string> | null = null;

export class SpotifyAuthorizationRequiredError extends Error {
  constructor() {
    super('Spotify authorization is required. Reconnect the account through local development.');
    this.name = 'SpotifyAuthorizationRequiredError';
  }
}

async function getSpotifyToken(forceRefresh = false): Promise<string> {
  const now = Date.now();
  const localAccessToken = cachedAccessToken;

  if (
    !forceRefresh &&
    localAccessToken &&
    localAccessToken.expiresAt > now + ACCESS_TOKEN_EXPIRY_BUFFER_MS
  ) {
    return localAccessToken.token;
  }

  if (tokenRefreshPromise) {
    return tokenRefreshPromise;
  }

  tokenRefreshPromise = resolveSpotifyToken(forceRefresh).finally(() => {
    tokenRefreshPromise = null;
  });

  return tokenRefreshPromise;
}

async function resolveSpotifyToken(forceRefresh: boolean): Promise<string> {
  const stored = await readSpotifyGrant();

  if (!stored) {
    throw new SpotifyAuthorizationRequiredError();
  }

  if (
    !forceRefresh &&
    stored.grant.accessTokenExpiresAt > Date.now() + ACCESS_TOKEN_EXPIRY_BUFFER_MS
  ) {
    cacheAccessToken(stored.grant);
    return stored.grant.accessToken;
  }

  return refreshStoredSpotifyToken(stored);
}

async function refreshStoredSpotifyToken(
  stored: StoredSpotifyGrant,
  attemptedRefreshToken?: string,
  retryCount = 0,
): Promise<string> {
  let tokenSet;

  try {
    tokenSet = await refreshSpotifyAccessToken(stored.grant.refreshToken);
  } catch (error) {
    if (error instanceof SpotifyOAuthError && error.code === 'invalid_grant') {
      const latest = await readSpotifyGrant();

      if (
        latest &&
        latest.grant.refreshToken !== stored.grant.refreshToken &&
        latest.grant.refreshToken !== attemptedRefreshToken &&
        retryCount < MAX_TOKEN_ROTATION_RETRIES
      ) {
        return refreshStoredSpotifyToken(latest, stored.grant.refreshToken, retryCount + 1);
      }

      throw new SpotifyAuthorizationRequiredError();
    }

    throw error;
  }

  const now = Date.now();
  const updatedGrant: SpotifyGrant = {
    ...stored.grant,
    accessToken: tokenSet.accessToken,
    accessTokenExpiresAt: now + tokenSet.expiresIn * 1000,
    refreshToken: tokenSet.refreshToken ?? stored.grant.refreshToken,
    scope: tokenSet.scope || stored.grant.scope,
    updatedAt: new Date(now).toISOString(),
  };

  try {
    await writeSpotifyGrant(updatedGrant, stored.etag);
    cacheAccessToken(updatedGrant);
    return updatedGrant.accessToken;
  } catch (error) {
    if (!isSpotifyGrantWriteConflict(error)) {
      throw error;
    }

    const latest = await readSpotifyGrant();

    if (!latest) {
      throw new SpotifyAuthorizationRequiredError();
    }

    if (latest.grant.accessTokenExpiresAt > Date.now() + ACCESS_TOKEN_EXPIRY_BUFFER_MS) {
      cacheAccessToken(latest.grant);
      return latest.grant.accessToken;
    }

    if (retryCount >= MAX_TOKEN_ROTATION_RETRIES) {
      throw new Error('Spotify token rotation was updated concurrently; retry the request.', {
        cause: error,
      });
    }

    return refreshStoredSpotifyToken(latest, stored.grant.refreshToken, retryCount + 1);
  }
}

function cacheAccessToken(grant: SpotifyGrant) {
  cachedAccessToken = {
    token: grant.accessToken,
    expiresAt: grant.accessTokenExpiresAt,
  };
}

async function fetchSpotify<T>(
  url: string,
  options?: {
    cache?: RequestCache;
    revalidate?: number;
  },
): Promise<T> {
  let token = await getSpotifyToken();
  let response = await requestSpotify(url, token, options);

  if (response.status === 401) {
    cachedAccessToken = null;
    token = await getSpotifyToken(true);
    response = await requestSpotify(url, token, options);
  }

  if (!response.ok) {
    const retryAfter = response.headers.get('Retry-After');
    const retryDetails = retryAfter ? `; retry after ${retryAfter} seconds` : '';
    throw new Error(`Spotify request failed with status ${response.status}${retryDetails}`);
  }

  return response.json() as Promise<T>;
}

function requestSpotify(
  url: string,
  token: string,
  options?: {
    cache?: RequestCache;
    revalidate?: number;
  },
) {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...(options?.cache ? { cache: options.cache } : {}),
    ...(typeof options?.revalidate === 'number'
      ? {
          next: {
            revalidate: options.revalidate,
          },
        }
      : {}),
  });
}

export async function getRecentlyPlayedTracks(): Promise<SpotifyTrack[]> {
  const data = await fetchSpotify<{
    items: Array<{
      track: {
        id: string;
        name: string;
        artists: Array<{
          name: string;
        }>;
        album: {
          images: Array<{
            url: string;
          }>;
        };
        external_urls: {
          spotify: string;
        };
      };
    }>;
  }>('https://api.spotify.com/v1/me/player/recently-played?limit=20', {
    cache: 'no-store',
  });

  const uniqueTracks = Array.from(
    new Map(
      data.items.map(({ track }) => [
        track.id,
        {
          id: track.id,
          name: track.name,
          artists: track.artists,
          albumArtUrl: track.album.images[0]?.url ?? null,
          externalUrl: track.external_urls.spotify,
        } satisfies SpotifyTrack,
      ]),
    ).values(),
  );

  return uniqueTracks.slice(0, SPOTIFY_RESULT_LIMIT);
}

export async function getTopTracks(): Promise<SpotifyTrack[]> {
  const data = await fetchSpotify<{
    items: Array<{
      id: string;
      name: string;
      artists: Array<{
        name: string;
      }>;
      album: {
        images: Array<{
          url: string;
        }>;
      };
      external_urls: {
        spotify: string;
      };
    }>;
  }>('https://api.spotify.com/v1/me/top/tracks?limit=5', {
    revalidate: SPOTIFY_TOP_TRACKS_REVALIDATE_SECONDS,
  });

  return data.items.slice(0, SPOTIFY_RESULT_LIMIT).map((track) => ({
    id: track.id,
    name: track.name,
    artists: track.artists,
    albumArtUrl: track.album.images[0]?.url ?? null,
    externalUrl: track.external_urls.spotify,
  }));
}
