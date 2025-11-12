'use client';

import css from './Join.module.css';
import mainCss from '@/app/Home.module.css';

import React from 'react';
import { useRouter } from 'next/navigation';

type Props = { isAuthenticated?: boolean };

const Join: React.FC<Props> = ({ isAuthenticated = false }) => {
  const router = useRouter();

  const handleClick = () => {
    const route = isAuthenticated ? '/profile' : '/auth/register';
    router.push(route);
  };

  return (
    <div className={mainCss.container}>
      <section
        id="join"
        aria-labelledby="join-title"
        className={css.join_section}
      >
        <div className={css.texts}>
          <h2 id="join-title" className={css.join_to}>
            Приєднуйтесь до нашої <br className={css.tab}></br>спільноти
          </h2>
          <p className={css.description}>
            {' '}
            Долучайтеся до мандрівників, які діляться своїми історіями та
            надихають на нові пригоди.
          </p>
          <button type="button" className={css.button} onClick={handleClick}>
            {isAuthenticated ? 'Збережені' : 'Зареєструватися'}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Join;
