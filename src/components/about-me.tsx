'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { education, experiences, TimelineEntry } from '@/lib/timelines';

import Image from 'next/image';
import Link from 'next/link';

export default function AboutMe() {
  return (
    <>
      <div className='flex flex-col gap-2 p-4'>
        <header className='flex flex-col gap-3 pb-2'>
          <div className='flex items-center gap-3'>
            <Avatar className='h-10 w-10'>
              <AvatarImage src='https://github.com/luut189.png' alt='Portrait of Tuong Luu' />
              <AvatarFallback>KZ</AvatarFallback>
            </Avatar>
            <h1 className='text-2xl font-semibold whitespace-nowrap'>Tuong Luu</h1>
          </div>
          <p className='max-w-[52ch] text-sm leading-6 text-muted-foreground sm:text-base'>
            Computational mathematics student at UWaterloo, building thoughtful full-stack software.
          </p>
        </header>

        <p className='px-2 pt-2 text-base font-medium text-muted-foreground'>Experience</p>
        <TimelineSection items={experiences} />

        <p className='px-2 pt-2 text-base font-medium text-muted-foreground'>Education</p>
        <TimelineSection items={education} />
      </div>
    </>
  );
}

function TimelineSection({ items }: { items: TimelineEntry[] }) {
  return (
    <Accordion type='single' collapsible>
      {items.map((item) => {
        const itemId = `${item.company}-${item.title}-${item.from}`;

        return (
          <AccordionItem
            key={itemId}
            value={itemId}
            className='first:rounded-t-md last:rounded-b-md hover:bg-accent/40'>
            <AccordionTrigger className='text-md cursor-pointer rounded-none px-2 py-2 hover:no-underline'>
              <div className='grid w-full grid-cols-[auto_1fr_auto] items-start font-semibold'>
                <div className='flex flex-col justify-start gap-2 md:flex-row md:items-center'>
                  {item.title}
                  <div className='flex items-center gap-2'>
                    <Image
                      src={item.logo}
                      alt={item.company}
                      width={28}
                      height={28}
                      sizes='(min-width: 768px) 28px, 24px'
                      className='h-6 w-auto rounded md:h-7'
                    />
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href={item.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='underline underline-offset-4 hover:text-muted-foreground'>
                      {item.company}
                    </Link>
                  </div>
                </div>
                <div className='w-5' />
                <div className='text-right text-sm font-normal text-muted-foreground'>
                  {item.from} &mdash; {item.to}
                </div>
                <div className='font-normal text-muted-foreground'>{item.brief}</div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul>
                {item.tasks.map((task) => (
                  <li className='ml-4 list-inside list-disc' key={task}>
                    {task}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
