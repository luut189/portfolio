import AboutMe from '@/components/about-me';
import SpotifyWidget from '@/components/spotify';

import { Suspense } from 'react';

export default function Homepage() {
  return (
    <div className='mx-4 flex w-full flex-1 flex-col gap-2'>
      <section>
        <AboutMe />
      </section>
      <section>
        <Suspense fallback={<SpotifyFallback />}>
          <SpotifyWidget />
        </Suspense>
      </section>
    </div>
  );
}

function SpotifyFallback() {
  return (
    <div className='flex flex-col gap-4 p-4 pt-2'>
      <div className='flex items-center justify-between gap-3'>
        <h2 className='text-base font-medium text-muted-foreground'>Listening</h2>
        <div className='h-4 w-24 animate-pulse rounded bg-muted' />
      </div>

      <div className='grid gap-4 md:grid-cols-2 md:gap-6'>
        {[0, 1].map((item) => (
          <div key={item} className='flex items-start gap-4'>
            <div className='h-20 w-20 shrink-0 animate-pulse rounded-lg bg-muted' />

            <div className='flex flex-1 flex-col gap-2 pt-1'>
              <div className='h-4 w-24 animate-pulse rounded bg-muted' />
              <div className='h-6 w-2/3 animate-pulse rounded bg-muted' />
              <div className='h-4 w-1/2 animate-pulse rounded bg-muted' />
            </div>
          </div>
        ))}
      </div>

      <div className='flex flex-col gap-1 pt-1'>
        <div className='h-4 w-28 animate-pulse rounded bg-muted' />

        <ol className='flex flex-col'>
          {[0, 1, 2].map((item) => (
            <li
              key={item}
              className='grid grid-cols-[auto_auto_1fr] items-center gap-3 border-b border-border py-2 last:border-b-0'>
              <div className='h-3 w-4 animate-pulse rounded bg-muted' />
              <div className='h-10 w-10 animate-pulse rounded-md bg-muted' />

              <div className='flex min-w-0 flex-col gap-2'>
                <div className='h-4 w-2/3 animate-pulse rounded bg-muted' />
                <div className='h-4 w-1/2 animate-pulse rounded bg-muted' />
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className='ml-auto flex w-64 max-w-full flex-col items-end gap-2'>
        <div className='h-5 w-full animate-pulse rounded bg-muted' />
        <div className='h-5 w-2/3 animate-pulse rounded bg-muted' />
      </div>
    </div>
  );
}
