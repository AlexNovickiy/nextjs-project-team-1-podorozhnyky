'use client';

import TravellersStories from '@/components/TravellersStories/TravellersStories';
import { fetchStories } from '@/lib/api/clientApi';
import { ICategory } from '@/types/category';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import css from './Stories.module.css';

interface StoriesClientProps {
  category: ICategory | null;
}

const StoriesClient = ({ category }: StoriesClientProps) => {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isTablet = width !== null && width >= 768 && width < 1440;
  const isMobile = width !== null && width < 768;

  const perPage = isTablet ? 8 : 9;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['stories', category?._id ?? 'all', perPage],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await fetchStories(perPage, pageParam, category);
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: lastPageParam =>
      lastPageParam.hasNextPage ? lastPageParam.page + 1 : undefined,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const stories = data?.pages.flatMap(page => page.data) ?? [];

  return (
    <>
      <h1>Історії Мандрівників</h1>
      {isMobile ? (
        <div className={css.mobileCategory}>Mobile</div>
      ) : (
        <div className={css.category}>PC</div>
      )}
      <TravellersStories stories={stories} />
      {hasNextPage && (
        <button
          className={css.paginationButton}
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Завантаження…' : 'Показати ще'}
        </button>
      )}
      {error && <p>Щось пішло не так</p>}
      {isLoading && <p>Завантаження</p>}
    </>
  );
};

export default StoriesClient;
