import React, { useState } from 'react';
import type { IStory } from '@/types/story';

export interface TravellersStoriesProps {
  stories?: IStory[];
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => Promise<void>;
}

const TravellersStories = ({
  stories,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: TravellersStoriesProps) => {
  return (
    <>
      <h2>Travellers Stories</h2>
    </>
  );
};

export default TravellersStories;
