import { getSpotifyEnvironment } from '@/lib/env';

const SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_PROFILE_URL = 'https://api.spotify.com/v1/me';

export const SPOTIFY_OAUTH_STATE_COOKIE = 'spotify_oauth_state';
export const SPOTIFY_OAUTH_SCOPES = ['user-read-recently-played', 'user-top-read'];

interface SpotifyOAuthCredentials {
  clientId: string;
  clientSecret: string;
}

interface SpotifyTokenResponse {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  scope?: string;
  error?: string;
  error_description?: string;
}

export interface SpotifyTokenSet {
  accessToken: string;
  refreshToken: string | null;
  expiresIn: number;
  scope: string;
}

export interface SpotifyProfile {
  accountId: string;
  displayName: string | null;
}

export class SpotifyOAuthError extends Error {
  constructor(
    message: string,
    readonly code: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'SpotifyOAuthError';
  }
}

export function getSpotifyOAuthCredentials(): SpotifyOAuthCredentials {
  return getSpotifyEnvironment();
}

export function createSpotifyAuthorizeUrl(state: string, redirectUri: string): string {
  const { clientId } = getSpotifyOAuthCredentials();
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: SPOTIFY_OAUTH_SCOPES.join(' '),
    state,
    show_dialog: 'true',
  });

  return `${SPOTIFY_AUTHORIZE_URL}?${params.toString()}`;
}

export async function exchangeSpotifyAuthorizationCode(
  code: string,
  redirectUri: string,
): Promise<SpotifyTokenSet> {
  const body = new URLSearchParams({
    code,
    grant_type: 'authorization_code',
    redirect_uri: redirectUri,
  });

  return requestSpotifyToken(body);
}

export async function refreshSpotifyAccessToken(refreshToken: string): Promise<SpotifyTokenSet> {
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  return requestSpotifyToken(body);
}

export async function getSpotifyProfile(accessToken: string): Promise<SpotifyProfile> {
  const response = await fetch(SPOTIFY_PROFILE_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new SpotifyOAuthError(
      `Spotify profile request failed with status ${response.status}`,
      'profile_request_failed',
      response.status,
    );
  }

  const profile = (await response.json()) as {
    account_id?: string;
    id?: string;
    display_name?: string | null;
  };
  const accountId = profile.account_id ?? profile.id;

  if (!accountId) {
    throw new SpotifyOAuthError(
      'Spotify did not return an account identifier.',
      'profile_id_missing',
      502,
    );
  }

  return {
    accountId,
    displayName: profile.display_name ?? null,
  };
}

async function requestSpotifyToken(body: URLSearchParams): Promise<SpotifyTokenSet> {
  const { clientId, clientSecret } = getSpotifyOAuthCredentials();
  const authorization = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${authorization}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
    cache: 'no-store',
  });
  const data = (await response.json()) as SpotifyTokenResponse;

  if (!response.ok) {
    const code = data.error ?? 'token_request_failed';
    const details = data.error_description ?? `status ${response.status}`;
    throw new SpotifyOAuthError(`Spotify token request failed: ${details}`, code, response.status);
  }

  if (!data.access_token || !data.expires_in) {
    throw new SpotifyOAuthError(
      'Spotify returned an incomplete token response.',
      'invalid_token_response',
      502,
    );
  }

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? null,
    expiresIn: data.expires_in,
    scope: data.scope ?? '',
  };
}
