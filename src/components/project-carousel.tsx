'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

type ProjectImage = {
  src: string;
  alt: string;
};

type ProjectCarouselProps = {
  images?: ProjectImage[];
};

const FALLBACK_IMAGES: ProjectImage[] = [
  {
    src: '',
    alt: 'Project image placeholder',
  },
];

export default function ProjectCarousel({ images }: ProjectCarouselProps) {
  const normalizedImages = images?.length ? images : FALLBACK_IMAGES;
  const [index, setIndex] = useState(0);
  const total = normalizedImages.length;

  const goPrev = () => setIndex((current) => (current - 1 + total) % total);
  const goNext = () => setIndex((current) => (current + 1) % total);

  const active = normalizedImages[index];

  return (
    <div className='space-y-3'>
      <div className='relative h-64 w-full overflow-hidden rounded-lg bg-accent md:h-72'>
        {active.src ? (
          <Image
            src={active.src}
            alt={active.alt}
            fill
            className='object-cover'
            sizes='(min-width: 768px) 700px, 100vw'
            priority
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center text-sm text-muted-foreground'>
            Placeholder
          </div>
        )}
        {total > 1 && (
          <>
            <Button
              type='button'
              variant='secondary'
              size='icon'
              className='absolute top-1/2 left-3 -translate-y-1/2'
              onClick={goPrev}
              aria-label='Previous image'>
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <Button
              type='button'
              variant='secondary'
              size='icon'
              className='absolute top-1/2 right-3 -translate-y-1/2'
              onClick={goNext}
              aria-label='Next image'>
              <ChevronRight className='h-4 w-4' />
            </Button>
          </>
        )}
      </div>
      {total > 1 && (
        <div className='flex items-center justify-center gap-2'>
          {normalizedImages.map((image, imageIndex) => (
            <button
              key={`${image.src}-${image.alt}`}
              type='button'
              onClick={() => setIndex(imageIndex)}
              className='flex h-11 w-11 items-center justify-center rounded-full'
              aria-label={`Go to image ${imageIndex + 1}`}>
              <span
                className={cn('bg-muted-foreground/40 h-2.5 w-2.5 rounded-full', {
                  'bg-primary': imageIndex === index,
                })}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
