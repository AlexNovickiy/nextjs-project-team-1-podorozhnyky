'use client';

import { useIsFetching } from '@tanstack/react-query';
import TravellersStoriesItem from '../TravellersStoriesItem/TravellersStoriesItem';
import css from './TravellersStories.module.css';
import { IStory } from '@/types/story';

interface TravellersStoriesProps {
  stories: IStory[];
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  isOwn: boolean;
}

const TravellersStories = ({
  stories,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
  isOwn,
}: TravellersStoriesProps) => {
  return (
    <>
      <ul className={css.storiesList}>
        {stories.map(story => (
          <TravellersStoriesItem story={story} isOwn={isOwn} key={story._id} />
        ))}
      </ul>
      {onLoadMore && hasNextPage && !isFetchingNextPage && (
        <button
          className={css.paginationButton}
          type="button"
          onClick={onLoadMore}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Завантаження…' : 'Показати ще'}
        </button>
      )}
    </>
  );
};

export default TravellersStories;
