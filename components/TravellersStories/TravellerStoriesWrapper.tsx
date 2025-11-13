"use client";

import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import TravellersStories from "@/components/TravellersStories/TravellersStories";
import type { PaginatedStoriesResponse, IStory } from "@/types/story";

type Props = {
  travellerId: string;
  initialStories: PaginatedStoriesResponse;
};

async function fetchStoriesPage(
  travellerId: string,
  page: number,
  perPage: number
): Promise<PaginatedStoriesResponse> {
  const res = await fetch(
    `/api/users/${encodeURIComponent(travellerId)}?page=${page}&perPage=${perPage}`,
    { credentials: "same-origin" }
  );

  if (!res.ok) throw new Error(`Failed to load stories page=${page}`);
  const json = await res.json();

  return {
    page: json.page,
    perPage: json.perPage,
    totalPages: json.totalPages,
    totalItems: json.totalItems,
    hasNextPage: json.hasNextPage,
    hasPreviousPage: json.hasPreviousPage,
    data: json.data.articles as IStory[],
  };
}

export default function TravellerStoriesWrapper({ travellerId, initialStories }: Props) {
  const perPage = initialStories.perPage;

  const query = useInfiniteQuery<PaginatedStoriesResponse>({
    queryKey: ["traveller-stories", travellerId, perPage],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchStoriesPage(travellerId, Number(pageParam ?? 1), perPage),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
  });

  const stories: IStory[] = useMemo(
    () =>
      (query.data?.pages ?? [initialStories]).flatMap((page) => page.data),
    [query.data?.pages, initialStories]
  );

  const hasNextPage = query.hasNextPage ?? initialStories.hasNextPage;

  const handleClick = async () => {
    if (!hasNextPage || query.isFetchingNextPage) return;
    await query.fetchNextPage();
  };

  return (
    <TravellersStories
      stories={stories}
      hasNextPage={hasNextPage}
      isFetchingNextPage={query.isFetchingNextPage}
      onLoadMore={handleClick}
    />
  );
}