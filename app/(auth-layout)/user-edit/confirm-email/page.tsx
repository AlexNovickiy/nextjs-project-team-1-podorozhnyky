'use client';

import Modal from '@/components/Modal/Modal';
import { confirmEmail } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import css from './confirm-email.module.css';
export default function ConfirmEmail() {
  const params = useSearchParams();
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  const token = params.get('token');
  const newEmail = params.get('newEmail');

  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token || !newEmail) {
      router.replace('/user-edit');
    }
  }, [token, newEmail, router]);

  const handleConfirm = async () => {
    setLoading(true);

    try {
      const data = await confirmEmail(token!, newEmail!);

      setUser(data.user);
      toast.success('Пошту успішно змінено!');
      router.push('/profile');
    } catch {
      toast.error('Не вдалося змінити пошту');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.replace('/user-edit');
  };

  if (!token || !newEmail) return null;

  return (
    <>
      {isOpen && (
        <Modal onClose={handleCancel}>
          <div className={css.wrapper}>
            <h2 className={css.tittle}>Підтвердити зміну пошти?</h2>

            <p className={css.text}>
              Ви хочете змінити email на:
              <br />
              <strong>{newEmail}</strong>?
            </p>

            <div className={css.actions}>
              <button onClick={handleCancel} className={css.cancel}>
                Скасувати
              </button>

              <button
                onClick={handleConfirm}
                disabled={loading}
                className={css.saveBtn}
              >
                {loading ? 'Зачекайте...' : 'Так, змінити'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
