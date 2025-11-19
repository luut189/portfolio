import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/providers';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kyzel.dev'),
  title: 'Tuong Luu',
  description: 'Tuong Luu Portfolio',
  openGraph: {
    title: 'Tuong Luu',
    description: 'Tuong Luu Portfolio',
    url: new URL('https://www.kyzel.dev'),
    images: [
      {
        url: '/opengraph-image.png',
        width: 512,
        height: 512,
        alt: 'Tuong Luu',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: '/opengraph-image.png',
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
      <body className={`${inter.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
