import { env } from '@/lib/env';
import {
  SPOTIFY_OAUTH_STATE_COOKIE,
  createSpotifyAuthorizeUrl,
  getSpotifyOAuthCredentials,
} from '@/lib/spotify-oauth';

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    getSpotifyOAuthCredentials();

    const state = crypto.randomUUID();
    const redirectUri = new URL('/api/spotify/callback', request.nextUrl.origin).toString();
    const response = NextResponse.redirect(createSpotifyAuthorizeUrl(state, redirectUri));

    response.cookies.set({
      name: SPOTIFY_OAUTH_STATE_COOKIE,
      value: state,
      httpOnly: true,
      sameSite: 'lax',
      secure: env.nodeEnv === 'production',
      maxAge: 60 * 10,
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to start Spotify OAuth flow.',
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    );
  }
}
