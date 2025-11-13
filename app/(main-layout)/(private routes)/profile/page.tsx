'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import type { IStory } from '@/types/story';

import MessageNoStories from '../../../../components/MessageNoStories/MessageNoStories';

import styles from './ProfilePage.module.css';

import TravellerInfo from '../../../../components/TravellerInfo/TravellerInfo';
import TravellersStories from '../../../../components/TravellersStories/TravellersStories';

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'saved' | 'own'>('saved');

  // TODO: Replace mock data with real user stories once API is integrated.
  const savedStories = useMemo<IStory[]>(() => [], []);
  const ownStories = useMemo<IStory[]>(() => [], []);

  const handleExploreStories = () => {
    router.push('/stories');
  };

  const handleCreateStory = () => {
    router.push('/stories/create');
  };

  const hasSavedStories = savedStories.length > 0;
  const hasOwnStories = ownStories.length > 0;

  return (
    <main className={styles.page}>
      <TravellerInfo />

      <section
        className={styles.content}
        aria-labelledby="profile-stories-heading"
      >
        <nav
          className={styles.tabs}
          role="tablist"
          aria-label="Перемикач між історіями"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'saved'}
            className={`${styles.tabButton} ${activeTab === 'saved' ? styles.tabButtonActive : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            Збережені історії
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'own'}
            className={`${styles.tabButton} ${activeTab === 'own' ? styles.tabButtonActive : ''}`}
            onClick={() => setActiveTab('own')}
          >
            Мої історії
          </button>
        </nav>

        <div
          className={styles.tabPanel}
          role="tabpanel"
          id="profile-stories-heading"
        >
          {activeTab === 'saved' ? (
            hasSavedStories ? (
              <TravellersStories data={savedStories} />
            ) : (
              <MessageNoStories
                text="У вас ще немає збережених історій, мерщій збережіть вашу першу історію!"
                buttonText="До історій"
                onClick={handleExploreStories}
              />
            )
          ) : hasOwnStories ? (
            <TravellersStories data={ownStories} />
          ) : (
            <MessageNoStories
              text="Ви ще нічого не публікували, поділіться своєю першою історією!"
              buttonText="Опублікувати історію"
              onClick={handleCreateStory}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
