import React, { useState } from 'react';
import type { IStory } from '@/types/story';

export interface TravellersStoriesProps {
  data?: IStory[];
}

const TravellersStories = ({ data }: TravellersStoriesProps) => {
  return (
    <>
      <h2>Travellers Stories</h2>
    </>
  );
};

export default TravellersStories;
