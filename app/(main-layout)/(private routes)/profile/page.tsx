'use client';

import mainCss from '@/app/Home.module.css';
import type { IUserWithOwnFavorites, IUserWithOwnStories } from '@/types/user';
import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';
import Loader from '../../../../components/Loader/Loader';
import MessageNoStories from '../../../../components/MessageNoStories/MessageNoStories';
import TravellersStories from '../../../../components/TravellersStories/TravellersStories';
import { useStoriesPerPage } from '../../../../hooks/useStoriesPerPage';
import {
  fetchUserWithOwnFavorites,
  fetchUserWithOwnStories,
} from '../../../../lib/api/clientApi';
import styles from './Profile.module.css';

const ProfilePage = () => {
  const router = useRouter();
  const [tab, setTab] = useState<'saved' | 'own'>('saved');
  const perPage = useStoriesPerPage();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['profile', tab, perPage],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
      tab === 'saved'
        ? fetchUserWithOwnFavorites(String(perPage), String(pageParam))
        : fetchUserWithOwnStories(String(perPage), String(pageParam)),
    getNextPageParam: lastPage => {
      if (lastPage.data.pagination.hasNextPage) {
        return lastPage.data.pagination.page + 1;
      }
    },
  });

  const items =
    tab === 'saved'
      ? (data?.pages.flatMap(
          page => (page.data.user as IUserWithOwnFavorites).favorites
        ) ?? [])
      : (data?.pages.flatMap(
          page => (page.data.user as IUserWithOwnStories).stories
        ) ?? []);

  const currentUser = data?.pages[0]?.data.user;

  const handleExploreStories = () => router.push('/stories');
  const handleCreateStory = () => router.push('/stories/create');

  return (
    <>
      <div className={mainCss.container}>
        <div className={styles.profilePage} aria-label="profile page">
          <div className={styles.travellerInfoWrapper}>
            {currentUser && (
              <div className={styles.travellerInfo} aria-label="traveller info">
                <div className={styles.travellerImage}>
                  <Image
                    src={currentUser.avatarUrl || '/placeholder-image.png'}
                    alt={`Фото мандрівника ${currentUser.name}`}
                    width={199}
                    height={199}
                    className={styles.avatar}
                    priority={true}
                  />
                </div>

                <div className={styles.travellerDetails}>
                  <h3 className={styles.travellerName}>{currentUser.name}</h3>
                  <p className={styles.travellerDescription}>
                    {currentUser.description}
                  </p>
                </div>
              </div>
            )}
          </div>
          <nav className={styles.tabs} aria-label="profile-tabs">
            <button
              type="button"
              className={
                tab === 'saved' ? `${styles.tab} ${styles.active}` : styles.tab
              }
              onClick={() => {
                setTab('saved');
              }}
              aria-pressed={tab === 'saved'}
            >
              Збережені історії
            </button>
            <button
              type="button"
              className={
                tab === 'own' ? `${styles.tab} ${styles.active}` : styles.tab
              }
              onClick={() => {
                setTab('own');
              }}
              aria-pressed={tab === 'own'}
            >
              Мої історії
            </button>
          </nav>

          {isLoading ? (
            <Loader />
          ) : isError ? (
            <ErrorMessage />
          ) : items.length > 0 ? (
            <TravellersStories
              onLoadMore={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              stories={items}
              isOwn={tab === 'own'}
            />
          ) : tab === 'saved' ? (
            <MessageNoStories
              text="У вас ще немає збережених історій, мерщій збережіть вашу першу історію!"
              buttonText="До історій"
              onClick={handleExploreStories}
            />
          ) : (
            <MessageNoStories
              text="Ви ще нічого не публікували, поділіться своєю першою історією!"
              buttonText="Опублікувати історію"
              route="/stories/create"
              onClick={handleCreateStory}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
