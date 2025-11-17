'use client';

import mainCss from '@/app/Home.module.css';
import type { IStory, PaginatedStoriesResponse } from '@/types/story';
import type { IApiResponse, IUser } from '@/types/user';
import type { UseQueryResult } from '@tanstack/react-query';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';
import Loader from '../../../../components/Loader/Loader';
import MessageNoStories from '../../../../components/MessageNoStories/MessageNoStories';
import Pagination from '../../../../components/Pagination/Pagination';
import TravellersStories from '../../../../components/TravellersStories/TravellersStories';
import { useStoriesPerPage } from '../../../../hooks/useStoriesPerPage';
import {
  fetchCurrentUser,
  fetchMyStories,
  fetchSavedStories,
} from '../../../../lib/api/clientApi';
import styles from './Profile.module.css';

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const perPage = useStoriesPerPage();
  const [tab, setTab] = useState<'saved' | 'own'>('own');
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();

  const queryKey = ['profile', tab, page, perPage] as const;

  const query = useQuery({
    queryKey,
    queryFn: () =>
      tab === 'saved'
        ? fetchMyStories(perPage, page)
        : fetchSavedStories(perPage, page),
    placeholderData: keepPreviousData,
  }) as unknown as UseQueryResult<PaginatedStoriesResponse, Error>;

  const { data, isLoading, isError } = query;

  const { data: meData } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => fetchCurrentUser(),
    staleTime: 1000 * 60 * 5,
  }) as unknown as UseQueryResult<IApiResponse, Error>;

  const currentUser = meData?.data?.user as IUser | undefined;

  const normalizedData = React.useMemo(() => {
    if (!data) return null;

    return {
      page: data?.page || page,
      perPage: data?.perPage || perPage,
      totalPages: data?.totalPages || 0,
      totalItems: data?.totalItems || 0,
      hasNextPage: data?.hasNextPage || false,
      hasPreviousPage: data?.hasPreviousPage || false,
      data:
        ((data as Record<string, unknown>)?.data as Record<string, unknown>)
          ?.articles ||
        data?.data ||
        [],
    } as {
      page: number;
      perPage: number;
      totalPages: number;
      totalItems: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      data: unknown[];
    };
  }, [data, page, perPage]);

  const items = (normalizedData?.data ?? []) as IStory[];

  const handleExploreStories = () => router.push('/stories');
  const handleCreateStory = () => router.push('/stories-create/create');

  useEffect(() => {
    setPage(1);
  }, [perPage]);

  useEffect(() => {
    if (!normalizedData) return;

    const nextPage = (normalizedData.page || page) + 1;
    if (normalizedData.hasNextPage) {
      queryClient.prefetchQuery({
        queryKey: ['profile', tab, nextPage, perPage],
        queryFn: async () =>
          tab === 'saved'
            ? await fetchSavedStories(perPage, nextPage)
            : await fetchMyStories(perPage, nextPage),
      });
    }
  }, [normalizedData, page, perPage, tab, queryClient]);

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
                setPage(1);
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
                setPage(1);
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
            <>
              <TravellersStories stories={items} />
              {normalizedData && (normalizedData?.totalPages || 0) > 1 && (
                <div className={styles.paginationWrapper}>
                  <Pagination
                    totalPages={normalizedData?.totalPages || 0}
                    currentPage={page}
                    onPageChange={setPage}
                  />
                </div>
              )}
            </>
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
              route="/stories-create/create"
              onClick={handleCreateStory}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
