'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from './theme/theme-provider';
import Navbar from './navbar';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Contacts from './contacts';
import { Toaster } from './ui/sonner';

export default function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
      <div className='relative flex min-h-screen'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(var(--primary)_1px,transparent_1px)] bg-size-[16px_16px] opacity-20' />
        <div className='relative mx-auto flex w-full flex-col gap-2 lg:w-1/2'>
          <Navbar />
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className='flex w-full flex-1 items-center justify-center lg:mx-auto'>
            {children}
          </motion.div>
          <footer className='text-muted-foreground mx-4 mt-6 mb-2 flex flex-col gap-2 text-center text-xs'>
            <Contacts />
            <p>&copy; {new Date().getFullYear()} Tuong Luu. All rights reserved</p>
          </footer>
        </div>
      </div>
      <Toaster richColors />
    </ThemeProvider>
  );
}
