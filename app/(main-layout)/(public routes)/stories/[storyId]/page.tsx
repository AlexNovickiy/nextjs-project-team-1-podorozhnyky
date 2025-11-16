// import Popular from '@/components/Popular/Popular';
import StoryDetails from '@/components/StoryDetails/StoryDetails';
import { fetchStoryById } from '@/lib/api/serverApi';
import css from './StoryPage.module.css';

export type StoryPageProps = { params: { storyId: string } };

export default async function StoryPage({ params }: StoryPageProps) {
  const { storyId } = params;
  const story = await fetchStoryById(storyId);

  

  //  const story = {
  //   _id: storyId,
  //   title: 'Венеція без туристів: маршрути для справжніх мандрівників',
  //   img: '/images/avatar.jpg',
  //   article: 'Петра — одне з нових чудес світу, і вживу воно вражає ще більше. Ми пройшли Сік — вузький каньйон, який веде до Скарбниці, і вразилися масштабом стародавнього міста, висіченого у скелях. День минув у дослідженні храмів, амфітеатрів і гробниць. А ввечері ми залишилися на нічне шоу, коли Петра освітлюється сотнями свічок. Атмосфера була настільки чарівною, що здавалося, час повернувся на тисячі років назад.',
  //   category: { _id: '68fb50c80ae91338641121f0', name: 'Європа' },
  //   ownerId: { _id: '6881563901add19ee16fd017', name: 'Дмитро Романенко', avatarUrl: '' },
  //   date: '2025-01-10',
  //   favoriteCount: 4,
  //   createdAt: '2025-01-01',
  //   updatedAt: '2025-01-05'
  // };



  // const popularStoriesRes = await fetchServerStories(3, 1, null);
  // const popularStories = popularStoriesRes.data.filter(
  //   (st) => st._id !== storyId
  // );
  return (
    <section className={css.page} aria-label='story page'>
      <h1 className={css.title}>{story.title}</h1>
      <StoryDetails storyId={storyId} />
      {/* <StoryDetails story={story} /> */}
      {/* <Popular /> */}
    </section>
  );
}
