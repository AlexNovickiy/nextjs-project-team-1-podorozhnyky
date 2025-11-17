// import Popular from '@/components/Popular/Popular';
import StoryDetails from '@/components/StoryDetails/StoryDetails';
import { fetchStoryById } from '@/lib/api/serverApi';
import style from '../../../../Home.module.css';
import css from './StoryPage.module.css';
export default async function StoryPage(props: {
  params: { storyId: string };
}) {
  const { storyId } = await props.params;

  const story = await fetchStoryById(storyId);

  return (
    <section className={css.page} aria-label="story page">
      <div className={style.container}>
        <h1 className={css.title}>{story.title}</h1>
        <StoryDetails storyId={storyId} />
      </div>
    </section>
  );
}
