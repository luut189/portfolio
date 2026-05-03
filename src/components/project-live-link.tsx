'use client';

import { Button } from '@/components/ui/button';
import { getCookie, setCookie } from '@/lib/utils';

import Link from 'next/link';
import { useState, useSyncExternalStore } from 'react';

import HandDrawnArrow from './hand-drawn-arrow';

const HINT_SEEN_COOKIE = 'live_hint_seen';

interface ProjectLiveLinkProps {
  href: string;
  projectName: string;
  featured: boolean;
}

function subscribe() {
  return () => {};
}

export default function ProjectLiveLink({ href, projectName, featured }: ProjectLiveLinkProps) {
  const [dismissed, setDismissed] = useState(false);
  const hasSeenHint = useSyncExternalStore(
    subscribe,
    () => !!getCookie(HINT_SEEN_COOKIE),
    () => false,
  );
  const showHint = featured && !hasSeenHint && !dismissed;

  function handleClick() {
    setCookie(HINT_SEEN_COOKIE, 'true');
    setDismissed(true);
  }

  return (
    <div className='relative'>
      {showHint ? (
        <div className='absolute -top-9 right-13 flex rotate-[8deg] items-start'>
          <span className='font-handwritten absolute -top-1 right-10 text-lg whitespace-nowrap'>
            psst, click here
          </span>
          <HandDrawnArrow />
        </div>
      ) : null}
      <Button variant='outline' size='sm' className='dark:border-none' asChild>
        <Link
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          onClick={handleClick}
          aria-label={`Open ${projectName}`}>
          <div className='inline-block animate-pulse rounded-full bg-emerald-400 p-1 shadow-[0_0_8px_2px_rgba(34,197,94,0.8)]' />
          <span className='animate-pulse text-xs font-medium text-emerald-500'>Live</span>
        </Link>
      </Button>
    </div>
  );
}
