'use client';

import { useEffect, useState } from 'react';
import css from './ThemeToggle.module.css';
const themes = ['color-scheme-1', 'color-scheme-2', 'color-scheme-3'] as const;

export default function ThemeToggle() {
  const [theme, setTheme] = useState<(typeof themes)[number]>('color-scheme-1');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as
      | (typeof themes)[number]
      | null;
    const initial = saved || 'color-scheme-1';
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  return (
    <button onClick={toggleTheme} className={css.themeToggle}>
      {theme === 'color-scheme-1' && '🌞'}
      {theme === 'color-scheme-2' && '💙'}
      {theme === 'color-scheme-3' && '🌙'}
    </button>
  );
}
