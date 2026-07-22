import { env } from '@/lib/env';
import {
  SPOTIFY_LOCAL_REDIRECT_URI,
  SPOTIFY_OAUTH_STATE_COOKIE,
  createSpotifyAuthorizeUrl,
  getSpotifyOAuthCredentials,
} from '@/lib/spotify-oauth';

import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  if (env.nodeEnv === 'production') {
    return new NextResponse(null, {
      status: 404,
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  }

  try {
    getSpotifyOAuthCredentials();

    const state = crypto.randomUUID();
    const response = NextResponse.redirect(
      createSpotifyAuthorizeUrl(state, SPOTIFY_LOCAL_REDIRECT_URI),
    );

    response.cookies.set({
      name: SPOTIFY_OAUTH_STATE_COOKIE,
      value: state,
      httpOnly: true,
      sameSite: 'lax',
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
