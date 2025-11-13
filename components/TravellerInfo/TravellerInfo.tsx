'use client';

import React, { useEffect, useState } from 'react';
import css from './TravellerInfo.module.css';
import { IUser } from '@/types/user';
import { fetchAuthorById } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';
import Image from 'next/image';

type TravellerInfoProps = { travellerId?: string };

const TravellerInfo: React.FC<TravellerInfoProps> = ({ travellerId }) => {
  const [traveller, setTraveller] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!travellerId) {
      return;
    }
    const loadTraveller = async () => {
      try {
        setIsLoading(true);

        const data = await fetchAuthorById(travellerId);
        setTraveller(data);
      } catch (error) {
        console.error('Помилка завантаження мандрівника:', error);
        toast.error('Не вдалось завантажити дані про мандрівника.');
      } finally {
        setIsLoading(false);
      }
    };
    loadTraveller();
  }, [travellerId]);

  if (isLoading) {
    return (
      <section className={css.travellerInfo} aria-label="traveller info">
        <p>Завантаження інформації про мандрівника...</p>
      </section>
    );
  }

  if (!traveller) {
    return null;
  }

  return (
    <section className={css.travellerInfo} aria-label="traveller info">
      <div className={css.travellerImage}>
        <Image
          src={traveller.avatarUrl}
          alt={`Фото мандрівника ${traveller.name}`}
          width={199}
          height={199}
          className={css.avatar}
        />
      </div>

      <div className={css.travellerDetails}>
        <h3 className={css.travellerName}>{traveller.name}</h3>
        <p className={css.travellerDescription}>{traveller.description}</p>
      </div>
    </section>
  );
};

export default TravellerInfo;
