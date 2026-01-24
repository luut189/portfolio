import ProjectCarousel from '@/components/project-carousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getProjectBySlug } from '@/lib/projects';

import { ArrowLeft, ArrowUpRight } from 'lucide-react';
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
        <span className='text-xl font-semibold whitespace-nowrap'>{project.name}</span>
        <div className='bg-primary h-0.5 flex-1' />
        <Button variant='outline' size='icon' asChild>
          <Link
            href={project.repoUrl}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`Open ${project.name} repo`}>
            <ArrowUpRight className='h-4 w-4' />
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className='space-y-4 p-6'>
          <ProjectCarousel images={project.images} />
          <p className='text-muted-foreground'>{project.tagline}</p>
          <div className='flex flex-wrap gap-2'>
            {project.stack.map((tech) => (
              <span
                key={tech}
                className='bg-accent text-accent-foreground rounded-full px-2 py-1 text-xs'>
                {tech}
              </span>
            ))}
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
