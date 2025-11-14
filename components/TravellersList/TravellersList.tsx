'use client';
import Image from 'next/image';
import { IUser } from '@/types/user';
import Link from 'next/link';
import css from './TravellersList.module.css';

interface TravellersListProps {
  users: IUser[];
}
const TravellersList = ({ users }: TravellersListProps) => {
  return (
    <div className={css.section}>
      <ul className={css.list}>
        {users.map(user => (
          <li key={user._id} className={css.card}>
            <Image
              src={user.avatarUrl}
              alt={user.name}
              className={css.image}
              width={112}
              height={112}
            />
            <div className={css.container}>
              <h2 className={css.name}>{user.name}</h2>
              <p className={css.text}>{user.description}</p>
              <Link href="/travellers/:travallerId" className={css.button}>
                Переглянути профіль
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TravellersList;
