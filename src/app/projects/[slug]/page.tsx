import ProjectCarousel from '@/components/project-carousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GitHub } from '@/components/ui/icons';
import { getProjectBySlug } from '@/lib/projects';

import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className='mx-4 flex w-full flex-1 flex-col gap-4'>
      <div className='flex items-center justify-center gap-2'>
        <Button variant='ghost' size='icon' asChild>
          <Link href='/projects' aria-label='Back to projects'>
            <ArrowLeft className='h-4 w-4' />
          </Link>
        </Button>
        <h1 className='text-xl font-semibold whitespace-nowrap'>{project.name}</h1>
        <div className='bg-primary h-0.5 flex-1' />
        {project.liveUrl && (
          <Button variant='secondary' asChild>
            <Link
              href={project.liveUrl}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`Open ${project.name}`}>
              <div className='inline-block animate-pulse rounded-full bg-emerald-400 p-1 shadow-[0_0_8px_2px_rgba(34,197,94,0.8)]' />
              <span className='live-text-breathe text-xs font-medium text-emerald-500'>
                Live
              </span>
            </Link>
          </Button>
        )}
        <Button variant='outline' size='icon' asChild>
          <Link
            href={project.repoUrl}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`Open ${project.name} repo`}>
            <GitHub className='h-4 w-4' />
          </Link>
        </Button>
      </div>

      <Card className='dark:border-none'>
        <CardContent className='space-y-4 p-6'>
          <ProjectCarousel images={project.images} />
          <p className='text-muted-foreground'>{project.tagline}</p>
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
                    width={24}
                    height={24}
                    sizes='24px'
                    className='h-6 w-6 rounded'
                  />
                  {tech}
                </span>
              );
            })}
          </div>
          <ul className='space-y-2 text-sm'>
            {project.highlights.map((item, index) => (
              <li key={index} className='ml-4 list-disc'>
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
