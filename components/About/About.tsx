import React from 'react';
import css from './About.module.css';
import mainCss from '@/app/Home.module.css';

const About: React.FC = () => {
  return (
    <section className={css.section} aria-labelledby="about-title">
      <div className={mainCss.container}>
        <div className={css.aboutContent}>
          <h2 id="about-title" className={css.title}>
            Проєкт, створений для тих, хто живе подорожами
          </h2>
          <p className={css.description}>
            Ми віримо, що кожна подорож — це унікальна історія, варта того, щоб
            нею поділилися. Наша платформа створена, щоб об&apos;єднати людей,
            закоханих у відкриття нового. Тут ви можете ділитися власним
            досвідом, знаходити друзів та надихатися на наступні пригоди разом з
            нами.
          </p>
        </div>

        <ul className={css.featuresList}>
          <li className={css.feature}>
            <svg className={css.icon} width="48" height="48">
              <use href="/sprite.svg#icon-wand_stars"></use>
            </svg>
            <h3 className={css.featureTitle}>Наша місія</h3>
            <p className={css.featureDescription}>
              Об&apos;єднувати людей через любов до пригод та надихати на нові
              відкриття.
            </p>
          </li>

          <li className={css.feature}>
            <svg className={css.icon} width="48" height="48">
              <use href="/sprite.svg#icon-travel_luggage_and_bags"></use>
            </svg>
            <h3 className={css.featureTitle}>Автентичні історії</h3>
            <p className={css.featureDescription}>
              Ми цінуємо справжні, нередаговані враження від мандрівників з
              усього світу.
            </p>
          </li>

          <li className={css.feature}>
            <svg className={css.icon} width="48" height="48">
              <use href="/sprite.svg#icon-communication"></use>
            </svg>
            <h3 className={css.featureTitle}>Ваша спільнота</h3>
            <p className={css.featureDescription}>
              Станьте частиною спільноти, де кожен може бути і автором, і
              читачем.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default About;
