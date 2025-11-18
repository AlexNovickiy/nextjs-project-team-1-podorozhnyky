'use client';

import { useState } from 'react';

import css from './EditProfile.module.css';
import { updateProfile } from '@/lib/api/clientApi';
import AvatarPicker from '../AvatarPicker/AvatarPicker';

interface EditProfileProps {
  user: {
    _id: string;
    name: string;
    email: string;
    avatarUrl: string;
    description: string;
    favorites: string[];
  };
}
const EditProfile = ({ user }: EditProfileProps) => {
  const [description, setDescription] = useState(user.description || '');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('description', description);

    if (imageFile) {
      formData.append('userPhoto', imageFile);
    }

    await updateProfile(formData);
  };
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Давайте познайомимось ближче</h1>
      <AvatarPicker
        profilePhotoUrl={user.avatarUrl}
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
          <button type="submit" className={css.saveBtn}>
            Зберегти
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
