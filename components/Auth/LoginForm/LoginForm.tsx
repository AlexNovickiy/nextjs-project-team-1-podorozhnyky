'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuthStore } from '@/lib/store/authStore';

interface LoginValues {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string().email('Невірний email').required('Обовʼязкове поле'),
  password: Yup.string().required('Обовʼязкове поле'),
});

export default function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (
    values: LoginValues,
    helpers: FormikHelpers<LoginValues>
  ) => {
    const { setSubmitting, setStatus } = helpers;
    try {
      setStatus(null);
      const data = await axios.post('/api/auth/login', values);
      setUser(data.data.user);
      router.push('/profile');
    } catch (error: unknown) {
      const message =
        axios.isAxiosError(error) &&
        error.response?.data &&
        typeof error.response.data === 'object'
          ? ((error.response.data as { message?: string }).message ??
            'Помилка входу')
          : error instanceof Error
            ? error.message
            : 'Помилка входу';
      setStatus(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-form">
      <Formik
        initialValues={{ email: '', password: '' } as LoginValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, status }) => (
          <Form noValidate>
            <h1>Увійти</h1>

            <div className="field">
              <label htmlFor="email">Email</label>
              <Field id="email" name="email" type="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="field">
              <label htmlFor="password">Пароль</label>
              <Field id="password" name="password" type="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            {status && <div className="status">{status}</div>}

            <button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? 'Вхід...' : 'Увійти'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
