'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import * as Yup from 'yup';
import { login } from '../../../lib/api/clientApi';
import LoginGoogleBtn from '../../LoginGoogleBtn/LoginGoogleBtn';
import css from './LoginForm.module.css';
interface LoginValues {
  email: string;
  password: string;
}

const loginSchema = Yup.object({
  email: Yup.string()
    .email('Невірний email')
    .max(64, 'Максимум 64 символів')
    .required("Обов'язкове поле"),
  password: Yup.string()
    .min(8, 'Мінімум 8 символів')
    .max(128, 'Максимум 128 символів')
    .required("Обов'язкове поле"),
});

export default function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (
    values: LoginValues,
    {
      setSubmitting,
      setStatus,
    }: {
      setSubmitting: (s: boolean) => void;
      setStatus: (s: string | null) => void;
    }
  ) => {
    try {
      setStatus(null);
      const { data } = await login(values);
      setUser(data.user);
      router.push('/');
    } catch {
      setStatus('Вхід не виконано. Спробуйте ще раз.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.authForm}>
      <Formik<LoginValues>
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
        validateOnMount
      >
        {({
          isSubmitting,
          isValid,
          status,
          setStatus,
          handleChange,
          errors,
          touched,
        }) => (
          <Form noValidate className={css.form}>
            <h1 className={css.title}>Вхід</h1>
            <p className={css.text}>Вітаємо знову у спільноту мандрівників!</p>

            <div className={css.field}>
              <label htmlFor="email" className={css.label}>
                Пошта*
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="hello@podorozhnyky.ua"
                className={`${css.input} ${
                  (errors.email && touched.email) || status
                    ? css.input_error
                    : ''
                }`}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  if (status) setStatus(null);
                }}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </div>

            <div className={`${css.field} ${css.passwordField}`}>
              <label htmlFor="password" className={css.label}>
                Пароль*
              </label>
              <div className={css.passwordWrapper}>
                <Field
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  className={`${css.input} ${
                    (errors.password && touched.password) || status
                      ? css.input_error
                      : ''
                  }`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    if (status) setStatus(null);
                  }}
                />

                <button
                  type="button"
                  className={css.togglePassword}
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                <Link href="/auth/send-reset-email" className={css.forgotLink}>
                  Забули пароль?
                </Link>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
            </div>

            {status && <div className={css.status}>{status}</div>}

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={css.submitBtn}
            >
              {isSubmitting ? 'Вхід...' : 'Увійти'}
            </button>
            <LoginGoogleBtn />
          </Form>
        )}
      </Formik>
    </div>
  );
}
