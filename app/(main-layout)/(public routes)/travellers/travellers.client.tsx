'use client';

import { fetchAuthors } from '@/lib/api/clientApi';
import TravellersList from '@/components/TravellersList/TravellersList';
import css from './Travellers.module.css';
import mainCss from '@/app/Home.module.css';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState, useMemo } from 'react';

const TravellersClient = () => {
  const [width, setWidth] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesctop = width !== null && width >= 1440;
  const perPage = isDesctop ? 12 : 8;

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
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const allUsers = useMemo(() => {
    return data?.pages.flatMap(p => p.data.users) ?? [];
  }, [data?.pages]);

  useEffect(() => {
    if (allUsers.length > 0) {
      setVisibleCount(perPage);
    }
  }, [allUsers, perPage]);

  const visibleUsers = allUsers.slice(0, visibleCount);
  const handleLoadMore = () => {
    if (visibleCount < allUsers.length) {
      setVisibleCount(prev => prev + 4);
      return;
    }
    if (hasNextPage) {
      fetchNextPage().then(() => {
        setVisibleCount(prev => prev + 4);
      });
    }
  };

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Some error..</p>;

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
