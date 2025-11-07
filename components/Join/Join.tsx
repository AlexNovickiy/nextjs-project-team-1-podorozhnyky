'use client';

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
    <section id="join" aria-labelledby="join-title" className="join-section">
      <h2 id="join-title">Приєднуйтесь до нашої спільноти</h2>
      <p className="join-description">Описова частина секції Join.</p>
      <button type="button" className="join-button" onClick={handleClick}>
        {isAuthenticated ? 'Збережені' : 'Зареєструватися'}
      </button>
    </section>
  );
};

export default Join;
