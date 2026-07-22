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
        <div className='h-0.5 flex-1 bg-primary' />
        <Button variant={'outline'} size={'icon'} title='Download resume' asChild>
          <Link href={resumeHref} download='TuongLuuResume.pdf'>
            <ArrowDownToLine />
          </Link>
        </Button>
      </div>
      <div className='flex flex-col gap-3 rounded-lg bg-accent p-4 text-accent-foreground md:hidden'>
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
      <div className='hidden w-full rounded-lg bg-accent p-2 md:block'>
        <iframe
          title='Tuong Luu resume PDF'
          className='h-[70dvh] w-full'
          sandbox='allow-downloads allow-same-origin'
          src='https://luut189.github.io/resume-repo/resume.pdf#toolbar=0'
        />
      </div>
    </div>
  );
}
