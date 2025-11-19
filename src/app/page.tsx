import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';

const experiences = [
  {
    from: 'Sep 2023',
    to: 'Aug 2028',
    title: 'Computational Mathematics',
    company: 'UWaterloo',
    url: 'https://uwaterloo.ca',
    task: 'studying cs and suffering with math',
    logo: '/uwaterloo.svg',
  },
  {
    from: 'Sep 2025',
    to: 'Dec 2025',
    title: 'Software Developer Intern',
    company: 'Lynkr',
    url: 'https://lynkr.ca',
    task: 'built FastAPI + Next.js services, CI/CD, and AI agent tooling.',
    logo: '/lynkr.png',
  },
  {
    from: 'Jan 2025',
    to: 'Apr 2025',
    title: 'Team Member',
    company: 'WE Accelerate',
    url: 'https://uwaterloo.ca',
    task: 'led a team building an AI fraud-prevention concept',
    logo: '/uwaterloo.svg',
  },
];

export default function Homepage() {
  return (
    <div className='mx-4 flex w-full flex-1 flex-col'>
      <div className='flex items-center justify-center gap-2'>
        <Avatar>
          <AvatarImage src='https://github.com/luut189.png' />
          <AvatarFallback>KZ</AvatarFallback>
        </Avatar>
        <span className='text-2xl font-semibold whitespace-nowrap'>Tuong Luu</span>
        <div className='bg-primary h-0.5 flex-1' />
      </div>
      <div className='m-0 rounded-md p-4'>
        <ul className='space-y-3'>
          {experiences.map((exp) => (
            <li key={exp.company}>
              <div className='grid w-full grid-cols-[auto_1fr_auto] items-start font-semibold'>
                <div className='flex flex-col justify-start gap-2 md:flex-row md:items-center'>
                  {exp.title}
                  <div className='flex items-center gap-2'>
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      width={250}
                      height={250}
                      className='h-5 w-5'
                    />
                    <Link
                      href={exp.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='hover:text-muted-foreground underline'>
                      {exp.company}
                    </Link>
                  </div>
                </div>
                <div className='w-5' />
                <div className='text-right underline'>
                  {exp.from} - {exp.to}
                </div>
              </div>

              <div className='text-muted-foreground w-2/3'>{exp.task}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
