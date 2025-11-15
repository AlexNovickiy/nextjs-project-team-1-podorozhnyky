'use client';

import { useEffect, useState } from 'react';

type PerPageConfig = {
  desktop?: number;  // >=1440
  tablet?: number;   // 768–1439
  mobile?: number;   // <768
};

const DEFAULT_CONFIG: Required<PerPageConfig> = {
  desktop: 6,
  tablet: 4,
  mobile: 4,
};

export function useStoriesPerPage(config?: PerPageConfig) {
  const settings: Required<PerPageConfig> = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  const [perPage, setPerPage] = useState(settings.desktop);

  useEffect(() => {
    const calc = () => {
      const width = window.innerWidth;

      if (width >= 1440) setPerPage(settings.desktop);
      else if (width >= 768) setPerPage(settings.tablet);
      else setPerPage(settings.mobile);
    };

    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [settings.desktop, settings.tablet, settings.mobile]);

  return perPage;
}