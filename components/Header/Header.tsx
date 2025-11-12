'use client';
import Link from 'next/link';
import { logout } from '../../lib/api/clientApi';
import { useAuthStore } from '../../lib/store/authStore';
import css from './Header.module.css';

export default function Header() {
  const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore();
  const handleLogout = async () => {
    try {
      const res = await logout();

      if (res?.message) {
        clearIsAuthenticated();
      }
    } catch {
      alert('Logout error');
    }
  };

  if (!isAuthenticated) {
    return (
      <div>
        <p>❌ Ви не авторизовані</p>
        <Link href="/auth/login">Увійти</Link>
      </div>
    );
  }
  return (
    <header className={css.header}>
      <div>
        <p className={css.greeting}>👋 Привіт, {user?.name}</p>

        <button
          style={{ color: 'white' }}
          onClick={() => {
            handleLogout();
          }}
        >
          Вийти
        </button>
      </div>
    </header>
  );
}
