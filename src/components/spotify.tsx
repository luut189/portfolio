import { getRecentlyPlayedTracks, getTopTracks } from '@/lib/spotify';

import SpotifyClient from './spotify-client';

import type { SpotifyTrack } from '@/lib/spotify';

export default async function SpotifyWidget() {
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
