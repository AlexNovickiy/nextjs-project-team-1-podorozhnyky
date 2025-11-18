'use client';

import { updateProfile } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../lib/store/authStore';
import AvatarPicker from '../AvatarPicker/AvatarPicker';
import css from './EditProfile.module.css';

const EditProfile = () => {
  const { user } = useAuthStore();
  const setUser = useAuthStore(state => state.setUser);
  const router = useRouter();

  const [description, setDescription] = useState('');
  const [initialDescription, setInitialDescription] = useState('');
  const [initialAvatar, setInitialAvatar] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      setDescription(user.description || '');
      setInitialDescription(user.description || '');
      setInitialAvatar(user.avatarUrl || '');
    }
  }, [user]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const isChanged = description !== initialDescription || imageFile !== null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('description', description);

    if (imageFile) {
      formData.append('avatar', imageFile);
    }

    try {
      const updatedUser = await updateProfile(formData);

      setUser(updatedUser);
      toast.success('Профіль оновлено!');
      router.push('/profile');
    } catch {
      toast.error('Не вдалося оновити профіль');
    }
  };

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Давайте познайомимось ближче</h1>

      <AvatarPicker
        profilePhotoUrl={user?.avatarUrl}
        onChangePhoto={setImageFile}
      />

      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.descriptionBlock}>
          <label htmlFor="description" className={css.label}>
            Короткий опис
          </label>

          <textarea
            name="description"
            id="description"
            value={description}
            className={css.textarea}
            onChange={handleChange}
            maxLength={150}
            placeholder="Розкажіть більше про вас"
          ></textarea>

          <span className={css.charCount}>
            Лишилось символів: {150 - description.length}
          </span>
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.saveBtn} disabled={!isChanged}>
            Зберегти
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
