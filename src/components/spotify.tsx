'use client';

import { cn } from '@/lib/utils';

import { motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface SpotifyTrack {
  id: string;
}

export default function SpotifyWidget() {
  return (
    <>
      <Tabs defaultValue='recent'>
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
          <TabsList className='flex items-center justify-center gap-2 bg-transparent'>
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
          <TrackDisplay apiUrl='/api/spotify/recently-played' />
        </TabsContent>
        <TabsContent value='top'>
          <TrackDisplay apiUrl='/api/spotify/top-track' />
        </TabsContent>
      </Tabs>

      <p className='text-muted-foreground px-4 text-right text-sm'>
        yes, i like j-pop, how did you know?
      </p>
    </>
  );
}

interface TrackDisplayProps {
  apiUrl: string;
}

function TrackDisplay({ apiUrl }: TrackDisplayProps) {
  const [tracks, setTracks] = useState<SpotifyTrack[] | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    async function fetchTracks() {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setTracks(data.items);
    }

    if (!tracks) fetchTracks();
  }, [apiUrl, tracks]);

  if (!tracks) {
    return (
      <div className='flex h-96 w-full items-center justify-center p-4'>
        <LoaderCircle className='h-10 w-10 animate-spin' />
      </div>
    );
  }

  const allLoaded = loadedCount >= tracks.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: allLoaded ? 1 : 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className='flex w-full items-center justify-center gap-2 p-4'>
      <iframe
        onLoad={() => setLoadedCount((c) => c + 1)}
        className='hidden w-1/2 rounded-xl md:flex'
        src={`https://open.spotify.com/embed/track/${tracks[0].id}?utm_source=generator`}
        width='100%'
        height={352}
        allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
        loading='lazy'
      />

      <div className='flex flex-1 flex-col items-center justify-center gap-2'>
        {tracks.map((track, i) => (
          <motion.iframe
            key={track.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: allLoaded ? 1 : 0,
              y: allLoaded ? 0 : 15,
            }}
            transition={{
              duration: 0.5,
              delay: allLoaded ? 0.1 + i * 0.1 : 0,
            }}
            onLoad={() => setLoadedCount((c) => c + 1)}
            className={cn('rounded-xl', { 'block md:hidden': i === 0 })}
            src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`}
            width='100%'
            height={80}
            allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
            loading='lazy'
          />
        ))}
      </div>
    </motion.div>
  );
}
