'use client';

import HandDrawnArrow from '@/components/hand-drawn-arrow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { GitHub } from '@/components/ui/icons';
import { projects } from '@/lib/projects';
import { getCookie, setCookie } from '@/lib/utils';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const HINT_SEEN_COOKIE = 'live_hint_seen';

export default function ProjectsPage() {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const seen = getCookie(HINT_SEEN_COOKIE);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowHint(!seen);
  }, []);

  function handleClick() {
    setCookie(HINT_SEEN_COOKIE, 'true');
    setShowHint(false);
  }

  return (
    <div className='mx-4 flex w-full flex-1 flex-col gap-4'>
      <div className='flex items-center justify-center gap-2'>
        <span className='text-xl font-semibold whitespace-nowrap'>Projects</span>
        <div className='bg-primary h-0.5 flex-1' />
      </div>
      <div className='grid gap-4 md:grid-cols-2'>
        {projects.map((project) => (
          <Card key={project.slug} className='flex h-full flex-col dark:border-none'>
            <CardHeader className='gap-2'>
              <div className='flex items-center justify-between gap-2'>
                <h2 className='text-lg font-semibold'>{project.name}</h2>
                <div className='flex items-center justify-center gap-2'>
                  {project.liveUrl && (
                    <div className='relative'>
                      {showHint && project.featured ? (
                        <div className='absolute -top-9 right-13 flex rotate-[8deg] items-start'>
                          <span className='font-handwritten absolute -top-1 right-10 text-lg whitespace-nowrap'>
                            psst, click here
                          </span>
                          <HandDrawnArrow />
                        </div>
                      ) : null}
                      <Button variant='outline' size={'sm'} className='dark:border-none' asChild>
                        <Link
                          href={project.liveUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          onClick={handleClick}
                          aria-label={`Open ${project.name}`}>
                          <div className='inline-block animate-pulse rounded-full bg-emerald-400 p-1 shadow-[0_0_8px_2px_rgba(34,197,94,0.8)]' />
                          <span className='animate-pulse text-xs font-medium text-emerald-500'>
                            Live
                          </span>
                        </Link>
                      </Button>
                    </div>
                  )}
                  <Button variant='outline' size='icon' className='dark:border-none' asChild>
                    <Link
                      href={project.repoUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={`Open ${project.name} repo`}>
                      <GitHub className='h-4 w-4' />
                    </Link>
                  </Button>
                </div>
              </div>
              <p className='text-muted-foreground text-sm'>{project.tagline}</p>
            </CardHeader>
            <CardContent className='flex flex-1 flex-col gap-4'>
              <div className='flex flex-wrap gap-2'>
                {project.stack.map((tech) => {
                  const techStr = tech.replace('.', '').toLowerCase();
                  return (
                    <span
                      key={tech}
                      className='bg-accent text-accent-foreground flex items-center justify-center gap-2 rounded-lg p-2 text-sm'>
                      <Image
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${techStr}/${techStr}-original.svg`}
                        alt=''
                        width={256}
                        height={256}
                        className='h-6 w-6 rounded'
                      />
                      {tech}
                    </span>
                  );
                })}
              </div>
              <Button variant='outline' className='mt-auto dark:border-none' asChild>
                <Link href={`/projects/${project.slug}`}>View details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
