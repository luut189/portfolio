'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from './theme/theme-provider';
import Navbar from './navbar';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Providers({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    return (
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
            <div className='mx-auto flex min-h-screen w-1/2 flex-col'>
                <Navbar />
                <motion.div
                    key={pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className='flex w-full flex-1'>
                    {children}
                </motion.div>
                <footer className='text-muted-foreground mb-6 text-center text-xs'>
                    &copy; {new Date().getFullYear()} Tuong Luu. All rights reserved
                </footer>
            </div>
        </ThemeProvider>
    );
}
