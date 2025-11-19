import AddStoryForm from '@/components/AddStoryForm/AddStoryForm';
import homeCss from '../../../../../Home.module.css';
import css from './editStory.module.css';
import { fetchStoryById } from '@/lib/api/serverApi';

interface EditStoryFormProps {
  params: Promise<{
    storyId: string;
  }>;
}

const EditStoryPage = async ({ params }: EditStoryFormProps) => {
  const { storyId } = await params;
  const story = await fetchStoryById(storyId);

  return (
    <div className={`${homeCss.container} ${css.historyWrapper}`}>
      <h1 className={css.pageTitle}>Редагувати історію</h1>
      <AddStoryForm storyId={storyId} story={story} />
    </div>
  );
};

export default EditStoryPage;
