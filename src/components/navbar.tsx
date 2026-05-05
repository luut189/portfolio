'use client';

import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { CommandPaletteButton } from './command-palette';

const routes = [
  { display: 'projects', href: '/projects' },
  { display: 'resume', href: '/resume' },
  { display: 'contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className='my-4 flex items-center justify-between rounded-xl px-6 py-4'>
      <Link href='/' className='text-xl font-semibold'>
        kyzel&apos;s
      </Link>
      <div className='flex items-center justify-center gap-2'>
        <CommandPaletteButton />
        <div className='hidden lg:flex'>
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={'ghost'}
              className='px-2 text-lg hover:bg-transparent dark:hover:bg-transparent'
              asChild>
              <Link
                href={route.href}
                className='group relative inline-block'
                aria-current={pathname === route.href ? 'page' : undefined}>
                <span>{route.display}</span>
                <span
                  className={cn(
                    'absolute bottom-1.75 left-1/2 h-px w-0 -translate-x-1/2 bg-current transition-normal duration-300 group-hover:w-3/4',
                    {
                      'w-3/4': pathname === route.href,
                    },
                  )}
                />
              </Link>
            </Button>
          ))}
          <ThemeToggle />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className='flex lg:hidden' asChild>
            <Button variant={'outline'} size={'icon'} className='group'>
              <Menu className='transition-transform group-data-[state=open]:rotate-90' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='mr-5 flex flex-col items-end border-none p-2'>
            <ThemeToggle />
            <DropdownMenuSeparator className='w-full' />
            {routes.map((route) => (
              <DropdownMenuItem
                key={route.href}
                className={cn('font-medium underline-offset-2', {
                  underline: pathname === route.href,
                })}
                asChild>
                <Link href={route.href}>{route.display}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
