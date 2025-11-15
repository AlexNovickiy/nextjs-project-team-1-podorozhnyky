'use client';

import React, { useEffect, useState } from 'react';
import css from './TravellerInfo.module.css';
import { IUser } from '@/types/user';
import { fetchAuthorById } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';
import Image from 'next/image';

type TravellerInfoProps = { travellerId?: string; traveller?: IUser | null };

// const MOCK_TRAVELLER: IUser = {
//   _id: 'mock-1',
//   name: 'Дмитро Романенко',
//   description:
//     'Привіт! Я Дмитро. Люблю знаходити приховані перлини у кожній поїздці та ділитися ними. Світ повний дивовижних відкриттів!',
//   avatarUrl: '/images/avatar.jpg',
//   email: 'alex@example.com',
//   favorites: [],
//   createdAt: new Date().toISOString(),
//   updatedAt: new Date().toISOString(),
// };

const TravellerInfo: React.FC<TravellerInfoProps> = ({
  travellerId,
  traveller,
}) => {
  const [localTraveller, setLocalTraveller] = useState<IUser | null>(
    traveller ?? null
  );
  // const [localTraveller, setLocalTraveller] = useState<IUser | null>(
  //   traveller ?? MOCK_TRAVELLER
  // );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (traveller) return;

    if (!travellerId) return;

    const loadTraveller = async () => {
      try {
        setIsLoading(true);

        const data = await fetchAuthorById(travellerId);
        console.log('Loaded traveller data:', data.data);
        setLocalTraveller(data.data.user);
      } catch (error) {
        console.error('Помилка завантаження мандрівника:', error);
        toast.error('Не вдалось завантажити дані про мандрівника.');
      } finally {
        setIsLoading(false);
      }
    };
    loadTraveller();
  }, [traveller, travellerId]);

  if (isLoading && !localTraveller) {
    return (
      <section className={css.travellerInfo} aria-label="traveller info">
        <p>Завантаження інформації про мандрівника...</p>
      </section>
    );
  }

  if (!localTraveller) {
    return null;
  }

  return (
    <section className={css.travellerInfo} aria-label="traveller info">
      <div className={css.travellerImage}>
        <Image
          src={localTraveller.avatarUrl || '/placeholder-image.png'}
          alt={`Фото мандрівника ${localTraveller.name}`}
          width={199}
          height={199}
          className={css.avatar}
          priority={true}
        />
      </div>

      <div className={css.travellerDetails}>
        <h3 className={css.travellerName}>{localTraveller.name}</h3>
        <p className={css.travellerDescription}>{localTraveller.description}</p>
      </div>
    </section>
  );
};

export default TravellerInfo;
