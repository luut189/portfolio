import { Button } from '@/components/ui/button';
import { GitHub } from '@/components/ui/icons';
import { type Project, projects } from '@/lib/projects';

import { ArrowRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function StackList({ stack, limit }: { stack: string[]; limit?: number }) {
  const visibleStack = limit ? stack.slice(0, limit) : stack;
  const hiddenCount = limit ? Math.max(stack.length - limit, 0) : 0;

  return (
    <div className='flex flex-wrap gap-2'>
      {visibleStack.map((tech) => {
        const techStr = tech.replace('.', '').toLowerCase();

        return (
          <span
            key={tech}
            className='flex items-center justify-center gap-2 rounded-lg bg-accent p-2 text-sm text-accent-foreground'>
            <Image
              src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${techStr}/${techStr}-original.svg`}
              alt=''
              width={24}
              height={24}
              sizes='24px'
              className='h-6 w-6 rounded'
            />
            {tech}
          </span>
        );
      })}
      {hiddenCount > 0 ? (
        <span className='flex items-center justify-center rounded-lg bg-accent px-3 py-2 text-sm text-muted-foreground'>
          +{hiddenCount}
        </span>
      ) : null}
    </div>
  );
}

function ProjectUtilityLinks({ project }: { project: Project }) {
  return (
    <div className='flex flex-wrap gap-2 md:justify-end'>
      {project.liveUrl ? (
        <Button variant='secondary' asChild>
          <Link
            href={project.liveUrl}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`Open ${project.name}`}>
            <div className='inline-block animate-pulse rounded-full bg-emerald-400 p-1 shadow-[0_0_8px_2px_rgba(34,197,94,0.8)]' />
            <span className='live-text-breathe text-xs font-medium text-emerald-500'>Live</span>
            <ExternalLink className='h-4 w-4' />
          </Link>
        </Button>
      ) : null}
      <Button variant='outline' asChild>
        <Link
          href={project.repoUrl}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`Open ${project.name} repo`}>
          <GitHub className='h-4 w-4' />
          Repo
        </Link>
      </Button>
    </div>
  );
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <article className='grid gap-4 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:grid-rows-[auto_1fr]'>
      <div className='space-y-3'>
        <div className='space-y-1'>
          <div className='flex flex-wrap items-center gap-2'>
            <h2 className='text-xl font-semibold'>{project.name}</h2>
            {project.featured ? (
              <span className='rounded-md bg-accent px-2 py-1 text-xs font-medium text-muted-foreground'>
                Featured
              </span>
            ) : null}
          </div>
          <p className='text-sm font-medium text-muted-foreground'>{project.tagline}</p>
        </div>
        <p className='max-w-3xl text-sm leading-6 text-muted-foreground'>
          {project.caseStudy?.summary ?? project.highlights[0]}
        </p>
        <StackList stack={project.stack} limit={6} />
      </div>

      <div className='md:justify-self-end'>
        <ProjectUtilityLinks project={project} />
      </div>

      <Button className='md:col-start-2 md:row-start-2 md:self-end md:justify-self-end' asChild>
        <Link href={`/projects/${project.slug}`}>
          Details
          <ArrowRight className='h-4 w-4' />
        </Link>
      </Button>
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <main className='mx-4 flex w-full flex-1 flex-col gap-6 pb-8'>
      <div className='flex items-center justify-center gap-2'>
        <h1 className='text-xl font-semibold whitespace-nowrap'>Projects</h1>
        <div className='h-0.5 flex-1 bg-primary' />
      </div>

      <section className='space-y-4'>
        <div className='divide-y divide-border'>
          {projects.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
