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
        <h2 className='text-muted-foreground text-base font-medium'>Listening</h2>
      </div>
      <div className='grid gap-4 md:grid-cols-2 md:gap-6'>
        {[0, 1].map((item) => (
          <div key={item} className='flex items-start gap-4'>
            <div className='bg-muted h-20 w-20 shrink-0 animate-pulse rounded-lg' />
            <div className='flex flex-1 flex-col gap-2 pt-1'>
              <div className='bg-muted h-4 w-24 animate-pulse rounded' />
              <div className='bg-muted h-6 w-2/3 animate-pulse rounded' />
              <div className='bg-muted h-4 w-1/2 animate-pulse rounded' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
