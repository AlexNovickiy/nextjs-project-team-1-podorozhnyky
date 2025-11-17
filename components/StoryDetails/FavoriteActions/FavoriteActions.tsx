'use client';

import { useRouter } from 'next/navigation';
import css from './FavoriteActions.module.css';

type Props = {
  isAuthenticated: boolean;
  isFavorite: boolean;
  saving: boolean;
  onToggle: () => void;
};

export default function FavoriteActions({
  isAuthenticated,
  isFavorite,
  saving,
  onToggle,
}: Props) {
  const router = useRouter();

  // ---- 1) НЕ АВТОРИЗОВАНИЙ -------------------------------------
  if (!isAuthenticated) {
    return (
      <div className={css.saveSection}>
        <h3 className={css.saveTitle}>Увійдіть, щоб зберегти історію</h3>
        <p className={css.saveText}>
          Ця функція доступна лише авторизованим користувачам.
        </p>

        <button
          className={css.saveButton}
          onClick={() => router.push('/auth/login')}
        >
          Увійти
        </button>
      </div>
    );
  }

  // ---- 2) АВТОРИЗОВАНИЙ — НЕ в обраних --------------------------
  if (!isFavorite) {
    return (
      <div className={css.saveSection}>
        <h3 className={css.saveTitle}>Збережіть собі історію</h3>
        <p className={css.saveText}>
          Вона буде доступна у вашому профілі у розділі збережене.
        </p>

        <button className={css.saveButton} onClick={onToggle} disabled={saving}>
          {saving ? 'Збереження...' : 'Зберегти'}
        </button>
      </div>
    );
  }

  // ---- 3) АВТОРИЗОВАНИЙ — В ОБРАНИХ ------------------------------
  return (
    <div className={css.saveSection}>
      <h3 className={css.saveTitle}>Історія у ваших збережених</h3>
      <p className={css.saveText}>
        Ви можете видалити її із розділу збережених.
      </p>

      <button className={css.saveButton} onClick={onToggle} disabled={saving}>
        {saving ? 'Видалення...' : 'Видалити'}
      </button>
    </div>
  );
}
