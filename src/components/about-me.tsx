'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import Image from 'next/image';
import Link from 'next/link';

const experiences = [
  {
    from: 'Sep 2023',
    to: 'Aug 2028',
    title: 'Computational Mathematics',
    company: 'UWaterloo',
    url: 'https://uwaterloo.ca',
    logo: '/uwaterloo.svg',
    brief: 'studying cs and suffering with math',
    tasks: [
      'studied computer architecture concepts including processors, memory, I/O, and performance',
      'learned design and implementation of core data structures such as lists, trees, sets, and maps',
      'gained experience in object-oriented programming and building medium-sized software systems',
      'developed skills in algorithm design, sorting, recursion, and data abstraction',
      'practiced Linux command-line workflows, version control, scripting, debugging, and automated testing',
    ],
  },
  {
    from: 'Sep 2025',
    to: 'Dec 2025',
    title: 'Software Developer Intern',
    company: 'Lynkr',
    url: 'https://lynkr.ca',
    logo: '/lynkr.png',
    brief: 'built FastAPI + Next.js services, CI/CD, and AI agent tooling.',
    tasks: [
      'built core features for Lynkr Workbench contributing to $100k+ revenue',
      'developed FastAPI + Next.js stack with Docker and AI agent pipeline',
      'set up CI/CD with GitHub Actions and Google Cloud Secret Manager',
    ],
  },
  {
    from: 'Jan 2025',
    to: 'Apr 2025',
    title: 'Team Member',
    company: 'WE Accelerate',
    url: 'https://uwaterloo.ca',
    logo: '/uwaterloo.svg',
    brief: 'led a team building an AI fraud-prevention concept',
    tasks: [
      'led a 5-person team building an AI solution for elder fraud prevention',
      'created project planning tool and workflow pipeline',
      'coordinated deliverables with mentor using Visio diagrams',
    ],
  },
];

export default function AboutMe() {
  return (
    <>
      <div className='flex items-center justify-center gap-2'>
        <Avatar className='h-8 w-8'>
          <AvatarImage src='https://github.com/luut189.png' />
          <AvatarFallback>KZ</AvatarFallback>
        </Avatar>
        <span className='text-xl font-semibold whitespace-nowrap'>Tuong Luu</span>
        <div className='bg-primary h-0.5 flex-1' />
      </div>
      <div className='m-0 rounded-md p-4'>
        <Accordion type='single' collapsible>
          {experiences.map((exp, idx) => (
            <AccordionItem
              key={exp.company + idx}
              value={exp.company + idx}
              className='hover:bg-accent/40 first:rounded-t-md last:rounded-b-md'>
              <AccordionTrigger className='text-md cursor-pointer rounded-none px-2 py-2 hover:no-underline'>
                <div className='grid w-full grid-cols-[auto_1fr_auto] items-start font-semibold'>
                  <div className='flex flex-col justify-start gap-2 md:flex-row md:items-center'>
                    {exp.title}
                    <div className='flex items-center gap-2'>
                      <Image
                        src={exp.logo}
                        alt={exp.company}
                        width={900}
                        height={900}
                        className='h-5 w-5'
                      />
                      <Link
                        onClick={(e) => e.stopPropagation()}
                        href={exp.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='hover:text-muted-foreground underline underline-offset-4'>
                        {exp.company}
                      </Link>
                    </div>
                  </div>
                  <div className='w-5' />
                  <div className='text-right'>
                    {exp.from} &mdash; {exp.to}
                  </div>
                  <div className='text-muted-foreground font-normal'>{exp.brief}</div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul>
                  {exp.tasks.map((task, idx) => (
                    <li className='ml-4 list-inside list-disc' key={idx}>
                      {task}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
