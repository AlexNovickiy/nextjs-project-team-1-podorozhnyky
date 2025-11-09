// app/layout.tsx
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import 'modern-normalize';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import { nunitoSans } from './fonts';
import './globals.css';

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
    <html lang="uk" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          try {
            const theme = localStorage.getItem('theme');
            if (theme) document.documentElement.dataset.theme = theme;
          } catch (e) {}
        `,
          }}
        />
      </head>
      <body className={`${nunitoSans.variable}`}>
        <ThemeToggle />
        <TanStackProvider>
          <Toaster position="top-right" />
          <AuthProvider>{children}</AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
