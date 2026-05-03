'use client';

import { CommandPaletteProvider } from '@/context/command-palette-context';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import Contacts from './contacts';
import Navbar from './navbar';
import { ThemeProvider } from './theme/theme-provider';
import { Toaster } from './ui/sonner';

export default function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
      <CommandPaletteProvider>
        <div className='relative flex min-h-screen'>
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(var(--primary)_1px,transparent_1px)] bg-size-[16px_16px] opacity-10' />
          <main className='relative mx-auto flex w-full flex-col gap-2 lg:w-2/3 xl:w-1/2'>
            <Navbar />
            <div
              key={pathname}
              className='animate-in fade-in slide-in-from-bottom-2 flex w-full flex-1 items-center justify-center duration-300 lg:mx-auto'>
              {children}
            </div>
            <footer className='text-muted-foreground mb-2 flex flex-col gap-2 text-center text-xs'>
              <Contacts />
              <p className='m-2'>
                &copy; {new Date().getFullYear()} Tuong Luu. All rights reserved
              </p>
            </footer>
          </main>
        </div>
        <Toaster richColors />
      </CommandPaletteProvider>
    </ThemeProvider>
  );
}
