import { useEffect, useRef } from 'react';

import { Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { Upload } from 'react-bootstrap-icons';

import {
  StyledField,
  Button,
  ButtonSize,
  ButtonAction,
  StyledCheckbox,
  TagSelect,
  AlternateLoader,
} from '@/components';
import { FieldError, Tag } from '@/api';
import { INPUT_CHARACTER_LIMITS } from '@/constants';
import styles from './UploadForm.module.scss';

const UploadSchema = Yup.object().shape({
  title: Yup.string()
    .max(
      INPUT_CHARACTER_LIMITS.POST_TITLE,
      `Title must be at most ${INPUT_CHARACTER_LIMITS.POST_TITLE} characters`,
    )
    .trim()
    .required('Title is required'),
  description: Yup.string()
    .max(
      INPUT_CHARACTER_LIMITS.POST_DESCRIPTION,
      `Description must be at most ${INPUT_CHARACTER_LIMITS.POST_DESCRIPTION} characters`,
    )
    .trim()
    .required('Description is required'),
  tags: Yup.array()
    .min(1, 'At least one tag must be selected')
    .required('Tag is required'),
  mature: Yup.boolean(),
});

export interface IUploadFormValues {
  title: string;
  description: string;
  tags: Tag[];
  mature: boolean;
}

export interface IUploadFormProps {
  onSubmit: (values: IUploadFormValues) => void;
  fieldErrors?: FieldError[];
  tags?: Tag[];
  isUploading: boolean;
}

export const UploadForm = ({
  onSubmit,
  fieldErrors,
  tags,
  isUploading,
}: IUploadFormProps): JSX.Element => {
  const formRef = useRef<FormikProps<IUploadFormValues>>(null);

  const initialValues: IUploadFormValues = {
    title: '',
    description: '',
    tags: [],
    mature: false,
  };

  const handleOnSubmit = (values: IUploadFormValues) => {
    onSubmit(values);
  };

  useEffect(() => {
    if (fieldErrors) {
      fieldErrors.forEach((e) => {
        formRef.current?.setFieldError(e.field, e.error);
      });
    }
  }, [fieldErrors]);

  return (
    <div className={styles.root}>
      <Formik
        initialValues={initialValues}
        validationSchema={UploadSchema}
        validateOnChange
        onSubmit={handleOnSubmit}
        innerRef={formRef}
      >
        {({ errors, touched, values }) => (
          <Form className={styles.root__form}>
            <StyledField
              name="title"
              type="text"
              placeholder="Title"
              error={errors.title}
              touched={touched.title}
              value={values.title}
              maxLength={INPUT_CHARACTER_LIMITS.POST_TITLE + 1}
            />
            <StyledField
              name="description"
              type="text"
              placeholder="Description"
              error={errors.description}
              touched={touched.description}
              value={values.description}
              as="textarea"
              rows={5}
              maxLength={INPUT_CHARACTER_LIMITS.POST_DESCRIPTION + 1}
            />
            <TagSelect
              name="tags"
              error={errors.tags}
              touched={touched.tags}
              tags={tags || []}
            />
            <StyledCheckbox
              name="mature"
              label="Is mature content?"
              type="checkbox"
              error={errors.mature}
              touched={touched.mature}
              value={values.mature}
            />
            <Button
              size={ButtonSize.small}
              action={ButtonAction.primary}
              type="submit"
              Icon={Upload}
              disabled={isUploading}
            >
              <div className={styles.root__submitContainer}>
                <span>Submit post</span>
                <AlternateLoader isLoading={isUploading} />
              </div>
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
