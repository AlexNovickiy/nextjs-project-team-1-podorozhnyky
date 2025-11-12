'use client';

import { Form, Formik, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useId, useEffect, useState, use } from 'react';
import React from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ICategory } from '../../types/category';

//import { fetchCategories } from '@/lib/api/serverApi';
import css from './AddStoryForm.module.css';

const validationSchema = Yup.object<FormValues>({
  storyImage: Yup.mixed<File>()
  .required("Зображення є обов'язковим")
  .test(
    'fileSize',
    'Розмір файлу не повинен перевищувати 2 МБ.',
    value => {
      return value && value.size <= 2 * 1024 * 1024;  // Проверка размера файла (не более 2МБ)
    }
  )
  .test(
    'fileType',
    'Невірний формат файлу',
    value => {
      if (!value) return true;  // Если файл не выбран, то пропускаем проверку
      return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);  // Проверка типа файла
    }
  ),

  title: Yup.string().required("Заголовок є обов'язковим").max(80, 'Максимальна довжина заголовка - 80 символів'),
  category: Yup.string().required("Категорія є обов'язковою"),
  shortDescription: Yup.string()
    .max(61, 'Максимальна довжина опису - 61 символ'),
  description: Yup.string()
    .required("Текст історії є обов'язковим")
    .max(2500, 'Текст повинен бути не більше 2500 символів'),
});

export interface AddStoryFormProps {
  storyId?: string;
}

interface FormValues {
  storyImage: null;
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

const AddStoryForm = ({ storyId }: AddStoryFormProps) => {
  const fieldId = useId();
  const [initialValues, setInitialValues] = useState<FormValues>(formValues);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [modalError, setModalError] = useState(false);
  const maxDescriptionLength = 61;

  const router = useRouter();

  const handleSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    try {
      const response = await axios.post('/api/stories', values);
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
  // useEffect(() => {
  //   const loadCategories = async () => {
  //     try {
  //       const categories = await fetchCategories();
  //       setCategories(categories);
  //     } catch (error) {
  //       console.error('Помилка при отриманні категорій:', error);
  //     }
  //   };

  //   loadCategories();
  // }, []);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    // if (value.length <= maxDescriptionLength) {
    //   setDescription(value);
    // }
  }

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
        validationSchema={validationSchema}
      >
        {({ isValid, dirty, values }) => (
          <Form noValidate className={css.form}>
            <div className={css.formGroupInput}>
              <label>Oбкладинка статті</label>
              <img
                src="/placeholder-Image.png"
                alt="Прев'ю"
                className="cover-preview"
              />
              <button type="button" className={css.uploadBtn}>
                Завантажити фото
              </button>
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

              <label htmlFor={`${fieldId}-shortDescription`} className={css.label}>
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
                Лишилось символів: {maxDescriptionLength - (values.shortDescription?.length || 0)}
              </div>
              <ErrorMessage
                name="shortDescription"
                component="div"
                className={css.error}
              />

              <label htmlFor={`${fieldId}-text`} className={css.label}>
                Текст історії
              </label>
              <Field
                as="textarea"
                name="description"
                id={`${fieldId}-description`}
                className={css.description}
                placeholder="Ваша історія тут"
              />
              <ErrorMessage name="description" component="div" className={css.error} />
            </div>
            <div className={css.formGroupBtn}>
              <button
                type="submit"
                className={css.submitBtn}
                disabled={!(isValid && dirty)}
              >
                Зберегти
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
}

export default AddStoryForm;
