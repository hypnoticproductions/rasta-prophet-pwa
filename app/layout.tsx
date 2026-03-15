import type { Metadata, Viewport } from 'next';
import { Inter, Bebas_Neue } from 'next/font/google';
import './globals.css';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas-neue',
});

export const metadata: Metadata = {
  title: 'The Rasta Prophet Podcast',
  description: 'A journey through sound and wisdom. Listen to all episodes of The Rasta Prophet.',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    apple: '/icons/icon-192x192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'The Rasta Prophet',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#121212',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={`${inter.variable} ${bebasNeue.variable} bg-background text-white antialiased`}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
