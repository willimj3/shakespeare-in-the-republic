import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Shakespeare & The Federalist Papers',
  description: 'Corpus linguistics analysis of Shakespearean echoes in the Federalist Papers',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-cream text-navy`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <footer className="bg-navy text-navy-200 py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-sans">
              Shakespeare &amp; The Federalist Papers &mdash; A Corpus Linguistics Study
            </p>
            <p className="text-xs text-navy-300 mt-2">
              47 identified connections across 85 papers and 42 Shakespeare works
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
