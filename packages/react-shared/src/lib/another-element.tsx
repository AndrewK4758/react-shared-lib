import { type FormikProps } from 'formik';
import type { HTMLAttributes } from 'react';
import styles from './another-element.module.css';
import { SharedUi } from './shared-ui';

interface AnotherElementProps<T> extends HTMLAttributes<HTMLInputElement> {
  formik: FormikProps<T>;
  name: Extract<keyof T, string>;
  fieldLabel: string;
  label: string;
}

export function AnotherElement<T>({
  fieldLabel,
  label,
  formik,
  name,
  ...props
}: AnotherElementProps<T>) {
  return (
    <div
      className={styles['wrapper']}
      style={
        {
          // padding: '2rem'
        }
      }
    >
      <SharedUi
        {...props}
        fieldsetLabel={fieldLabel}
        inputLabel={label}
        formikProps={formik}
        inputName={name}
      />
    </div>
  );
}

export default AnotherElement;
