'use client';

import PDFViewer from '@/components/pdf-viewer';
import dynamic from 'next/dynamic';

// const PDFViewer = dynamic(() => import('@/components/pdf-viewer'), { ssr: false });

export default function ResumePage() {
  return (
    <div className='bg-accent flex h-fit w-full items-center justify-center rounded-lg p-2'>
      <iframe
        className='h-[70vh] w-full md:h-[75vh]'
        src='https://luut189.github.io/latex-repo/resume/main.pdf'
      />
    </div>
  );
}
