'use client';
import Link from 'next/link';
import css from './AuthNavigation.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function AuthNavigation() {
  const { user } = useAuthStore();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const finalStoryButtonEl = isHomePage
    ? `${css.storyButtonElAuth} ${css.storyButtonElTransparentAuth}`
    : css.storyButtonElAuth;

  return (
    <>
      <li>
        <Link href="/profile" prefetch={false} className={css.headerLinkNav}>
          Мій Профіль
        </Link>
      </li>
      <li className={finalStoryButtonEl}>
        <Link
          href="/stories/create/"
          className={css.storyLinkElAuth}
          prefetch={false}
        >
          Опублікувати Історію
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          {user?.avatarUrl ? (
            <Image
              src={user?.avatarUrl}
              alt={`${user?.name}'s photo`}
              width={32}
              height={32}
              className={css.userPhoto}
            />
          ) : (
            <div className={css.userDefaultPhoto}></div>
          )}
        </Link>
        <Link href="/user-edit" prefetch={false} className={css.headerLinkNav}>
          {user?.name ? user?.name : "Ім'я"}
        </Link>
        <span className={css.line}></span>
      </li>
    </>
  );
}
