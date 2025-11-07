import React from 'react';
import RegistrationForm from '@/components/Auth/RegistrationForm/RegistrationForm';
import LoginForm from '@/components/Auth/LoginForm/LoginForm';

type Props = { params: { authType: 'register' | 'login' } };

export default function AuthPage({ params }: Props) {
  return (
    <>{params.authType === 'register' ? <RegistrationForm /> : <LoginForm />}</>
  );
}
