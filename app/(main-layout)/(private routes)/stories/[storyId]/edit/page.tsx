import AddStoryForm from '@/components/AddStoryForm/AddStoryForm';
import homeCss from '../../../../../Home.module.css';
import css from './editStory.module.css';

interface EditStoryFormProps {
  params: {
    storyId: string;
  };
}

const EditStoryPage = async ({ params }: EditStoryFormProps) => {
  const { storyId } = await params;

  return (
    <div className={`${homeCss.container} ${css.historyWrapper}`}>
      <h1 className={css.pageTitle}>Редагувати історію</h1>
      <AddStoryForm storyId={storyId} />
    </div>
  );
};

export default EditStoryPage;
