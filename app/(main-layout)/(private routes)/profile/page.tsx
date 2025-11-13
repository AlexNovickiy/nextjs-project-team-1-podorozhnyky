'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { IStory } from '@/types/story';
import TravellerInfo from '../../../../components/TravellerInfo/TravellerInfo';
import TravellersStories from '../../../../components/TravellersStories/TravellersStories';
import MessageNoStories from '../../../../components/MessageNoStories/MessageNoStories';

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [tab, setTab] = useState<'saved' | 'own'>('saved');

  // TODO: Replace with real data from API
  const savedStories: IStory[] = [];
  const ownStories: IStory[] = [];

  const handleExploreStories = () => {
    router.push('/stories');
  };

  const handleCreateStory = () => {
    router.push('/stories/create');
  };

  return (
    <>
      <TravellerInfo />
      <div>
        <nav>
          <button type="button" onClick={() => setTab('saved')}>
            Збережені історії
          </button>
          <button type="button" onClick={() => setTab('own')}>
            Мої історії
          </button>
        </nav>

        {tab === 'saved' ? (
          savedStories.length > 0 ? (
            <TravellersStories data={savedStories} />
          ) : (
            <MessageNoStories
              text="У вас ще немає збережених історій, мерщій збережіть вашу першу історію!"
              buttonText="До історій"
              onClick={handleExploreStories}
            />
          )
        ) : ownStories.length > 0 ? (
          <TravellersStories data={ownStories} />
        ) : (
          <MessageNoStories
            text="Ви ще нічого не публікували, поділіться своєю першою історією!"
            buttonText="Опублікувати історію"
            route="/stories/create"
            onClick={handleCreateStory}
          />
        )}
      </div>
    </>
  );
};

export default ProfilePage;

