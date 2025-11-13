import Link from 'next/link';
import css from './MobileMenu.module.css';
import Image from 'next/image';
import { IUser } from '@/types/user';
import { useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isHomePage: boolean;
  isAuthenticated: boolean;
  user: Partial<IUser> | null;
  handleLogout: () => Promise<void>;
}

export default function MobileMenu({
  isOpen,
  onClose,
  isHomePage,
  isAuthenticated,
  user,
  handleLogout,
}: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const finalStoryButtonEl = isHomePage
    ? `${css.storyButtonElMob} ${css.storyButtonElTransparentMob}`
    : css.storyButtonElMob;

  const handleLogoutAndClose = async () => {
    await handleLogout();
    onClose();
  };

  return (
    <div className={css.menuOverlay} onClick={onClose}>
      <div className={css.menuContent} onClick={e => e.stopPropagation()}>
        <div className={css.menuInnerWrapper}>
          <div className={css.menuHeader}>
            <Link className={css.headerLinkLogo} href="/" onClick={onClose}>
              <div className={css.logo_icon}>
                <svg className={css.logo_iconSvg} width="23" height="23">
                  <use href="/sprite.svg#icon-plant_logo" />
                </svg>
              </div>
              <span className={css.logoName}>Подорожники</span>
            </Link>

            <button
              className={css.closeButton}
              onClick={onClose}
              aria-label="Close menu"
            >
              <svg width="24" height="24">
                <use href="/sprite.svg#icon-close" />
              </svg>
            </button>
          </div>

          <nav className={css.menuNav}>
            <Link href="/" onClick={onClose} className={css.menuLink}>
              Головна
            </Link>
            <Link href="/stories" onClick={onClose} className={css.menuLink}>
              Історії
            </Link>
            <Link href="/travellers" onClick={onClose} className={css.menuLink}>
              Мандрівники
            </Link>

            {isAuthenticated && (
              <Link
                href="/profile"
                prefetch={false}
                className={`${css.menuLink} ${css.menuLinkAuth}`}
                onClick={onClose}
              >
                Мій Профіль
              </Link>
            )}
          </nav>

          <div className={css.authButtons}>
            {isAuthenticated ? (
              <div className={css.authContent}>
                <div className={finalStoryButtonEl}>
                  <Link
                    href="/stories-create/create"
                    className={css.storyLinkElMob}
                    prefetch={false}
                    onClick={onClose}
                  >
                    Опублікувати Історію
                  </Link>
                </div>

                <div className={css.navUserWrapper}>
                  <Link
                    href="/profile"
                    prefetch={false}
                    className={css.profileLinkMobile}
                    onClick={onClose}
                  >
                    {user?.avatarUrl ? (
                      <Image
                        src={user.avatarUrl}
                        alt={`${user.name}'s photo`}
                        width={32}
                        height={32}
                        className={css.userPhoto}
                      />
                    ) : (
                      <div className={css.userDefaultPhoto}></div>
                    )}
                    <span className={css.mobUserName}>
                      {user?.name ? user.name : "Ім'я"}
                    </span>
                  </Link>

                  <div className={css.lineEl}>
                    <span className={css.line}></span>
                  </div>

                  <button
                    className={css.logoutButtonSvg}
                    onClick={handleLogoutAndClose}
                  >
                    <svg width="24" height="24">
                      <use href="/sprite.svg#icon-logout" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div className={css.authButtons}>
                <Link
                  href="/auth/login"
                  onClick={onClose}
                  className={`${css.menuButton} ${css.menuButtonLogin}`}
                >
                  Вхід
                </Link>

                <Link
                  href="/auth/register"
                  onClick={onClose}
                  className={`${css.menuButton} ${css.menuButtonRegister}`}
                >
                  Реєстрація
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
