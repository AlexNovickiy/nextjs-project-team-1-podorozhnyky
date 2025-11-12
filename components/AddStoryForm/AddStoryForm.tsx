'use client';

import { Form, Formik, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useId, useEffect, useState, useRef } from 'react';
import React from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ICategory } from '../../types/category';
import css from './AddStoryForm.module.css';
import Image from 'next/image';

const validationSchema = Yup.object<FormValues>({
  storyImage: Yup.mixed<File>()
    .nullable()
    .required("Зображення є обов'язковим")
    .test('fileSize', 'Розмір файлу не повинен перевищувати 2 МБ.', value => {
      return value ? value.size <= 2 * 1024 * 1024 : true;
    })
    .test(
      'fileType',
      'Невірний формат файлу',
      value =>
        !value ||
        ['image/webp', 'image/jpeg', 'image/png', 'image/gif'].includes(
          value.type
        )
    ),
  title: Yup.string()
    .required("Заголовок є обов'язковим")
    .max(80, 'Максимальна довжина заголовка - 80 символів'),
  category: Yup.string().required("Категорія є обов'язковою"),
  shortDescription: Yup.string().max(
    61,
    'Максимальна довжина опису - 61 символ'
  ),
  description: Yup.string()
    .required("Текст історії є обов'язковим")
    .max(2500, 'Текст повинен бути не більше 2500 символів'),
});

interface FormValues {
  storyImage: File | null;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
}

const formValues: FormValues = {
  storyImage: null,
  title: '',
  category: '',
  shortDescription: '',
  description: '',
};

const mockCategories = [
  { _id: '68fb50c80ae91338641121f0', name: 'Азія' },
  { _id: '68fb50c80ae91338641121f1', name: 'Гори' },
  { _id: '68fb50c80ae91338641121f2', name: 'Європа' },
  { _id: '68fb50c80ae91338641121f3', name: 'Америка' },
  { _id: '68fb50c80ae91338641121f4', name: 'Африка' },
  { _id: '68fb50c80ae91338641121f6', name: 'Пустелі' },
  { _id: '68fb50c80ae91338641121f7', name: 'Балкани' },
  { _id: '68fb50c80ae91338641121f8', name: 'Кавказ' },
  { _id: '68fb50c80ae91338641121f9', name: 'Океанія' },
];

const AddStoryForm = ({}: { storyId?: string }) => {
  const fieldId = useId();
  const [initialValues, setInitialValues] = useState<FormValues>(formValues);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [modalError, setModalError] = useState(false);
  const [preview, setPreview] = useState<string>('/placeholder-image.png');
  const previewUrlRef = useRef<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const maxDescriptionLength = 61;
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      const formData = new FormData();
      formData.append('storyImage', values.storyImage as File);
      formData.append('title', values.title);
      formData.append('category', values.category);
      formData.append('shortDescription', values.shortDescription);
      formData.append('description', values.description);

      const response = await axios.post('/api/stories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        router.push(`/stories/${response.data.storyId}`);
        resetForm();
      }
    } catch (error) {
      setModalError(true);
      console.error('Помилка при збереженні історії:', error);
    }
  };

  useEffect(() => {
    setCategories(mockCategories);

    if (mockCategories.length > 0) {
      setInitialValues(prevValues => ({
        ...prevValues,
        category: mockCategories[0]._id,
      }));
    }
  }, []);

  // Render only on client to avoid hydration mismatches from browser extensions
  useEffect(() => {
    setMounted(true);
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {modalError && (
        <div className={css.modalError}>
          <p>Помилка при збереженні історії. Спробуйте ще раз.</p>
          <button onClick={() => setModalError(false)}>Закрити</button>
        </div>
      )}

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={validationSchema}
        validateOnMount={true}
      >
        {({ isValid, values, setFieldValue, isSubmitting }) => (
          <Form noValidate className={css.form}>
            <div className={css.formGroupInput}>
              <label>Oбкладинка статті</label>
              <Image
                src={preview}
                alt="Прев'ю"
                className="cover-preview"
                width={400}
                height={225}
                unoptimized
              />

              <button
                type="button"
                className={css.uploadBtn}
                onClick={() => fileInputRef.current?.click()}
              >
                Завантажити фото
              </button>

              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={e => {
                  const fileList = e.currentTarget.files?.[0] ?? null;
                  if (fileList) {
                    setFieldValue('storyImage', fileList, true);
                    // Update preview and revoke previous blob URL to prevent memory leaks
                    if (previewUrlRef.current) {
                      URL.revokeObjectURL(previewUrlRef.current);
                    }
                    const objectUrl = URL.createObjectURL(fileList);
                    previewUrlRef.current = objectUrl;
                    setPreview(objectUrl);
                  }
                }}
              />

              <label htmlFor={`${fieldId}-title`} className={css.label}>
                Заголовок
              </label>
              <Field
                type="text"
                name="title"
                id={`${fieldId}-title`}
                className={css.title}
                placeholder="Введіть заголовок історії"
              />
              <ErrorMessage
                name="title"
                component="div"
                className={css.error}
              />

              <label htmlFor={`${fieldId}-category`} className={css.label}>
                Категорія
              </label>
              <Field
                as="select"
                name="category"
                id={`${fieldId}-category`}
                className={css.select}
                placeholder="Категорія"
              >
                <option value="">Категорія</option>
                {categories.length > 0 ? (
                  categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Завантаження категорій...</option>
                )}
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className={css.error}
              />

              <label
                htmlFor={`${fieldId}-shortDescription`}
                className={css.label}
              >
                Короткий опис
              </label>
              <Field
                as="textarea"
                name="shortDescription"
                id={`${fieldId}-shortDescription`}
                className={css.shortDescription}
                placeholder="Введіть короткий опис історії"
              />
              <div className={css.descriptionCounter}>
                Лишилось символів:{' '}
                {maxDescriptionLength - (values.shortDescription?.length || 0)}
              </div>
              <ErrorMessage
                name="shortDescription"
                component="div"
                className={css.error}
              />

              <label htmlFor={`${fieldId}-description`} className={css.label}>
                Текст історії
              </label>
              <Field
                as="textarea"
                name="description"
                id={`${fieldId}-description`}
                className={css.description}
                placeholder="Ваша історія тут"
              />
              <ErrorMessage
                name="description"
                component="div"
                className={css.error}
              />
            </div>

            <div className={css.formGroupBtn}>
              <button
                type="submit"
                className={css.submitBtn}
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? 'Зберігається...' : 'Зберегти'}
              </button>
              <button type="button" className={css.cancelBtn}>
                Відмінити
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddStoryForm;
