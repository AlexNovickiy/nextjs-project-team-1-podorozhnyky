'use client';

import React, { useEffect, useState } from 'react';
import TravellersStories from '@/components/TravellersStories/TravellersStories';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { fetchStories } from '@/lib/api/clientApi';
import css from './Popular.module.css';
import { usePathname } from 'next/navigation';

type PopularProps = {
  tablet?: number;
  mobile?: number;
  desktop?: number;
  showLoadMore?: boolean;
};

export const Popular = ({
  tablet = 4,
  mobile = 3,
  desktop = 3,
  showLoadMore = true,
}: PopularProps) => {
  const [width, setWidth] = useState<number | null>(null);
  const urlPath = usePathname();

  const isHomePage = urlPath === '/';

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isTablet = width !== null && width >= 768 && width < 1440;
  const isMobile = width !== null && width < 768;

  const perPage = isMobile ? mobile : isTablet ? tablet : desktop;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['stories', 'all', perPage],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await fetchStories(perPage, pageParam, null);
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const stories = data?.pages.flatMap(page => page.data) ?? [];

  return (
    <section
      className={isHomePage ? css.container : css.popularSection}
      aria-label="popular"
    >
      <h2 className={css.title}>Популярні історії</h2>
      {stories && (
        <TravellersStories
          hasNextPage={showLoadMore && hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={() => fetchNextPage()}
          stories={stories}
          isHiddenOnMobileButton={isMobile}
        />
      )}
      {error && <p>Щось пішло не так</p>}
      {isLoading && <p>Завантаження</p>}
    </section>
  );
};

export default Popular;
