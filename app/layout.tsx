// app/layout.tsx
import type { Metadata } from 'next';
import { nunitoSans } from './fonts';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import './globals.css';
import styles from './Home.module.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Podorozhnyky',
  description:
    'A platform for searching travel places and sharing your own experience',
  openGraph: {
    title: 'Podorozhnyky',
    description:
      'A platform for searching travel places and sharing your own experience',
    url: 'https://localhost:3000',
    images: [
      {
        url: '', // placeholder
        width: 1200,
        height: 630,
        alt: 'Podorozhnyky - A platform for searching travel places and sharing your own experience',
      },
    ],
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="uk">
      <body className={`${nunitoSans.variable}`}>
        <TanStackProvider>
          <Toaster position="top-right" />
          <AuthProvider>{children}</AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
