import Image from 'next/image';

import type { SpotifyTrack } from '@/lib/spotify';

interface SpotifyClientProps {
  recentTracks: SpotifyTrack[];
  topTracks: SpotifyTrack[];
}

export default function SpotifyClient({ recentTracks, topTracks }: SpotifyClientProps) {
  const featuredTrack = recentTracks[0] ?? topTracks[0] ?? null;
  const recentList = recentTracks.filter((track) => track.id !== featuredTrack?.id).slice(0, 3);
  const repeatTrack =
    topTracks.find((track) => track.id !== featuredTrack?.id) ?? topTracks[0] ?? null;

  return (
    <section className='flex flex-col gap-4 p-4 pt-2'>
      <div className='flex items-center justify-between gap-3'>
        <h2 className='text-base font-medium text-muted-foreground'>Listening</h2>
        {featuredTrack ? (
          <a
            href={featuredTrack.externalUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground'>
            open in spotify
          </a>
        ) : null}
      </div>

      {!featuredTrack ? (
        <p className='text-sm text-muted-foreground'>Spotify data is unavailable right now.</p>
      ) : (
        <>
          <div
            className='grid gap-4 md:grid-cols-2 md:gap-6'
            style={{
              gridTemplateColumns: repeatTrack ? undefined : 'minmax(0, 1fr)',
            }}>
            <FeaturedTrack label='just played' track={featuredTrack} />

            {repeatTrack ? (
              <FeaturedTrack label='on repeat this month' track={repeatTrack} />
            ) : null}
          </div>

          <div className='flex flex-col gap-1 pt-1'>
            {recentList.length ? (
              <>
                <p className='text-sm text-muted-foreground'>recently played</p>
                <ol className='flex flex-col'>
                  {recentList.map((track, index) => (
                    <li
                      key={track.id}
                      className='grid grid-cols-[auto_auto_1fr] items-center gap-3 border-b border-border py-2 last:border-b-0'>
                      <span className='text-xs text-muted-foreground tabular-nums'>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <a
                        href={track.externalUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='relative block h-10 w-10 overflow-hidden rounded-md'>
                        <TrackPoster track={track} size='40px' />
                      </a>
                      <div className='min-w-0'>
                        <a
                          href={track.externalUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='block truncate font-medium underline-offset-4 hover:underline'>
                          {track.name}
                        </a>
                        <p className='truncate text-sm text-muted-foreground'>
                          {formatArtists(track)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </>
            ) : null}
          </div>
        </>
      )}

      <p className='text-right font-handwritten text-lg text-muted-foreground'>
        yes, i like j-pop, how did you know?
      </p>
    </section>
  );
}

function formatArtists(track: SpotifyTrack) {
  return track.artists.map((artist) => artist.name).join(', ');
}

function FeaturedTrack({ label, track }: { label: string; track: SpotifyTrack }) {
  return (
    <div className='flex items-start gap-4'>
      <a
        href={track.externalUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='relative block h-20 w-20 shrink-0 overflow-hidden rounded-lg'>
        <TrackPoster track={track} size='80px' />
      </a>
      <div className='flex flex-col gap-1 pt-1'>
        <p className='text-sm text-muted-foreground'>{label}</p>
        <a
          href={track.externalUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='w-fit text-xl font-semibold underline-offset-4 hover:underline'>
          {track.name}
        </a>
        <p className='text-sm text-muted-foreground sm:text-base'>{formatArtists(track)}</p>
      </div>
    </div>
  );
}

function TrackPoster({ track, size }: { track: SpotifyTrack; size: string }) {
  if (!track.albumArtUrl) {
    return <div className='h-full w-full bg-muted' />;
  }

  return (
    <Image
      src={track.albumArtUrl}
      alt={`Album art for ${track.name}`}
      fill
      sizes={size}
      className='object-cover'
    />
  );
}
