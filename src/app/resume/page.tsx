import { Button } from '@/components/ui/button';

import { ArrowDownToLine, File } from 'lucide-react';
import Link from 'next/link';

export default function ResumePage() {
  return (
    <div className='mx-4 flex w-full flex-1 flex-col gap-2'>
      <div className='flex items-center justify-center gap-2'>
        <File />
        <span className='text-xl font-semibold whitespace-nowrap'>Resume</span>
        <div className='bg-primary h-0.5 flex-1' />
        <Button variant={'outline'} title='Download resume' asChild>
          <Link href='/api/resume' download='TuongLuuResume.pdf'>
            <ArrowDownToLine />
          </Link>
        </Button>
      </div>
      <iframe
        className='h-screen w-full rounded-lg'
        src='https://luut189.github.io/latex-repo/resume.pdf#toolbar=0'
      />
    </div>
  );
}
