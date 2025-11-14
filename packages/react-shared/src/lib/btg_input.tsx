import { Field } from '@base-ui-components/react/field';
import { getIn } from 'formik';
import type { FormikProps } from 'formik/dist/types';
import {
  forwardRef,
  memo,
  useCallback,
  useState,
  type ChangeEvent,
  type ComponentPropsWithRef,
  type FocusEvent,
  type ReactElement,
  type Ref,
} from 'react';
import type { BtgInputStyles } from '../types/types';
import styles from './btg_input.module.css';
import BtgError from './error/error';

interface BtgInputProps<T>
  extends ComponentPropsWithRef<Exclude<'input', 'style'>> {
  label: string;
  name: Extract<keyof T, string>;
  formik: FormikProps<T>;
  StyleOverrides?: BtgInputStyles;
}

const BtgInputImplementation = memo(
  forwardRef(function <T>(
    { label, name, formik, StyleOverrides, ...props }: BtgInputProps<T>,
    ref?: Ref<HTMLInputElement> | undefined,
  ) {
    // const [focused, setFocused] = useState
    const passedOnChange = props.onChange;
    const passedOnBlur = props.onBlur;

    const error = getIn(formik.errors, name);
    const touched = getIn(formik.touched, name);

    const { value, onBlur, onChange } = formik.getFieldProps(name);

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event);
        passedOnChange && passedOnChange(event);
      },
      [onChange, passedOnChange],
    );

    const handleBlur = useCallback(
      (event: FocusEvent<HTMLInputElement>) => {
        onBlur(event);
        passedOnBlur && passedOnBlur(event);
        console.log('blur for: ', event.currentTarget.name);
      },
      [onBlur, passedOnBlur],
    );
    console.log(value);
    return (
      <Field.Root className={styles['inputRoot']} style={StyleOverrides?.Root}>
        <Field.Label
          htmlFor={`${name}-input-id`}
          className={styles['inputLabel']}
          style={StyleOverrides?.Label}
        >
          {label}
        </Field.Label>
        <Field.Control
          {...props}
          className={styles['inputControl']}
          ref={ref}
          id={`${name}-input-id`}
          name={name}
          value={value}
          disabled={formik.isSubmitting}
          onChange={handleChange}
          onBlur={handleBlur}
          style={StyleOverrides?.Control}
          placeholder={value}
        />

        <BtgError
          touched={touched}
          error={error}
          style={StyleOverrides?.Error}
        />
      </Field.Root>
    );
  }),
);

export const BtgInput = BtgInputImplementation as unknown as <T>(
  props: BtgInputProps<T> & { ref?: Ref<HTMLInputElement> },
) => ReactElement<T>;

export default BtgInput;
