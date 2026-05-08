import Providers from '@/components/providers';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Bricolage_Grotesque, Caveat } from 'next/font/google';

import type { Metadata, Viewport } from 'next';

import './globals.css';

const bricolageGrotesque = Bricolage_Grotesque({
  variable: '--font-sans-main',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
});

const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'oklch(1 0 0)' },
    { media: '(prefers-color-scheme: dark)', color: 'oklch(0.145 0 0)' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://kyzel.dev'),
  title: 'Tuong Luu',
  description: 'Tuong Luu Portfolio',
  openGraph: {
    title: 'Tuong Luu',
    description: 'Tuong Luu Portfolio',
    siteName: 'Tuong Luu',
    url: new URL('https://kyzel.dev'),
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Tuong Luu',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: '/api/og',
  },

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
        className={`${bricolageGrotesque.variable} ${caveat.variable} selection:bg-primary selection:text-background font-sans antialiased`}>
        <Providers>{children}</Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
