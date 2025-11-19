'use client';

import { useState } from 'react';
import css from './ChangeEmailModal.module.css';

interface Props {
  onCancel: () => void;
  onSubmit: (email: string) => Promise<void>;
}

export default function ChangeEmailModal({ onCancel, onSubmit }: Props) {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h2 className={css.title}>Змінити пошту</h2>

      <label className={css.label}>
        Нова пошта:
        <input
          type="email"
          className={css.input}
          value={email}
          max={64}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </label>

      <div className={css.actions}>
        <button type="button" onClick={onCancel} className={css.cancel}>
          Скасувати
        </button>

        <button type="submit" className={css.saveBtn}>
          Відправити
        </button>
      </div>
    </form>
  );
}
