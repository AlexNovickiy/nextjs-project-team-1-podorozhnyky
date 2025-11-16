'use client';
import Link from 'next/link';
import { logout } from '../../lib/api/clientApi';
import { useAuthStore } from '../../lib/store/authStore';
import css from './Header.module.css';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import { usePathname } from 'next/navigation';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useState } from 'react';
import mainCss from '@/app/Home.module.css';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

export default function Header() {
  const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore();
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await logout();
      if (res?.message) {
        clearIsAuthenticated();
      }
      setIsOpenConfirmModal(false);
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    } catch {
      alert('Logout error');
    }
  };

  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const finalHeaderClass = isHomePage
    ? `${css.header} ${css.headerTransparent}`
    : css.header;
  const finalNavigationReg = isHomePage
    ? `${css.navigationReg} ${css.navTransparentReg}`
    : css.navigationReg;
  const finalNavigationLog = isHomePage
    ? `${css.navigationLog} ${css.navTransparentLog}`
    : css.navigationLog;
  const finalMenuButton = isHomePage
    ? `${css.mobileMenuButtonNoTransparent} ${css.mobileMenuButtonTransparent}`
    : css.mobileMenuButtonNoTransparent;
  const finalStoryTabButton = isHomePage
    ? `${css.storyTabMain} ${css.storyTabTransp}`
    : css.storyTabMain;
  return (
    <>
      <header className={finalHeaderClass}>
        <div className={mainCss.container}>
          <div className={css.headerContainer}>
            <Link className={css.headerLinkLogo} href="/">
              <div className={css.logo_icon}>
                <svg className={css.logo_iconSvg} width="23" height="23">
                  <use href="/sprite.svg#icon-plant_logo" />
                </svg>
              </div>
              <span className={css.logoName}>Подорожники</span>
            </Link>

            <div className={css.navAndMenuControls}>
              <nav aria-label="Main Navigation" className={css.navigation}>
                <ul className={css.navList}>
                  <li className={css.navigationItem}>
                    <Link className={css.headerLinkNav} href="/">
                      Головна
                    </Link>
                  </li>
                  <li className={css.navigationItem}>
                    <Link className={css.headerLinkNav} href="/stories">
                      Історії
                    </Link>
                  </li>
                  <li className={css.navigationItem}>
                    <Link className={css.headerLinkNav} href="/travellers">
                      Мандрівники
                    </Link>
                  </li>
                </ul>

                <ul className={css.navigationItemProfile}>
                  {isAuthenticated ? (
                    <>
                      <AuthNavigation />
                      <li className={css.LogoutListSvg}>
                        <button
                          className={css.logoutButtonSvg}
                          onClick={() => setIsOpenConfirmModal(true)}
                        >
                          <svg width="24" height="24">
                            <use href="/sprite.svg#icon-logout" />
                          </svg>
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li
                        className={`${css.navigationAuth} ${finalNavigationLog}`}
                      >
                        <Link
                          href="/auth/login"
                          prefetch={false}
                          className={css.linkAuth}
                        >
                          Вхід
                        </Link>
                      </li>
                      <li
                        className={`${css.navigationAuth} ${finalNavigationReg}`}
                      >
                        <Link
                          href="/auth/register"
                          prefetch={false}
                          className={css.linkAuth}
                        >
                          Реєстрація
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </nav>

              {isAuthenticated && (
                <button className={`${css.storyTablet} ${finalStoryTabButton}`}>
                  <Link
                    href="/stories/create/"
                    className={css.storyTabletLink}
                    prefetch={false}
                  >
                    Опублікувати Історію
                  </Link>
                </button>
              )}

              <button
                className={`${css.mobileMenuButtonBase} ${finalMenuButton}`}
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open mobile menu"
              >
                <svg width="24" height="24">
                  <use href="/sprite.svg#icon-menu" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isHomePage={isHomePage}
        isAuthenticated={isAuthenticated}
        user={user}
        handleLogout={() => setIsOpenConfirmModal(true)}
      />
      {isOpenConfirmModal && (
        <ConfirmModal
          onConfirm={handleLogout}
          onCancel={() => setIsOpenConfirmModal(false)}
          title="Ви точно хочете вийти?"
          text="Ми будемо сумувати за вами!"
          confirmButtonText="Вийти"
          cancelButtonText="Відмінити"
        />
      )}
    </>
  );
}
