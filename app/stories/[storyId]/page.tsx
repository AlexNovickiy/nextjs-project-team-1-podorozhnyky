import React from 'react';
import StoryDetails from '@/components/StoryDetails/StoryDetails';
import Popular from '@/components/Popular/Popular';

type Props = { params: { storyId: string } };

export default function StoryPage({ params }: Props) {
  const storyTitle =
    'Венеція без туристів: маршрути для справжніх мандрівників'; // placeholder from backend
  return (
    <main>
      <h1>{storyTitle}</h1>
      <StoryDetails storyId={params.storyId} />
      <Popular />
    </main>
  );
}
