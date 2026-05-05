import { Button } from '@/components/ui/button';

import { ArrowDownToLine, File } from 'lucide-react';
import Link from 'next/link';

export default function ResumePage() {
  const resumeHref = '/api/resume';

  return (
    <div className='mx-4 flex w-full flex-1 flex-col gap-2'>
      <div className='flex items-center justify-center gap-2'>
        <File />
        <h1 className='text-xl font-semibold whitespace-nowrap'>Resume</h1>
        <div className='bg-primary h-0.5 flex-1' />
        <Button variant={'outline'} size={'icon'} title='Download resume' asChild>
          <Link href={resumeHref} download='TuongLuuResume.pdf'>
            <ArrowDownToLine />
          </Link>
        </Button>
      </div>
      <div className='bg-accent text-accent-foreground flex flex-col gap-3 rounded-lg p-4 md:hidden'>
        <p className='text-sm'>
          The embedded PDF works best on larger screens. On mobile, open it in a new tab or download
          it directly.
        </p>
        <div className='flex flex-wrap gap-3'>
          <Button asChild>
            <Link href={resumeHref} target='_blank' rel='noopener noreferrer'>
              Open resume
            </Link>
          </Button>
          <Button variant='outline' asChild>
            <Link href={resumeHref} download='TuongLuuResume.pdf'>
              Download PDF
            </Link>
          </Button>
        </div>
      </div>
      <div className='bg-accent hidden w-full rounded-lg p-2 md:block'>
        <iframe
          title='Tuong Luu resume PDF'
          className='h-[70dvh] w-full'
          src='https://luut189.github.io/resume-repo/resume.pdf#toolbar=0'
        />
      </div>
    </div>
  );
}
