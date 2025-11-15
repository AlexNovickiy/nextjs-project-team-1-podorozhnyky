'use client';

import { IStory } from '@/types/story';
import Image from 'next/image';
import css from './TravellersStoriesItem.module.css';
import { useRouter } from 'next/navigation';

interface TravellersStoriesItemProps {
  story: IStory | undefined;
}

const TravellersStoriesItem = ({ story }: TravellersStoriesItemProps) => {
  const router = useRouter();

  const ISODateToDate = (isoDate: string) => {
    const date = new Date(isoDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const handleClick = (storyId: string) => {
    router.push(`/stories/${storyId}`);
  };

  return (
    <li className={css.storyCard}>
      {story?.img ? (
        <Image
          className={css.mainImage}
          src={story.img}
          alt={story.title ?? 'Story Image'}
          width={335}
          height={223}
        />
      ) : (
        <Image
          className={css.mainImage}
          src="/placeholder-image.png"
          alt={story?.title ?? 'Placeholder Image'}
          width={335}
          height={223}
        />
      )}
      <div className={css.contentWrapper}>
        {story && (
          <div>
            <p className={css.category}>{story?.category.name}</p>
            <h2 className={css.title}>{story?.title}</h2>
            <p className={css.description}>{story?.article}</p>
          </div>
        )}

        {story && (
          <div>
            <div className={css.userWrapper}>
              <Image
                className={css.avatarImage}
                src={story.ownerId.avatarUrl || '/placeholder-image.png'}
                alt={story.ownerId.name}
                width={48}
                height={48}
              />
              <div className={css.userInfoWrapper}>
                <p className={css.userName}>{story.ownerId.name}</p>
                <div className={css.infoWrapper}>
                  <p className={css.date}>{ISODateToDate(story.date)}</p>
                  <span>•</span>
                  <div className={css.favoriteWrapper}>
                    <p className={css.favoriteCount}>{story.favoriteCount}</p>
                    <svg className={css.favoriteIcon} width="16" height="16">
                      <use href="/sprite.svg#icon-bookmark"></use>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className={css.buttonsWrapper}>
              <button
                className={css.showStory}
                onClick={() => handleClick(story._id)}
              >
                Переглянути статтю
              </button>
              <button className={css.bookmarkStory}>
                <svg className={css.bookmarkIcon} width="24" height="24">
                  <use href="/sprite.svg#icon-bookmark"></use>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export default TravellersStoriesItem;
