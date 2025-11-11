'use client';

import TravellersStoriesItem from '../TravellersStoriesItem/TravellersStoriesItem';
import css from './TravellersStories.module.css';
import { IStory } from '@/types/story';

interface TravellersStoriesProps {
  stories: IStory[];
}

const TravellersStories = ({ stories }: TravellersStoriesProps) => {
  return (
    <>
      {stories && (
        <ul className={css.storiesList}>
          {stories.map(story => (
            <TravellersStoriesItem story={story} key={story._id} />
          ))}
        </ul>
      )}
    </>
  );
};

export default TravellersStories;
