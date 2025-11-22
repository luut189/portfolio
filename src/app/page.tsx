'use client';

import AboutMe from '@/components/about-me';
import SpotifyWidget from '@/components/spotify';

export default function Homepage() {
  return (
    <div className='mx-4 flex w-full flex-1 flex-col gap-2'>
      <section>
        <AboutMe />
      </section>
      <section>
        <SpotifyWidget />
      </section>
    </div>
  );
}
