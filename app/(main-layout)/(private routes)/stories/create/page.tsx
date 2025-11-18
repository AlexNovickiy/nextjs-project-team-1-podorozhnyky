'use client';

import AddStoryForm from '@/components/AddStoryForm/AddStoryForm';
import homeCss from '../../../../Home.module.css';
import css from './createStory.module.css';

const CreateStoryPage = () => {
  return (
    <div className={`${homeCss.container} ${css.historyWrapper}`}>
      <h1 className={css.pageTitle}>Створити нову історію</h1>
      <AddStoryForm />
    </div>
  );
};

export default CreateStoryPage;
