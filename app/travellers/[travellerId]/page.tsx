import React from 'react';
import TravellerInfo from '@/components/TravellerInfo/TravellerInfo';
import TravellersStories from '@/components/TravellersStories/TravellersStories';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';

type Props = { params: { travellerId: string } };

export default function TravellerPage({ params }: Props) {
  const hasStories = true;

  return (
    <>
      <TravellerInfo />
      <h2>Історії Мандрівника</h2>
      {hasStories ? (
        <TravellersStories />
      ) : (
        <MessageNoStories
          text="Цей користувач ще не публікував історій"
          buttonText="До історій"
          route="/stories"
        />
      )}
    </>
  );
}
