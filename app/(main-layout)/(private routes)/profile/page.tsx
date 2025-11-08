import React, { useState } from 'react';
import TravellerInfo from '../../../../components/TravellerInfo/TravellerInfo';
import TravellersStories from '../../../../components/TravellersStories/TravellersStories';

const ProfilePage: React.FC = () => {
  const [tab, setTab] = useState<'saved' | 'own'>('saved');

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

        <TravellersStories />
      </div>
    </>
  );
};

export default ProfilePage;
