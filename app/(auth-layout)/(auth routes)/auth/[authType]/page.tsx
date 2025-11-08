import React from 'react';
import RegistrationForm from '@/components/Auth/RegistrationForm/RegistrationForm';
import LoginForm from '@/components/Auth/LoginForm/LoginForm';
import Link from 'next/link';

type Props = { params: { authType: 'register' | 'login' } };

export default function AuthPage({ params }: Props) {
  const isRegister = params.authType === 'register';

  return (
    <>
      <Link href={'/auth/register'}>Реєстрація</Link>
      <Link href={'/auth/login'}>Вхід</Link>
      {params.authType === 'register' ? <RegistrationForm /> : <LoginForm />}
    </>
  );
}
