import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import { ThemeProvider } from '@/components/theme/theme-provider';
import Providers from '@/components/providers';

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Tuong Luu',
    description: 'Tuong Luu Portfolio',
    icons: {
        icon: [
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
        shortcut: '/favicon.ico',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body
                className={`${inter.variable} bg-[radial-gradient(var(--muted-foreground)_1px,transparent_1px)] bg-size-[16px_16px] antialiased dark:bg-[radial-gradient(var(--muted)_1px,transparent_1px)]`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
