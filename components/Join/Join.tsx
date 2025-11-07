import React from 'react';
import { useRouter } from 'next/router';

type Props = { isAuthenticated?: boolean };

const Join: React.FC<Props> = ({ isAuthenticated = false }) => {
  const router = useRouter();
  const handleClick = () => {
    const route = isAuthenticated ? '/profile' : '/auth/register';
    router.push(route);
  };

  return (
    <section id="join" aria-labelledby="join-title">
      <h2 id="join-title">Приєднуйтесь до нашої спільноти</h2>
      <p>Описова частина секції Join.</p>
      <button type="button" onClick={handleClick}>
        {isAuthenticated ? 'Збережені' : 'Зареєструватися'}
      </button>
    </section>
  );
};

export default Join;
