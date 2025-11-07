import React from 'react';
import AddStoryForm from '@/components/AddStoryForm/AddStoryForm';

type Props = { params: { storyId: string } };

export default function EditStoryPage({ params }: Props) {
  return (
    <main>
      <h1>Редагувати історію</h1>
      <AddStoryForm storyId={params.storyId} />
    </main>
  );
}
