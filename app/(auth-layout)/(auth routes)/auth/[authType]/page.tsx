import LoginForm from '@/components/Auth/LoginForm/LoginForm';
import RegistrationForm from '@/components/Auth/RegistrationForm/RegistrationForm';
import Link from 'next/link';
import css from './Auth.module.css';
type AuthProps = { params: Promise<{ authType: 'register' | 'login' }> };

export default async function AuthPage({ params }: AuthProps) {
  const { authType } = await params;
  const isRegister = authType === 'register';

  return (
    <>
      <div className={css.wrapper_btn}>
        <Link
          href="/auth/register"
          className={`${css.link} ${isRegister ? css.active : ''}`}
        >
          Реєстрація
        </Link>
        <Link
          href="/auth/login"
          className={`${css.link} ${!isRegister ? css.active : ''}`}
        >
          Вхід
        </Link>
      </div>

      {isRegister ? <RegistrationForm /> : <LoginForm />}
    </>
  );
}
