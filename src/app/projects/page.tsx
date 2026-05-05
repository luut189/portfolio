import ProjectLiveLink from '@/components/project-live-link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { GitHub } from '@/components/ui/icons';
import { projects } from '@/lib/projects';

import Image from 'next/image';
import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <div className='mx-4 flex w-full flex-1 flex-col gap-4'>
      <div className='flex items-center justify-center gap-2'>
        <h1 className='text-xl font-semibold whitespace-nowrap'>Projects</h1>
        <div className='bg-primary h-0.5 flex-1' />
      </div>
      <div className='grid gap-4 md:grid-cols-2'>
        {projects.map((project) => (
          <Card key={project.slug} className='flex h-full flex-col dark:border-none'>
            <CardHeader className='gap-2'>
              <div className='flex items-center justify-between gap-2'>
                <h2 className='text-lg font-semibold'>{project.name}</h2>
                <div className='flex items-center justify-center gap-2'>
                  {project.liveUrl ? (
                    <ProjectLiveLink
                      href={project.liveUrl}
                      projectName={project.name}
                      featured={project.featured}
                    />
                  ) : null}
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
