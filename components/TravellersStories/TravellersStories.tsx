import { IStory } from '@/types/story';
import React, { useState } from 'react';

export interface TravellersStoriesProps {
  stories: IStory[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => Promise<void>;
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
