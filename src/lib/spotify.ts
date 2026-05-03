import { cache } from 'react';

export interface SpotifyTrack {
  id: string;
}

const SPOTIFY_REVALIDATE_SECONDS = 300;
const SPOTIFY_RESULT_LIMIT = 5;

const getSpotifyToken = cache(async (): Promise<string | null> => {
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!refreshToken || !clientId || !clientSecret) {
    return null;
  }

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
  });

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!tokenRes.ok) {
    throw new Error(`Spotify token request failed with status ${tokenRes.status}`);
  }

  const data = (await tokenRes.json()) as { access_token?: string };
  return data.access_token ?? null;
});

async function fetchSpotify<T>(url: string): Promise<T> {
  const token = await getSpotifyToken();

  if (!token) {
    throw new Error('Spotify credentials are not configured');
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: SPOTIFY_REVALIDATE_SECONDS,
    },
  });

  if (!response.ok) {
    throw new Error(`Spotify request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getRecentlyPlayedTracks(): Promise<SpotifyTrack[]> {
  const data = await fetchSpotify<{
    items: Array<{
      track: SpotifyTrack;
    }>;
  }>('https://api.spotify.com/v1/me/player/recently-played?limit=20');

  const uniqueTracks = Array.from(
    new Map(data.items.map(({ track }) => [track.id, track])).values(),
  );

  return uniqueTracks.slice(0, SPOTIFY_RESULT_LIMIT);
}

export async function getTopTracks(): Promise<SpotifyTrack[]> {
  const data = await fetchSpotify<{
    items: SpotifyTrack[];
  }>('https://api.spotify.com/v1/me/top/tracks?limit=5');

  return data.items.slice(0, SPOTIFY_RESULT_LIMIT);
}
