import { env } from '@/lib/env';
import {
  SPOTIFY_LOCAL_REDIRECT_URI,
  SPOTIFY_OAUTH_SCOPES,
  SPOTIFY_OAUTH_STATE_COOKIE,
  exchangeSpotifyAuthorizationCode,
  getSpotifyProfile,
} from '@/lib/spotify-oauth';
import { SpotifyAccountMismatchError, saveAuthorizedSpotifyGrant } from '@/lib/spotify-token-store';

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

function createJsonResponse(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}

function clearStateCookie(response: NextResponse) {
  response.cookies.delete(SPOTIFY_OAUTH_STATE_COOKIE);
  return response;
}

export async function GET(request: NextRequest) {
  if (env.nodeEnv === 'production') {
    return new NextResponse(null, {
      status: 404,
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  }

  const stateFromCookie = request.cookies.get(SPOTIFY_OAUTH_STATE_COOKIE)?.value;
  const { searchParams } = request.nextUrl;

  if (searchParams.get('error')) {
    return clearStateCookie(
      createJsonResponse(
        {
          error: 'spotify_authorization_failed',
          details: searchParams.get('error') ?? 'unknown_error',
        },
        400,
      ),
    );
  }

  const state = searchParams.get('state');
  const code = searchParams.get('code');

  if (!stateFromCookie || !state || state !== stateFromCookie) {
    return clearStateCookie(
      createJsonResponse(
        {
          error: 'spotify_state_mismatch',
          details: 'The OAuth state did not match the secure cookie.',
        },
        400,
      ),
    );
  }

  if (!code) {
    return clearStateCookie(
      createJsonResponse(
        {
          error: 'spotify_code_missing',
          details: 'Spotify did not return an authorization code.',
        },
        400,
      ),
    );
  }

  try {
    const tokenSet = await exchangeSpotifyAuthorizationCode(code, SPOTIFY_LOCAL_REDIRECT_URI);

    if (!tokenSet.refreshToken) {
      return clearStateCookie(
        createJsonResponse(
          {
            error: 'spotify_refresh_token_missing',
            details: 'Spotify did not return a refresh token.',
          },
          502,
        ),
      );
    }

    const profile = await getSpotifyProfile(tokenSet.accessToken);
    const now = Date.now();

    await saveAuthorizedSpotifyGrant({
      accountId: profile.accountId,
      displayName: profile.displayName,
      refreshToken: tokenSet.refreshToken,
      accessToken: tokenSet.accessToken,
      accessTokenExpiresAt: now + tokenSet.expiresIn * 1000,
      scope: tokenSet.scope || SPOTIFY_OAUTH_SCOPES.join(' '),
      authorizedAt: new Date(now).toISOString(),
      updatedAt: new Date(now).toISOString(),
    });

    const response = NextResponse.redirect(new URL('/?spotify=connected', request.nextUrl.origin));
    response.headers.set('Cache-Control', 'no-store');
    return clearStateCookie(response);
  } catch (error) {
    const status = error instanceof SpotifyAccountMismatchError ? 403 : 500;

    return clearStateCookie(
      createJsonResponse(
        {
          error:
            error instanceof SpotifyAccountMismatchError
              ? 'spotify_account_mismatch'
              : 'spotify_token_exchange_failed',
          details: error instanceof Error ? error.message : 'Unknown error.',
        },
        status,
      ),
    );
  }
}
