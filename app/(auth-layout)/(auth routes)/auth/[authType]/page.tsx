import React from 'react';
import RegistrationForm from '@/components/Auth/RegistrationForm/RegistrationForm';
import LoginForm from '@/components/Auth/LoginForm/LoginForm';
import Link from 'next/link';

type AuthProps = { params: Promise<{ authType: 'register' | 'login' }> };

export default async function AuthPage({ params }: AuthProps) {
  const { authType } = await params;
  const isRegister = authType === 'register';
  const isLogin = authType === 'login';

  return (
    <>
      <Link href={'/auth/register'}>Реєстрація</Link>
      <Link href={'/auth/login'}>Вхід</Link>
      {isRegister ? <RegistrationForm /> : <LoginForm />}
    </>
  );
}
