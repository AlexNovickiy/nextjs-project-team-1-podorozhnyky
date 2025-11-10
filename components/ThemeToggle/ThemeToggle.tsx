'use client';

import { useEffect, useState } from 'react';
import css from './ThemeToggle.module.css';

const themes = ['color-scheme-1', 'color-scheme-2', 'color-scheme-3'] as const;

export default function ThemeToggle() {
  const [theme, setTheme] = useState<(typeof themes)[number] | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme') as
        | (typeof themes)[number]
        | null;
      if (saved) {
        setTheme(saved);
        document.documentElement.setAttribute('data-theme', saved);
      } else {
        // Якщо нема збереженої — підлаштовуємося під системну тему
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;
        const systemTheme = prefersDark ? 'color-scheme-3' : 'color-scheme-1';
        setTheme(systemTheme);
        document.documentElement.setAttribute('data-theme', systemTheme);
      }

      // Автоматичне оновлення при зміні системної теми (якщо не вибрана вручну)
      const listener = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem('theme')) {
          const newTheme = e.matches ? 'color-scheme-3' : 'color-scheme-1';
          setTheme(newTheme);
          document.documentElement.setAttribute('data-theme', newTheme);
        }
      };

      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', listener);
      return () =>
        window
          .matchMedia('(prefers-color-scheme: dark)')
          .removeEventListener('change', listener);
    } catch (err) {
      console.error('Theme init error', err);
    }
  }, []);

  const toggleTheme = () => {
    if (!theme) return;
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  if (!theme) return null; // щоб кнопка не мигала

  return (
    <button onClick={toggleTheme} className={css.themeToggle}>
      {theme === 'color-scheme-1' && '🌞'}
      {theme === 'color-scheme-2' && '💙'}
      {theme === 'color-scheme-3' && '🌙'}
    </button>
  );
}
