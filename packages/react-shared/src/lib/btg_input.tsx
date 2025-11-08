import { Field } from '@base-ui-components/react';
import type { FormikProps } from 'formik/dist/types';
import {
  forwardRef,
  memo,
  useCallback,
  type ChangeEvent,
  type ComponentPropsWithRef,
  type FocusEvent,
  type ReactElement,
  type Ref,
} from 'react';
import styles from './btg_input.module.css';
import BtgError from './error/error';

interface BtgInputProps<T> extends ComponentPropsWithRef<'input'> {
  label: string;
  formKey: Extract<keyof T, string>;
  formik: FormikProps<T>;
  customClick?: (...args: unknown[]) => void;
  customBlur?: (...args: unknown[]) => void;
}

const BtgInputImplementation = memo(
  forwardRef(function <T>(
    {
      label,
      formKey,
      formik,
      customBlur,
      customClick,
      ...props
    }: BtgInputProps<T>,
    ref?: Ref<HTMLInputElement> | undefined,
  ) {
    const { name, value, onBlur, onChange } =
      formik.getFieldProps<Extract<T[keyof T], string>>(formKey);

    const touched = formik.touched[formKey] as boolean;
    const error = formik.errors[formKey] as string;

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event);
        customClick && customClick();
      },
      [onChange, customClick],
    );

    const handleBlur = useCallback(
      (event: FocusEvent<HTMLInputElement>) => {
        onBlur(event);
        customBlur && customBlur();
      },
      [onBlur, customBlur],
    );

    return (
      <Field.Root className={styles['inputRoot']}>
        <Field.Label
          htmlFor={`${formKey}-input-id`}
          className={styles['formKey']}
          style={{ color: props.style?.color }}
        >
          {label}
        </Field.Label>
        <Field.Control
          className={styles['inputControl']}
          ref={ref}
          {...props}
          id={`${formKey}-input-id`}
          name={name}
          value={value ?? ''}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ ...props.style, color: 'black' }}
        />

        <BtgError touched={touched} error={error} />
      </Field.Root>
    );
  }),
);

export const BtgInput = BtgInputImplementation as unknown as <T>(
  props: BtgInputProps<T> & { ref?: Ref<HTMLInputElement> },
) => ReactElement<T>;

export default BtgInput;
