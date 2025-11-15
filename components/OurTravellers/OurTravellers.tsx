'use client';

import React, { use, useEffect, useState } from 'react';
import TravellersList from '../TravellersList/TravellersList';
import { fetchAuthors } from '@/lib/api/clientApi';
import { useInfiniteQuery } from '@tanstack/react-query';
import mainCss from '@/app/Home.module.css';
import css from './OurTravellers.module.css';

const OurTravellers: React.FC = () => {
  const perPage = 4;
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['authors', perPage],
      queryFn: ({ pageParam = 1 }) => fetchAuthors(pageParam, perPage),
      initialPageParam: 1,
      getNextPageParam: lastPage =>
        lastPage.data.pageInfo.hasNextPage
          ? lastPage.data.pageInfo.page + 1
          : undefined,
    });

  // Об'єднуємо всі завантажені сторінки в один масив
  const allAuthors = data?.pages.flatMap(page => page.data.users) ?? [];

  if (isLoading) return <div>Завантаження...</div>;

  return (
    <section className={css.ourTravellersSection} aria-label="our travellers">
      <div className={mainCss.container}>
        <h2 className={css.title} id="our-travellers">
          Наші Мандрівники
        </h2>
        <TravellersList users={allAuthors} />

        {hasNextPage && width !== null && width >= 768 && (
          <button
            className={css.paginateButton}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Завантаження...' : 'Показати ще'}
          </button>
        )}
      </div>
    </section>
  );
};

export default OurTravellers;
