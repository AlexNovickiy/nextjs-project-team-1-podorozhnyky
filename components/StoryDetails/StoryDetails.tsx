'use client';

import { IStory } from '@/types/story';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { addFavorite, fetchStoryById } from '@/lib/api/clientApi';
import css from './StoryDetails.module.css';

const StoryDetails = ({ storyId }: { storyId: string }) => {
  const [story, setStory] = useState<IStory | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadStory = async () => {
      try {
        const data = await fetchStoryById(storyId);
        setStory(data);

      } catch {
        toast.error('Помилка завантаження історії:');
      } finally {
        setLoading(false);
      }
    };
    loadStory();
  }, [storyId]);

  const handleSave = async () => {
    if (!story) return;
    setSaving(true);

    try {
      await addFavorite(story._id);

      const update = await fetchStoryById(storyId);
      setStory(update);
      toast.success('Історію збережено!')
    } catch {
      toast.error('Помилка збереження історії:');
    } finally {
      setSaving(false);
    }
  };
  if (loading) {
    return <Loader />;
  }

  if (!story) {
    return <p>Історію не знайдено</p>;
  }

// const StoryDetails = ({ story }: { story: IStory }) => {
//   const [saving, setSaving] = useState(false);

//   const handleSave = () => {
//     setSaving(true);
//     setTimeout(() => {
//       setSaving(false);
//       toast.success('Історію збережено!');
//     }, 1000);
//   };

  const formattedDate = new Date(story.date).toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  return (
    <section className={css.page}>
      <div className={css.info}>
        <div className={css.infoDetails}>
          <div className={css.item}>
            <p className={css.value}>
              <strong className={css.label}>Автор статті</strong>{' '}
              {story.ownerId.name}
            </p>
          </div>
          <div className={css.item}>
            <p className={css.value}>
              <strong className={css.label}>Опубліковано</strong>{' '}
              {formattedDate}
            </p>
          </div>
        </div>
        <div className={css.infoCategory}>
          <p className={css.category}>{story.category.name}</p>
        </div>
      </div>
      <Image
        className={css.image}
        src={story.img || '/placeholder-image.png'}
        alt={story.title}
        width={1312}
        height={874}
      />
      <div className={css.content}>
        <p className={css.article}>{story.article}</p>
        <div className={css.saveSection}>
          <h3 className={css.saveTitle}>Збережіть собі історію</h3>
          <p className={css.saveText}>
            {'Вона буде доступна у вашому профілі у розділі збережене.'}
          </p>
          <button
            onClick={handleSave}
            className={css.saveButton}
            disabled={saving}
          >
            {saving ? 'Збереження...' : 'Зберегти'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default StoryDetails;
