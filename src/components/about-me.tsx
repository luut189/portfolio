'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { education, experiences, TimelineEntry } from '@/lib/timelines';

import { Diamond } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
      <div className='flex flex-col gap-2 p-4'>
        <TimelineSection items={experiences} />
        <div className='mx-auto flex w-2/3 items-center justify-center gap-3'>
          <div className='bg-primary h-0.5 flex-1' />
          <Diamond />
          <div className='bg-primary h-0.5 flex-1' />
        </div>
        <TimelineSection items={education} />
      </div>
    </>
  );
}

function TimelineSection({ items }: { items: TimelineEntry[] }) {
  return (
    <Accordion type='single' collapsible>
      {items.map((item, idx) => (
        <AccordionItem
          key={item.company + idx}
          value={item.company + idx}
          className='hover:bg-accent/40 first:rounded-t-md last:rounded-b-md'>
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
                    className='hover:text-muted-foreground underline underline-offset-4'>
                    {item.company}
                  </Link>
                </div>
              </div>
              <div className='w-5' />
              <div className='text-muted-foreground text-right text-sm font-normal'>
                {item.from} &mdash; {item.to}
              </div>
              <div className='text-muted-foreground font-normal'>{item.brief}</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              {item.tasks.map((task, idx) => (
                <li className='ml-4 list-inside list-disc' key={idx}>
                  {task}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
