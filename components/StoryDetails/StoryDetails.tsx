'use client';

import {
  addFavorite,
  fetchStoryById,
  removeFavorite,
} from '@/lib/api/clientApi';
import { IStory } from '@/types/story';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../lib/store/authStore';
import Loader from '../Loader/Loader';
import FavoriteActions from './FavoriteActions/FavoriteActions';
import css from './StoryDetails.module.css';

const StoryDetails = ({ storyId }: { storyId: string }) => {
  const [story, setStory] = useState<IStory | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { user, isAuthenticated, setUser } = useAuthStore();
  const router = useRouter();

  const isFavorite = user?.favorites?.includes(storyId) ?? false;

  useEffect(() => {
    const loadStory = async () => {
      try {
        const data = await fetchStoryById(storyId);
        setStory(data);
      } catch {
        toast.error('Помилка завантаження історії');
      } finally {
        setLoading(false);
      }
    };
    loadStory();
  }, [storyId]);

  const toggleFavorite = async () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    setSaving(true);

    try {
      const current = user?.favorites ?? [];
      let updated: string[];

      if (isFavorite) {
        await removeFavorite(storyId);
        updated = current.filter(id => id !== storyId);
        toast.success('Історію видалено із збережених');
      } else {
        await addFavorite(storyId);
        updated = [...current, storyId];
        toast.success('Історію збережено!');
      }

      setUser({
        ...user!,
        favorites: updated,
      });
    } catch {
      toast.error('Сталася помилка');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;
  if (!story) return <p>Історію не знайдено</p>;

  const formattedDate = new Date(story.date).toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  return (
    <section className={css.page}>
      <div className={css.info}>
        <div className={css.infoDetails}>
          <p className={css.value}>
            <strong className={css.label}>Автор статті:</strong>{' '}
            {story.ownerId.name}
          </p>
          <p className={css.value}>
            <strong className={css.label}>Опубліковано:</strong> {formattedDate}
          </p>
        </div>

        <p className={css.infoCategory}>{story.category.name}</p>
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

        <FavoriteActions
          isAuthenticated={isAuthenticated}
          isFavorite={isFavorite}
          saving={saving}
          onToggle={toggleFavorite}
        />
      </div>
    </section>
  );
};

export default StoryDetails;
