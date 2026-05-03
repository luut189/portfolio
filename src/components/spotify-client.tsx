'use client';

import { cn } from '@/lib/utils';

import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

import type { SpotifyTrack } from '@/lib/spotify';

interface SpotifyClientProps {
  recentTracks: SpotifyTrack[];
  topTracks: SpotifyTrack[];
}

export default function SpotifyClient({ recentTracks, topTracks }: SpotifyClientProps) {
  return (
    <>
      <Tabs defaultValue='recent'>
        <div className='flex w-full flex-col items-center justify-center gap-2 md:flex-row'>
          <div className='flex w-full items-center justify-center gap-2'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src='https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png' />
              <AvatarFallback>Spotify</AvatarFallback>
            </Avatar>
            <div className='text-xl font-semibold whitespace-nowrap'>
              <TabsContent value='recent'>Just Played</TabsContent>
              <TabsContent value='top'>#1 Track this Month</TabsContent>
            </div>
            <div className='bg-primary h-0.5 flex-1' />
          </div>
          <TabsList className='ml-auto flex items-center justify-center gap-2 bg-transparent'>
            <TabsTrigger
              value='recent'
              className='dark:hover:text-accent-foreground hover:text-accent-foreground hover:bg-accent dark:data-[state=active]:bg-accent/60 cursor-pointer border-none'>
              Recently Played
            </TabsTrigger>
            <TabsTrigger
              value='top'
              className='dark:hover:text-accent-foreground hover:text-accent-foreground hover:bg-accent dark:data-[state=active]:bg-accent/60 cursor-pointer border-none'>
              Top Tracks
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value='recent'>
          <TrackDisplay tracks={recentTracks} />
        </TabsContent>
        <TabsContent value='top'>
          <TrackDisplay tracks={topTracks} />
        </TabsContent>
      </Tabs>

      <p className='text-muted-foreground px-4 text-right text-sm'>
        yes, i like j-pop, how did you know?
      </p>
    </>
  );
}

function TrackDisplay({ tracks }: { tracks: SpotifyTrack[] }) {
  const [loadedCount, setLoadedCount] = useState(0);

  if (!tracks.length) {
    return (
      <div className='flex h-[464px] w-full items-center justify-center p-4 md:h-96'>
        <p className='text-muted-foreground text-sm'>Spotify data is unavailable right now.</p>
      </div>
    );
  }

  const allLoaded = loadedCount >= tracks.length;

  return (
    <>
      <div
        className={cn('flex h-[464px] w-full items-center justify-center p-4 md:h-96', {
          hidden: allLoaded,
        })}>
        <LoaderCircle className='h-10 w-10 animate-spin' />
      </div>

      <div
        className={cn(
          'flex w-full items-center justify-center gap-2 p-4 transition-opacity duration-300',
          {
            'pointer-events-none absolute h-0 w-0 opacity-0': !allLoaded,
            'opacity-100': allLoaded,
          },
        )}>
        <iframe
          onLoad={() => setLoadedCount((current) => current + 1)}
          className='hidden w-1/2 rounded-xl transition-opacity duration-300 md:flex'
          src={`https://open.spotify.com/embed/track/${tracks[0].id}?utm_source=generator`}
          width='100%'
          height={352}
          allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
        />

        <div className='flex flex-1 flex-col items-center justify-center gap-2'>
          {tracks.map((track, index) => (
            <iframe
              key={`${track.id}-${index}`}
              onLoad={() => setLoadedCount((current) => current + 1)}
              style={{
                transitionDelay: allLoaded ? `${100 + index * 100}ms` : '0ms',
              }}
              className={cn('rounded-xl transition-[opacity,transform] duration-500 ease-out', {
                'translate-y-0 opacity-100': allLoaded,
                'translate-y-[15px] opacity-0': !allLoaded,
                'block md:hidden': index === 0,
              })}
              src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`}
              width='100%'
              height={80}
              allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
            />
          ))}
        </div>
      </div>
    </>
  );
}
