'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { nextServer } from '@/lib/api/api';
import axios from 'axios';

interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Занадто коротке імʼя')
    .required('Обовʼязкове поле'),
  email: Yup.string().email('Невірний email').required('Обовʼязкове поле'),
  password: Yup.string()
    .min(6, 'Пароль мінімум 6 символів')
    .required('Обовʼязкове поле'),
});

export default function RegistrationForm() {
  const router = useRouter();

  const handleSubmit = async (
    values: RegisterValues,
    helpers: FormikHelpers<RegisterValues>
  ) => {
    const { setSubmitting, setStatus } = helpers;
    try {
      setStatus(null);
      await nextServer.post('/api/auth/register', values);
      router.push('/auth/login');
    } catch (error: unknown) {
      const message =
        axios.isAxiosError(error) &&
        error.response?.data &&
        typeof error.response.data === 'object'
          ? ((error.response.data as { message?: string }).message ??
            'Помилка реєстрації')
          : error instanceof Error
            ? error.message
            : 'Помилка реєстрації';
      setStatus(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-form">
      <Formik
        initialValues={{ name: '', email: '', password: '' } as RegisterValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, status }) => (
          <Form noValidate>
            <h1>Реєстрація</h1>

            <div className="field">
              <label htmlFor="name">Ім&apos;я</label>
              <Field id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

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
              {isSubmitting ? 'Реєстрація...' : 'Зареєструватися'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
