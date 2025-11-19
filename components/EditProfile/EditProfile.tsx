'use client';

import { updateEmail, updateProfile } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../lib/store/authStore';
import AvatarPicker from '../AvatarPicker/AvatarPicker';
import ChangeEmailModal from '../ChangeEmailModal/ChangeEmailModal';
import Modal from '../Modal/Modal';

import css from './EditProfile.module.css';
import { AxiosError } from 'axios';

const EditProfile = () => {
  const { user } = useAuthStore();
  const setUser = useAuthStore(state => state.setUser);
  const router = useRouter();

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [initialName, setInitialName] = useState('');

  const [description, setDescription] = useState('');
  const [initialDescription, setInitialDescription] = useState('');

  const [initialAvatar, setInitialAvatar] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setInitialName(user.name || '');

      setDescription(user.description || '');
      setInitialDescription(user.description || '');

      setInitialAvatar(user.avatarUrl || '');
    }
  }, [user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    const formData = new FormData();

    formData.append('name', name);
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
    } finally {
      setSaving(false);
    }
  };

  const handleEmailChange = async (email: string) => {
    try {
      await updateEmail(email);
      toast.success(
        'На вашу стару пошту надіслано лист для підтвердження зміни.'
      );
      setIsEmailModalOpen(false);
    } catch (error) {
      if (error instanceof AxiosError && error.status === 409) {
        toast.error('Пошта вже використовується іншим користувачем.');
      } else {
        toast.error('Не вдалося змінити пошту. Спробуйте ще раз.');
      }
    }
  };

  const isChanged =
    (name !== initialName ||
      description !== initialDescription ||
      imageFile !== null) &&
    name.trim().length > 0 &&
    !nameError;

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Давайте познайомимось ближче</h1>
      <div className={css.PhotoEmailBlock}>
        <div className={css.EmailBlock}>
          <p className={css.email}>Пошта: {user?.email}</p>
          <button
            type="button"
            className={css.changeEmailBtn}
            onClick={() => setIsEmailModalOpen(true)}
          >
            Змінити пошту
          </button>
        </div>
        <AvatarPicker
          profilePhotoUrl={user?.avatarUrl}
          onChangePhoto={setImageFile}
        />
      </div>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.descriptionBlock}>
          <label htmlFor="name" className={css.label}>
            Ім&apos;я
          </label>

          <input
            id="name"
            name="name"
            type="text"
            className={css.input}
            value={name}
            onChange={e => {
              const val = e.target.value;
              setName(val);

              if (val.trim().length === 0) {
                setNameError('Імʼя не може бути порожнім');
              } else {
                setNameError('');
              }
            }}
            maxLength={30}
            placeholder="Введіть ім'я"
          />
          {nameError ? (
            <span className={css.errorName}>{nameError}</span>
          ) : (
            <span className={css.charCount}>
              Лишилось символів: {30 - name.length}
            </span>
          )}
        </div>

        <div className={css.descriptionBlock}>
          <label htmlFor="description" className={css.label}>
            Короткий опис
          </label>

          <textarea
            name="description"
            id="description"
            value={description}
            className={css.textarea}
            onChange={e => setDescription(e.target.value)}
            maxLength={150}
            placeholder="Розкажіть більше про вас"
          ></textarea>

          <span className={css.charCount}>
            Лишилось символів: {150 - description.length}
          </span>
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.saveBtn} disabled={!isChanged}>
            {saving ? 'Збереження…' : 'Зберегти'}
          </button>
        </div>
      </form>

      {/*  Email modal */}
      {isEmailModalOpen && (
        <Modal onClose={() => setIsEmailModalOpen(false)}>
          <ChangeEmailModal
            onCancel={() => setIsEmailModalOpen(false)}
            onSubmit={handleEmailChange}
          />
        </Modal>
      )}
    </div>
  );
};

export default EditProfile;
