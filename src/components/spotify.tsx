'use client';

import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  spotifyUrl: string;
}

export default function SpotifyWidget() {
  const [recentTracks, setRecentTracks] = useState<SpotifyTrack[] | null>(null);
  useEffect(() => {
    async function fetchRecentlyPlayed() {
      const res = await fetch('/api/spotify/recently-played');
      const data = await res.json();

      setRecentTracks(data.items);
    }

    if (!recentTracks) {
      fetchRecentlyPlayed();
    }
  }, [recentTracks]);

  if (!recentTracks) {
    return (
      <div className='flex h-96 w-full items-center justify-center p-4'>
        <LoaderCircle className='animate-spin' />
      </div>
    );
  }

  return (
    <div className='flex w-full items-center justify-center gap-2 p-4'>
      <iframe
        className='hidden flex-1 rounded-xl md:flex'
        src={`https://open.spotify.com/embed/track/${recentTracks[0].id}?utm_source=generator`}
        width='100%'
        height={352}
        allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
        loading='lazy'
      />
      <div className='flex flex-col items-center justify-center gap-2'>
        <iframe
          className='flex rounded-xl md:hidden'
          src={`https://open.spotify.com/embed/track/${recentTracks[0].id}?utm_source=generator`}
          width='100%'
          height={80}
          allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
          loading='lazy'
        />
        {recentTracks.slice(1).map((track) => (
          <iframe
            key={track.id}
            className='rounded-xl'
            src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`}
            width='100%'
            height={80}
            allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
            loading='lazy'
          />
        ))}
      </div>
    </div>
  );
}
