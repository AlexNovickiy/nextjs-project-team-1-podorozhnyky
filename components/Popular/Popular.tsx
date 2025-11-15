import React, { useEffect, useState } from 'react';
import TravellersStories from '@/components/TravellersStories/TravellersStories';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
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
    data: stories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['stories', perPage],
    queryFn: () => fetchStories(perPage, 1, null),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handleClick = () => {
    router.push('/stories');
  };

  return (
    <section className={css.container} aria-label="popular">
      <h2 className={css.title}>Популярні історії</h2>
      {stories && (
        <>
          <TravellersStories stories={stories.data} />
          {!isMobile && (
            <button className={css.button} type="button" onClick={handleClick}>
              Переглянути всі
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
