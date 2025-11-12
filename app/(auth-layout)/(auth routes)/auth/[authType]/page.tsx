import GetOauthUrl from '@/components/Auth/GetOauthUrl/GetOauthUrl';
import LoginForm from '@/components/Auth/LoginForm/LoginForm';
import RegistrationForm from '@/components/Auth/RegistrationForm/RegistrationForm';
import ResetPasswordForm from '@/components/Auth/ResetPasswordForm/ResetPasswordForm';
import SendResetEmailForm from '@/components/Auth/SendResetEmail/SendResetEmailForm';
import Link from 'next/link';
import css from './Auth.module.css';
type AuthProps = {
  params: Promise<{
    authType:
      | 'register'
      | 'login'
      | 'send-reset-email'
      | 'reset-pwd'
      | 'get-oauth-url';
  }>;
};

export default async function AuthPage({ params }: AuthProps) {
  const { authType } = await params;

  const isRegister = authType === 'register';
  const isLogin = authType === 'login';
  const isSendResetEmail = authType === 'send-reset-email';
  const isResetPwd = authType === 'reset-pwd';
  const isGetOauthUrl = authType === 'get-oauth-url';

  return (
    <>
      {!isResetPwd && (
        <div className={css.wrapper_btn}>
          <Link
            href="/auth/register"
            className={`${css.link} ${isRegister ? css.active : ''}`}
          >
            Реєстрація
          </Link>
          <Link
            href="/auth/login"
            className={`${css.link} ${isLogin ? css.active : ''}`}
          >
            Вхід
          </Link>
        </div>
      )}

      {isRegister && <RegistrationForm />}
      {isLogin && <LoginForm />}
      {isSendResetEmail && <SendResetEmailForm />}
      {isResetPwd && <ResetPasswordForm />}
      {isGetOauthUrl && <GetOauthUrl />}
    </>
  );
}
