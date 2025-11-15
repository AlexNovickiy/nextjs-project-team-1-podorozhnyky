'use client';

import { Form, Formik, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useId, useEffect, useState, useRef } from 'react';
import React from 'react';
import * as Yup from 'yup';
import { createStory } from '../../lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { ICategory } from '../../types/category';
import Image from 'next/image';
import  ConfirmModal  from '../ConfirmModal/ConfirmModal';
import css from './AddStoryForm.module.css';
import Loader from '../Loader/Loader';
import { fetchCategories } from '../../lib/api/clientApi';


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
    150,
    'Максимальна довжина опису - 150 символ'
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

const AddStoryForm = ({}: { storyId?: string }) => {

  const fieldId = useId();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [preview, setPreview] = useState<string>('');
  const [placeholderImage, setPlaceholderImage] = useState<string>(
    '/images/createStory/placeholder-image-mb.png'
  );
  const previewUrlRef = useRef<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const maxDescriptionLength = 150;
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const updatePlaceholder = () => {
      const width = window.innerWidth;
      if (width >= 1440) {
        setPlaceholderImage('/images/createStory/placeholder-image-dt.png');
      } else if (width >= 768) {
        setPlaceholderImage('/images/createStory/placeholder-image-tb.png');
      } else {
        setPlaceholderImage('/images/createStory/placeholder-image-mb.png');
      }
    };

    updatePlaceholder();
    window.addEventListener('resize', updatePlaceholder);

    return () => {
      window.removeEventListener('resize', updatePlaceholder);
    };
  }, []);

  useEffect(() => {
    if (!previewUrlRef.current) {
      setPreview(placeholderImage);
    }
  }, [placeholderImage]);

  const handleSelectToggle = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const handleSelectClose = () => {
    setIsSelectOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsSelectOpen(false);
      }
    };

    if (isSelectOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSelectOpen]);

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    try {

      setIsLoading(true);

      const formData = new FormData();
      formData.append('storyImage', values.storyImage as File);
      formData.append('title', values.title);
      formData.append('category', values.category);
      formData.append('shortDescription', values.shortDescription ?? '');
      formData.append('article', values.description);

      const response = await createStory(formData);

      if (response.status === 200 || response.status === 201) {
        const storyId = response.data?._id;

        if (storyId) {
          router.push(`/stories/${storyId}`);
        }
        resetForm();

        if (previewUrlRef.current) {
          URL.revokeObjectURL(previewUrlRef.current);
          previewUrlRef.current = null;
        }
        setPreview(placeholderImage);
      }
    } catch (error) {
      console.error('Помилка при збереженні історії:', error);
      setIsOpenConfirmModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadCategories = async() => {
      try {
        const response = await fetchCategories();
        setCategories(response);
      } catch (error) {
        console.error('Помилка при завантаженні категорій:', error);
    }
    }
    loadCategories();
  }, []);

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
      {isOpenConfirmModal && (
        <ConfirmModal
          onConfirm={() => {
            setIsOpenConfirmModal(false);
            router.push('/auth/register');
          }}
          onCancel={() => {
            setIsOpenConfirmModal(false);
            router.push('/auth/login');
          }}
          title="Помилка під час збереження"
          text="Щоб зберегти статтю вам треба увійти, якщо ще немає облікового запису — зареєструйтесь"
          confirmButtonText="Зареєструватись"
          cancelButtonText="Увійти"
        />
      )}
      
      {isLoading && <Loader />}

      <Formik
        initialValues={formValues}
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={validationSchema}
        validateOnMount={true}
      >
        {({ isValid, values, setFieldValue, isSubmitting }) => (
          <Form noValidate className={css.form}>
            <div className={css.leftColumn}>
              <div className={css.imageSection}>
                <label className={css.label}>Oбкладинка статті</label>
                <div
                  className={css.imageWrapper}
                  onClick={() => fileInputRef.current?.click()}
                  style={{ cursor: 'pointer' }}
                >
                  <Image
                    src={preview || placeholderImage}
                    alt="Прев'ю"
                    className={css.coverPreview}
                    width={865}
                    height={635}
                    unoptimized
                    sizes="(max-width: 767px) 335px, (min-width: 768px) and (max-width: 1439px) 704px, (min-width: 1440px) 865px"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>

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
                      if (previewUrlRef.current) {
                        URL.revokeObjectURL(previewUrlRef.current);
                      }
                      const objectUrl = URL.createObjectURL(fileList);
                      previewUrlRef.current = objectUrl;
                      setPreview(objectUrl);
                    }
                  }}
                />
              </div>

              <div className={css.fieldGroup}>
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
              </div>

              <div className={css.fieldGroup}>
                <label htmlFor={`${fieldId}-category`} className={css.label}>
                  Категорія
                </label>
                <div
                  className={`${css.customSelectWrapper} ${isSelectOpen ? css.open : ''}`}
                  ref={selectRef}
                >
                  <div
                    className={css.customSelectTrigger}
                    onClick={handleSelectToggle}
                  >
                    <Field name="category">
                      {({ field }: { field: { value: string } }) => {
                        const selectedCategory = categories.find(
                          cat => cat._id === field.value
                        );
                        return (
                          <span className={css.selectedValue}>
                            {selectedCategory?.name || 'Категорія'}
                          </span>
                        );
                      }}
                    </Field>
                    <svg className={css.selectArrow} width="24" height="24">
                      <use
                        href={`/sprite.svg#icon-keyboard_arrow_${isSelectOpen ? 'up' : 'down'}`}
                      />
                    </svg>
                  </div>

                  {isSelectOpen && (
                    <div className={css.customSelectDropdown}>
                      <Field name="category">
                        {({
                          field,
                          form,
                        }: {
                          field: { value: string };
                          form: {
                            setFieldValue: (
                              field: string,
                              value: string
                            ) => void;
                          };
                        }) => (
                          <>
                            <div
                              className={`${css.selectOption} ${
                                field.value === '' ? css.selected : ''
                              }`}
                              onClick={() => {
                                form.setFieldValue('category', '');
                                handleSelectClose();
                              }}
                            >
                              Категорія
                            </div>
                            {categories.length > 0 ? (
                              categories.map(category => (
                                <div
                                  key={category._id}
                                  className={`${css.selectOption} ${
                                    field.value === category._id
                                      ? css.selected
                                      : ''
                                  }`}
                                  onClick={() => {
                                    form.setFieldValue(
                                      'category',
                                      category._id
                                    );
                                    handleSelectClose();
                                  }}
                                >
                                  {category.name}
                                </div>
                              ))
                            ) : (
                              <div
                                className={css.selectOption}
                                style={{ cursor: 'not-allowed' }}
                              >
                                Завантаження категорій...
                              </div>
                            )}
                          </>
                        )}
                      </Field>
                    </div>
                  )}
                </div>
                <ErrorMessage
                  name="category"
                  component="div"
                  className={css.error}
                />
              </div>

              <div className={css.fieldGroup}>
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
                  onBeforeInput={(e: React.FormEvent<HTMLInputElement>) => {
                    const currentLength = e.currentTarget.value.length;

                    // Если длина текста достигла максимума, блокируем дальнейший ввод
                    if (currentLength >= maxDescriptionLength) {
                      e.preventDefault(); // Блокируем дальнейший ввод
                    }
                  }}
                />
                {values.shortDescription &&
                  values.shortDescription.length > 0 && (
                    <div className={css.descriptionCounter}>
                      Лишилось символів:{' '}
                      {Math.max(
                        0,
                        maxDescriptionLength -
                          (values.shortDescription?.length || 0)
                      )}
                    </div>
                  )}
                <ErrorMessage
                  name="shortDescription"
                  component="div"
                  className={css.error}
                />
              </div>

              <div className={css.fieldGroup}>
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
            </div>

            <div className={css.rightColumn}>
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
