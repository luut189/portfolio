import { getRecentlyPlayedTracks, getTopTracks } from '@/lib/spotify';

import SpotifyClient from './spotify-client';

export default async function SpotifyWidget() {
  const [recentTracks, topTracks] = await Promise.all([getRecentlyPlayedTracks(), getTopTracks()]);

  return <SpotifyClient recentTracks={recentTracks} topTracks={topTracks} />;
}
