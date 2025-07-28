import type { Metadata } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';
import './globals.css';
import { QueryProvider, FavoritesProvider } from '@/providers';
import { Navbar } from '@/components/molecules/navbar';

const ibmPlexSans = IBM_Plex_Sans({
  variable: '--font-ibm-plex-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'QuickBet Movies',
  description: 'Modern movie discovery application built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${ibmPlexSans.variable} antialiased font-sans`}>
        <QueryProvider>
          <FavoritesProvider>
            <Navbar />
            <main>{children}</main>
          </FavoritesProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
