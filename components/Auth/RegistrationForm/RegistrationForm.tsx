'use client';

import { useAuthStore } from '@/lib/store/authStore';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import * as Yup from 'yup';
import { register } from '../../../lib/api/clientApi';
import css from './RegistrationForm.module.css';

interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

const registerSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Занадто коротке імʼя')
    .max(32, 'Максимум 32 символи')
    .required('Обовʼязкове поле'),
  email: Yup.string()
    .email('Невірний email')
    .max(64, 'Максимум 64 символи')
    .required('Обовʼязкове поле'),
  password: Yup.string()
    .min(8, 'Мінімум 8 символів')
    .max(128, 'Максимум 128 символів')
    .required('Обовʼязкове поле'),
});

export default function RegistrationForm() {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (
    values: RegisterValues,
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
      const { data } = await register(values);
      setUser(data.user);
      router.push('/');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;

        if (status === 400) {
          setStatus('Некоректні дані для реєстрації.');
          return;
        }
        if (status === 409) {
          setStatus('Користувач з такою поштою вже існує.');
          return;
        }

        setStatus('Реєстрація не виконана. Спробуйте ще раз.');
        return;
      }

      setStatus('Невідома помилка. Спробуйте ще раз.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.authForm}>
      <Formik<RegisterValues>
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={registerSchema}
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
            <h1 className={css.title}>Реєстрація</h1>
            <p className={css.text}>
              Раді вас бачити у спільноті мандрівників!
            </p>

            <div className={css.field}>
              <label htmlFor="name" className={css.label}>
                Імʼя та Прізвище*
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="Ваше імʼя та прізвище"
                className={`${css.input} ${
                  (errors.name && touched.name) || status ? css.input_error : ''
                }`}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  if (status) setStatus(null);
                }}
              />
              <ErrorMessage name="name" component="div" className={css.error} />
            </div>

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

            <div className={css.field}>
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
              {isSubmitting ? 'Реєстрація...' : 'Зареєструватись'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
