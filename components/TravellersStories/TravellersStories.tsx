'use client';

import TravellersStoriesItem from '../TravellersStoriesItem/TravellersStoriesItem';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ICategory } from '@/types/category';
import { fetchStories } from '@/lib/api/clientApi';
import css from './TravellersStories.module.css';

interface TravellersStoriesProps {
  category: ICategory | null;
  perPage: number;
}

const TravellersStories = ({ category, perPage }: TravellersStoriesProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['stories', category?._id],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await fetchStories(perPage, pageParam, category);
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: lastPageParam =>
      lastPageParam.hasNextPage ? lastPageParam.page + 1 : undefined,
  });

  const stories = data?.pages.flatMap(page => page.data) ?? [];

  return (
    <>
      {stories && (
        <ul className={css.storiesList}>
          {stories.map(story => (
            <TravellersStoriesItem story={story} key={story._id} />
          ))}
        </ul>
      )}
      {hasNextPage && (
        <button
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

export default TravellersStories;
