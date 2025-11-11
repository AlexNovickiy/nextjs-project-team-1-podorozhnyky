'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ThemeSync() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      const isAuth = pathname.startsWith('/auth');
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      const defaultLight = isAuth ? 'color-scheme-1' : 'color-scheme-2';
      const theme =
        savedTheme || (prefersDark ? 'color-scheme-3' : defaultLight);
      document.documentElement.dataset.theme = theme;
    } catch (e) {
      console.error('ThemeSync failed', e);
    }
  }, [pathname]);

  return null;
}
