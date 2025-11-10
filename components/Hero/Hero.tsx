import React from 'react';
import Link from 'next/link';
import css from './Hero.module.css';

const Hero: React.FC = () => {
  return (
    <section className={css.section} id="hero" aria-label="Hero section">
      <div className={css.backgroundImage} aria-hidden="true"></div>
      <div className={css.container}>
        <div className={css.content}>
          <h1 className={css.title}>Відкрийте світ подорожей з нами!</h1>
          <p className={css.description}>
            Приєднуйтесь до нашої спільноти мандрівників, де ви зможете ділитися
            своїми історіями та отримувати натхнення для нових пригод. Відкрийте
            для себе нові місця та знайдіть однодумців!
          </p>
          <Link href="/auth/register" aria-label="Зареєструватися">
            <button type="button" className={css.button}>
              Доєднатись
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
