'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import css from './AvatarPicker.module.css';

type Props = {
  onChangePhoto: (file: File | null) => void;
  profilePhotoUrl?: string;
};

const AvatarPicker = ({ profilePhotoUrl, onChangePhoto }: Props) => {
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (profilePhotoUrl) {
      setPreviewUrl(profilePhotoUrl);
    }
  }, [profilePhotoUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Only images');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Max file size 5MB');
      return;
    }

    onChangePhoto(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={css.avatarBlock}>
      <label className={css.label}>Аватар</label>

      <div className={css.avatarContainer}>
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Preview"
            className={css.avatar}
            width={117}
            height={117}
            unoptimized
          />
        ) : (
          <div className={css.placeholder}>No image</div>
        )}

        <button
          type="button"
          className={css.uploadFotoBtn}
          onClick={() => document.getElementById('avatarInput')?.click()}
        >
          Завантажити фото
        </button>

        <input
          id="avatarInput"
          type="file"
          accept="image/*"
          className={css.fileInput}
          onChange={handleFileChange}
        />
      </div>

      {error && <p>{error}</p>}
    </div>
  );
};

export default AvatarPicker;
