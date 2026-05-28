import { Button } from '@/components/ui/button';
import { GitHub } from '@/components/ui/icons';
import { getProjectBySlug } from '@/lib/projects';

import { ArrowLeft, ExternalLink } from 'lucide-react';
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

  const images = project.images?.filter((image) => image.src) ?? [];
  const primaryImage = images[0];

  return (
    <main className='mx-4 flex w-full flex-1 flex-col gap-6 pb-8'>
      <div className='flex items-center justify-center gap-2'>
        <Button variant='ghost' size='icon' asChild>
          <Link href='/projects' aria-label='Back to projects'>
            <ArrowLeft className='h-4 w-4' />
          </Link>
        </Button>
        <p className='text-xl font-semibold whitespace-nowrap'>Project</p>
        <div className='bg-primary h-0.5 flex-1' />
      </div>

      <section className='grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end'>
        <div className='space-y-3'>
          <p className='text-muted-foreground text-sm font-medium'>{project.tagline}</p>
          <h1 className='text-4xl leading-tight font-semibold tracking-normal md:text-5xl'>
            {project.name}
          </h1>
          <p className='text-muted-foreground max-w-3xl text-base leading-7'>
            {project.caseStudy?.summary ?? project.highlights[0]}
          </p>
        </div>

        <div className='flex flex-wrap gap-2 lg:justify-end'>
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
      </section>

      {primaryImage ? (
        <figure className='bg-card overflow-hidden rounded-xl border shadow-sm dark:border-none'>
          <div className='bg-accent relative aspect-[16/10] w-full md:aspect-[16/9]'>
            <Image
              src={primaryImage.src}
              alt={primaryImage.alt}
              fill
              className='object-cover object-top'
              sizes='(min-width: 1024px) 960px, calc(100vw - 2rem)'
              priority
            />
          </div>
          {primaryImage.caption ? (
            <figcaption className='text-muted-foreground border-t px-4 py-3 text-sm'>
              {primaryImage.caption}
            </figcaption>
          ) : null}
        </figure>
      ) : null}

      <section className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]'>
        <div className='space-y-6'>
          {project.caseStudy ? (
            <>
              <section className='rounded-xl border p-5 shadow-sm dark:border-none'>
                <h2 className='text-lg font-semibold'>Role</h2>
                <p className='text-muted-foreground mt-2 leading-7'>{project.caseStudy.role}</p>
              </section>

              {project.caseStudy.sections.map((section) => (
                <section
                  key={section.title}
                  className='rounded-xl border p-5 shadow-sm dark:border-none'>
                  <div className='max-w-3xl space-y-2'>
                    <h2 className='text-lg font-semibold'>{section.title}</h2>
                    <p className='text-muted-foreground leading-7'>{section.body}</p>
                  </div>
                  <ul className='mt-4 space-y-3 text-sm leading-6'>
                    {section.points.map((point) => (
                      <li key={point} className='flex gap-3'>
                        <span className='bg-primary mt-2 h-1.5 w-1.5 shrink-0 rounded-full' />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </>
          ) : (
            <section className='rounded-xl border p-5 shadow-sm dark:border-none'>
              <h2 className='text-lg font-semibold'>Highlights</h2>
              <ul className='mt-4 space-y-3 text-sm leading-6'>
                {project.highlights.map((item) => (
                  <li key={item} className='flex gap-3'>
                    <span className='bg-primary mt-2 h-1.5 w-1.5 shrink-0 rounded-full' />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {images.length > 1 ? (
            <section className='space-y-3'>
              <h2 className='text-lg font-semibold'>Screens</h2>
              <div className='grid gap-4'>
                {images.slice(1).map((image) => (
                  <figure
                    key={image.src}
                    className='bg-card overflow-hidden rounded-xl border shadow-sm dark:border-none'>
                    <div className='bg-accent relative aspect-[16/10]'>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className='object-cover object-top'
                        loading='eager'
                        sizes='(min-width: 1024px) 640px, calc(100vw - 2rem)'
                      />
                    </div>
                    {image.caption ? (
                      <figcaption className='text-muted-foreground border-t px-4 py-3 text-sm'>
                        {image.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className='space-y-4 lg:sticky lg:top-6 lg:self-start'>
          <section className='rounded-xl border p-4 shadow-sm dark:border-none'>
            <h2 className='text-sm font-semibold'>Stack</h2>
            <div className='mt-3 flex flex-wrap gap-2'>
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
          </section>

          <section className='rounded-xl border p-4 shadow-sm dark:border-none'>
            <h2 className='text-sm font-semibold'>Core Work</h2>
            <ul className='text-muted-foreground mt-3 space-y-2 text-sm leading-6'>
              {project.highlights.slice(0, 3).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </aside>
      </section>
    </main>
  );
}
