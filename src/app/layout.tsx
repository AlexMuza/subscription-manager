import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { SupabaseProvider } from '@/components/SupabaseProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Subscription Manager',
  description: 'Менеджер цифровых подписок',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <SupabaseProvider initialSession={null}>
          <Navigation />
          <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
        </SupabaseProvider>
      </body>
    </html>
  );
}

