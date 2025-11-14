import React from 'react';
import Link from 'next/link';
import css from '../../app/Home.module.css';
import style from './Hero.module.css';

const Hero: React.FC = () => {
  return (
    <section className={style.section} id="hero" aria-label="Hero section">
      <div className={style.backgroundImage} aria-hidden="true"></div>
      <div className={css.container}>
        <div className={style.content}>
          <h1 className={style.title}>Відкрийте світ подорожей з нами!</h1>
          <p className={style.description}>
            Приєднуйтесь до нашої спільноти мандрівників, де ви зможете ділитися
            своїми історіями та отримувати натхнення для нових пригод. Відкрийте
            для себе нові місця та знайдіть однодумців!
          </p>
          <Link href="#join" aria-label="Зареєструватися">
            <button type="button" className={style.button}>
              Доєднатись
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
