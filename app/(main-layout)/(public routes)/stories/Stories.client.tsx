'use client';

import TravellersStories from '@/components/TravellersStories/TravellersStories';
import { fetchStories } from '@/lib/api/clientApi';
import { ICategory } from '@/types/category';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

interface StoriesClientProps {
  category: ICategory | null;
  perPage: number;
}

const StoriesClient = ({ category, perPage }: StoriesClientProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['stories', category?._id ?? 'all'],
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
      <TravellersStories stories={stories} />
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

export default StoriesClient;
