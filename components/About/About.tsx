import React from 'react';
import Image from 'next/image';
import css from './About.module.css';

const About: React.FC = () => {
  return (
    <section className={css.sectionAbout} aria-labelledby="about-title">
      <div className={css.aboutContent}>
        <h2 id="about-title" className="mainTitle">
          Проєкт, створений для тих, хто живе подорожами
        </h2>
        <p className={css.description}>
          Ми віримо, що кожна подорож — це унікальна історія, варта того, щоб
          нею поділилися. Наша платформа створена, щоб об&apos;єднати людей,
          закоханих у відкриття нового. Тут ви можете ділитися власним досвідом,
          знаходити друзів та надихатися на наступні пригоди разом з нами.
        </p>
      </div>
      <div className={css.featuresContainer}>
        <ul className={css.features}>
          <li className={css.feature}>
            <Image
              src="/icons/mission.svg"
              alt="Наша місія"
              width={48}
              height={48}
            />
            <h3 className={css.featureTitle}>Наша місія</h3>
            <p className={css.featureDescription}>
              Об&apos;єднувати людей через любов до пригод та надихати на нові
              відкриття.
            </p>
          </li>
        </ul>
        <ul className={css.features}>
          <li className={css.feature}>
            <Image
              src="/icons/mission.svg"
              alt="Наша місія"
              width={48}
              height={48}
            />
            <h3 className={css.featureTitle}>Автентичні історії</h3>
            <p className={css.featureDescription}>
              Ми цінуємо справжні, нередаговані враження від мандрівників з
              усього світу.
            </p>
          </li>
        </ul>
        <ul className={css.features}>
          <li className={css.feature}>
            <Image
              src="/icons/mission.svg"
              alt="Наша місія"
              width={48}
              height={48}
            />
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
