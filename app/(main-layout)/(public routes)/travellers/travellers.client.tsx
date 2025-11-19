'use client';

import { fetchAuthors } from '@/lib/api/clientApi';
import TravellersList from '@/components/TravellersList/TravellersList';
import css from './Travellers.module.css';
import mainCss from '@/app/Home.module.css';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState, useMemo } from 'react';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import { useStoriesPerPage } from '@/hooks/useStoriesPerPage';

const TravellersClient = () => {
  const perPage = useStoriesPerPage({ desktop: 12, tablet: 8, mobile: 8 });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['users', perPage],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await fetchAuthors(pageParam, perPage);
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: lastPageParam =>
      lastPageParam.data.pageInfo.hasNextPage
        ? lastPageParam.data.pageInfo.page + 1
        : undefined,
    refetchOnMount: false,
  });

  const allUsers = useMemo(() => {
    return data?.pages.flatMap(p => p.data.users) ?? [];
  }, [data?.pages]);

  const [visibleCount, setVisibleCount] = useState(perPage);

  useEffect(() => {
    setVisibleCount(perPage);
  }, [perPage]);

  const visibleUsers = allUsers.slice(0, visibleCount);

  const handleLoadMore = () => {
    // ✅ Показуємо або +4, або скільки залишилось
    const newVisibleCount = Math.min(visibleCount + 4, allUsers.length);

    // Якщо є ще користувачі в allUsers - просто показуємо їх
    if (newVisibleCount > visibleCount && newVisibleCount <= allUsers.length) {
      setVisibleCount(newVisibleCount);
      return;
    }

    // Якщо показали всіх і є наступна сторінка - завантажуємо
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage().then(() => {
        setVisibleCount(prev => prev + 4);
      });
    }
  };

  if (isLoading) return <Loader />;
  if (error || !data) return <ErrorMessage />;

  return (
    <div className={mainCss.container}>
      <TravellersList users={visibleUsers} />
      {(hasNextPage || visibleCount < allUsers.length) && (
        <button
          className={css.paginateButton}
          onClick={handleLoadMore}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Завантаження…' : 'Показати ще'}
        </button>
      )}
    </div>
  );
};
export default TravellersClient;
