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
    brief: 'built FastAPI + Next.js with AI orchestration.',
    tasks: [
      'shipped FastAPI + Next.js app with AI agents, driving $100k+ CAD revenue and 500+ beta users',
      'migrated DB seeder into a Kubernetes job on GKE, cutting deploy time by 40%',
      'architected multi-org tenancy with tenant isolation and RBAC',
      'built MFA with TOTP + Twilio and JWT session controls, cutting unauthorized access by 70%',
      'delivered audit logging for user actions, admin changes, and security events',
    ],
  },
  {
    from: 'Jan 2025',
    to: 'Apr 2025',
    title: 'Team Member',
    company: 'WE Accelerate',
    url: 'https://uwaterloo.ca',
    logo: '/uwaterloo.svg',
    brief: 'designed AI fraud prevention for elders.',
    tasks: [
      'led a 5-person team to design an AI solution for elder fraud prevention',
      'built a project planning tool and pipeline wireframe to align deliverables',
      'worked with a mentor to refine goals and validate real-world AI constraints',
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
