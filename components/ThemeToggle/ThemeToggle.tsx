'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import css from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    try {
      const isAuth = pathname.startsWith('/auth');
      const saved = localStorage.getItem('theme');
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;

      let initial: string;

      if (saved) {
        // 👇 якщо користувач уже вибрав тему
        if (saved === 'color-scheme-3') {
          initial = 'color-scheme-3'; // темна глобальна
        } else if (saved === 'color-scheme-1' || saved === 'color-scheme-2') {
          // світла — своя для /auth чи ні
          initial = isAuth ? 'color-scheme-1' : 'color-scheme-2';
        } else {
          initial = prefersDark
            ? 'color-scheme-3'
            : isAuth
              ? 'color-scheme-1'
              : 'color-scheme-2';
        }
      } else {
        // перше відвідування — системна
        initial = prefersDark
          ? 'color-scheme-3'
          : isAuth
            ? 'color-scheme-1'
            : 'color-scheme-2';
      }

      setTheme(initial);
      document.documentElement.setAttribute('data-theme', initial);

      // слухаємо зміну системної теми тільки якщо користувач ще не вибрав
      const listener = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem('theme')) {
          const newTheme = e.matches
            ? 'color-scheme-3'
            : isAuth
              ? 'color-scheme-1'
              : 'color-scheme-2';
          setTheme(newTheme);
          document.documentElement.setAttribute('data-theme', newTheme);
        }
      };

      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    } catch (err) {
      console.error('Theme init error', err);
    }
  }, [pathname]);

  const toggleTheme = () => {
    if (!theme) return;

    const isAuth = pathname.startsWith('/auth');
    const lightTheme = isAuth ? 'color-scheme-1' : 'color-scheme-2';
    const newTheme = theme === 'color-scheme-3' ? lightTheme : 'color-scheme-3';

    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);

    // ✅ зберігаємо і темну, і світлу (окремо)
    localStorage.setItem('theme', newTheme);
  };

  if (!theme) return null;

  return (
    <button onClick={toggleTheme} className={css.themeToggle}>
      {theme === 'color-scheme-3' ? '🌙' : '🌞'}
    </button>
  );
}
