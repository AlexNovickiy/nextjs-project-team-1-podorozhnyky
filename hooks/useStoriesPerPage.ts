'use client';

import { useEffect, useState } from 'react';

export function useStoriesPerPage() {
  const [perPage, setPerPage] = useState(6); // по дефолту на desktop

  useEffect(() => {
    const calc = () => {
      const width = window.innerWidth;

      if (width >= 1440) setPerPage(6); // desktop
      else setPerPage(4);               // tablet + mobile
    };

    calc(); 
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  return perPage;
}