'use client';

import React, { useEffect, useState } from 'react';
import TravellersStories from '@/components/TravellersStories/TravellersStories';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { fetchStories } from '@/lib/api/clientApi';
import css from './Popular.module.css';
import { useRouter } from 'next/navigation';

const Popular = () => {
  const router = useRouter();
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isTablet = width !== null && width >= 768 && width < 1440;
  const isMobile = width !== null && width < 768;

  const perPage = isTablet ? 4 : 3;

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
    <section className={css.container} aria-label="popular">
      <h2 className={css.title}>Популярні історії</h2>
      {stories && (
        <>
          <TravellersStories stories={stories} />
          {!isMobile && hasNextPage && data?.pages.at(-1)?.hasNextPage && (
            <button
              className={css.button}
              type="button"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? 'Завантаження…' : 'Показати ще'}
            </button>
          )}
        </>
      )}
      {error && <p>Щось пішло не так</p>}
      {isLoading && <p>Завантаження</p>}
    </section>
  );
};

export default Popular;
