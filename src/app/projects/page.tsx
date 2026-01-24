import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { projects } from '@/lib/projects';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <div className='mx-4 flex w-full flex-1 flex-col gap-4'>
      <div className='flex items-center justify-center gap-2'>
        <span className='text-xl font-semibold whitespace-nowrap'>Projects</span>
        <div className='bg-primary h-0.5 flex-1' />
      </div>
      <div className='grid gap-4 md:grid-cols-2'>
        {projects.map((project) => (
          <Card key={project.slug} className='flex h-full flex-col'>
            <CardHeader className='gap-2'>
              <div className='flex items-center justify-between gap-2'>
                <h2 className='text-lg font-semibold'>{project.name}</h2>
                <Button variant='ghost' size='icon' asChild>
                  <Link
                    href={project.repoUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={`Open ${project.name} repo`}>
                    <ArrowUpRight className='h-4 w-4' />
                  </Link>
                </Button>
              </div>
              <p className='text-muted-foreground text-sm'>{project.tagline}</p>
            </CardHeader>
            <CardContent className='flex flex-1 flex-col gap-4'>
              <div className='flex flex-wrap gap-2'>
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className='bg-accent text-accent-foreground rounded-full px-2 py-1 text-xs'>
                    {tech}
                  </span>
                ))}
              </div>
              <ul className='text-sm'>
                {project.highlights.map((item, index) => (
                  <li key={index} className='ml-4 list-disc'>
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant='outline' className='mt-auto' asChild>
                <Link href={`/projects/${project.slug}`}>View details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
