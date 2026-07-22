import { getRecentlyPlayedTracks, getTopTracks } from '@/lib/spotify';

import { connection } from 'next/server';

import SpotifyClient from './spotify-client';

import type { SpotifyTrack } from '@/lib/spotify';

export default async function SpotifyWidget() {
  await connection();

  let recentTracks: SpotifyTrack[] = [];
  let topTracks: SpotifyTrack[] = [];

  try {
    [recentTracks, topTracks] = await Promise.all([getRecentlyPlayedTracks(), getTopTracks()]);
  } catch {
    recentTracks = [];
    topTracks = [];
  }

  return <SpotifyClient recentTracks={recentTracks} topTracks={topTracks} />;
}
